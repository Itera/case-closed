# -*- coding: utf-8 -*-
import enum
from flask import Flask
from libs.arduino import Arduino


HTTP_200_OK = 200
TIMEOUT = 10.0 # Windows will sleep forever, ignore Ctrl+C, and my keyboard does not have the 'break' key...
DEVICE_NAME='/dev/serial/by-id/usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_0001-if00-port0'

class Command(enum.Enum):
  STOP = 0
  LEFT = 1
  RIGHT = 2
  STRAIGHT = LEFT | RIGHT


class Server(Flask):
  def __init__(self):
    Flask.__init__(self, __name__)
    self._arduino = Arduino(device=DEVICE_NAME, timeout=TIMEOUT)
    self.route('/wheels/stop', methods=['GET'])(self._stop)
    self.route('/wheels/left', methods=['GET'])(self._left)
    self.route('/wheels/right', methods=['GET'])(self._right)
    self.route('/wheels/straight', methods=['GET'])(self._straight)

  def _stop(self):
    return self._send(Command.STOP)

  def _left(self):
    return self._send(Command.LEFT)

  def _right(self):
    return self._send(Command.RIGHT)

  def _straight(self):
    return self._send(Command.STRAIGHT)

  def _send(self, command):
    self._arduino.send_int(command.value)
    return '', HTTP_200_OK


if __name__ == '__main__':
  app = Server()
  app.run(host='0.0.0.0', port=5020)
