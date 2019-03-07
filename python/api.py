# -*- coding: utf-8 -*-
import enum

from flask import Flask

from arduino import Arduino


HTTP_200_OK = 200
HTTP_404_NOT_FOUND = 404
TIMEOUT = 10.0 # Windows will sleep forever, ignore Ctrl+C, and my keyboard does not have the 'break' key...


class Command(enum.Enum):
  READ_W0 = b'0'
  READ_W1 = b'1'
  LIGHT_ON = b'2'
  LIGHT_OFF = b'3'


class Server(Flask):
  def __init__(self):
    Flask.__init__(self, __name__)
    self._arduino = Arduino(timeout=TIMEOUT)
    self.route('/weight/<int:i>', methods=['GET'])(self._get_weight)
    self.route('/light/<string:on_off>', methods=['GET'])(self._set_light)

  def _get_weight(self, i):
    if i == 0:
      self._arduino.write(Command.READ_W0.value)
      return str(self._arduino.fetch_float()), HTTP_200_OK

    if i == 1:
      self._arduino.write(Command.READ_W1.value)
      return str(self._arduino.fetch_float()), HTTP_200_OK

    return 'Invalid weight sensor {:d}.'.format(i), HTTP_404_NOT_FOUND

  def _set_light(self, on_off):
    if on_off == 'on':
      self._arduino.write(Command.LIGHT_ON.value)
      return '', HTTP_200_OK

    if on_off == 'off':
      self._arduino.write(Command.LIGHT_OFF.value)
      return '', HTTP_200_OK

    return 'Unknown light state {:s}.'.format(on_off), HTTP_404_NOT_FOUND


if __name__ == '__main__':
  app = Server()
  app.run()
