# -*- coding: utf-8 -*-
import sys
import time

# http://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/

if sys.platform == 'uwp':
  import winrt_smbus as smbus
  rev = 2
else:
  import smbus
  import RPi.GPIO as GPIO
  rev = GPIO.RPI_REVISION


DISPLAY_RGB_ADDR = 0x62
DISPLAY_TEXT_ADDR = 0x3e


class Display:
  def __init__(self):
    self._bus = smbus.SMBus(1 if rev in (2, 3) else 0)

  def _text_command(self, cmd):
    self._bus.write_byte_data(DISPLAY_TEXT_ADDR, 0x80, cmd)

  def _write_line(self, line, flush=False):
    if flush:
      line = '{:<16s}'.format(line)

    for col, char in enumerate(line):
      if col >= 16:
        break

      self._bus.write_byte_data(DISPLAY_TEXT_ADDR, 0x40, ord(char))

  def clear(self):
    self._text_command(0x01)

  def set_RGB(self, r, g, b):
    self._bus.write_byte_data(DISPLAY_RGB_ADDR, 0, 0)
    self._bus.write_byte_data(DISPLAY_RGB_ADDR, 1, 0)
    self._bus.write_byte_data(DISPLAY_RGB_ADDR, 0x08, 0xaa)
    self._bus.write_byte_data(DISPLAY_RGB_ADDR, 4, r)
    self._bus.write_byte_data(DISPLAY_RGB_ADDR, 3, g)
    self._bus.write_byte_data(DISPLAY_RGB_ADDR, 2, b)

  def set_text(self, text, flush=False):
    self._text_command(0x08 | 0x04) # display on, no cursor
    self._text_command(0x28) # 2 lines
    time.sleep(0.05)

    self._text_command(0x02) # return home
    time.sleep(0.05)

    lines = text.split('\n')

    self._write_line(lines[0], flush=flush)
    if len(lines) > 1:
      self._text_command(0xc0)
      self._write_line(lines[1], flush=flush)
