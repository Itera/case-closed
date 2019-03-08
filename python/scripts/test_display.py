#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
from display import Display


if __name__ == '__main__':
  display = Display()
  display.set_RGB(0, 255, 0)

  i = 0
  while True:
    i = (i + 10) % 255
    r = i
    g = 255 - i
    b = 0

    display.set_RGB(r, g, b)
    display.set_text('{:d} ..\n{:d}'.format(i, i), flush=True)
    time.sleep(0.5)
