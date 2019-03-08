# -*- coding: utf-8 -*-
import sys
import threading
from flask import Flask, jsonify

from arduino import Arduino
from play import Player
from temperature_humidity import get_temp_humidity
from display import Display


HOST = '0.0.0.0'
PORT = 5010

TIMEOUT = 10.0 # Windows will sleep forever, ignore Ctrl+C, and my keyboard does not have the 'break' key...
POLL_INTERVAL = 0.1 # seconds
SOUND_FILEPATH = '/home/pi/rain-02.mp3'

WEIGHT_WARNING = 18.0 # kg
WEIGHT_CRITICAL = 23.0 # kg
HUMID_WARNING = 30.0 # kg
TEMPERATURE_WARNING = 25.0 # kg

PAGE_NAME_TAG = 0
PAGE_WEIGHT_WARNING = 1
PAGE_WEIGHT_CRITICAL = 2
PAGE_TEMPHUMID_WARNING = 3


class Poller(threading.Thread):
  def __init__(self):
    threading.Thread.__init__(self)
    self._cancelled = threading.Event()

    device = sys.argv[1] if len(sys.argv) > 1 else None
    self._arduino = Arduino(device=device, timeout=TIMEOUT)
    self._display = Display()
    self._current_page = None
    self._player = None

    self._button_state = 0
    self.weight = 0.0
    self.temperature = 0.0
    self.humidity = 0.0

  def _update_values(self):
    # Poll values from Arduino and other sensors.
    # Dirty hack: data is sendt as string, message format is defined as '#<float>|<int>;'.
    raw = self._arduino.read_until(b';').decode('utf8')

    if raw[0] != '#':
      raise Exception('Invalid start of message.')

    if raw[-1] != ';':
      raise Exception('Invalid end of message.')

    weight, button_state = raw[1:-1].split('|')
    self.weight = float(weight)
    self._button_state = int(button_state)

    self.temperature, self.humidity = get_temp_humidity()

  def _update_display(self):
    # Show weight warning page.
    if self.weight > WEIGHT_WARNING:
      self._current_page = PAGE_WEIGHT_WARNING
      self._display.set_text('HEAVY\n{:.2f} kg'.format(self.weight))
      self._display.set_RGB(255, 255, 0)
      return

    # Show critical weight page.
    if self.weight > WEIGHT_CRITICAL:
      self._current_page = PAGE_WEIGHT_CRITICAL
      self._display.set_text('HEAVY!!\n{:.2f} kg'.format(self.weight))
      self._display.set_RGB(255, 0, 0)
      return

    if self.temperature > TEMPERATURE_WARNING or self.humidity > HUMID_WARNING:
      self._current_page = PAGE_TEMPHUMID_WARNING
      self._display.set_text('T: {:.2f} C\nH: {:.2f} %'.format(self.temperature, self.humidity))
      self._display.set_RGB(255, 0, 255)
      return

    # Fall back to name tag page (no need to redraw).
    if self._current_page != PAGE_NAME_TAG:
      self._current_page = PAGE_NAME_TAG
      self._display.set_text('Marianne\nsin!')
      self._display.set_RGB(0, 0, 255)

  def _execute_actions(self):
    # Play sound if button is pressed.
    if self._button_state > 0 and (self._player is None or not self._player.is_alive()):
      print('playing soothing toilet-music.')
      self._player = Player(SOUND_FILEPATH)
      self._player.start()

  # Public.

  def cancel(self):
    self._cancelled.set()

  def run(self):
    while True:
      # Sleep or cancel.
      if self._cancelled.wait(POLL_INTERVAL):
        break

      try:
        self._update_values()
      except Exception as e:
        print(e)
        continue

      self._update_display()
      self._execute_actions()

      print(self.weight, self._button_state, self.temperature, self.humidity)

    # If player is playing music, wait for thread to stop.
    if self._player is not None:
      self._player.join()
      self._player = None

class Server(Flask):
  def __init__(self, source):
    Flask.__init__(self, __name__)
    self._source = source

    self.route('/weight', methods=['GET'])(self._get_weight)
    self.route('/temperature', methods=['GET'])(self._get_temperature)
    self.route('/humidity', methods=['GET'])(self._get_humidity)
    self.route('/sensors', methods=['GET'])(self._get_sensors)

  def _get_weight(self):
    return str(self._source.weight)

  def _get_temperature(self):
    return str(self._source.temperature)

  def _get_humidity(self):
    return str(self._source.humidity)

  def _get_sensors(self):
    data = {
      'weight': self._source.weight,
      'temperature': self._source.temperature,
      'humidity': self._source.humidity,
    }
    return jsonify(data)


if __name__ == '__main__':
  poller = Poller()
  poller.start()

  try:
    server = Server(poller)
    server.run(host=HOST, port=PORT)

  finally:
    poller.cancel()
    poller.join()
