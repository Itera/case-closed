#!/usr/bin/env python
# -*- coding: utf-8 -*-
from arduino import Arduino


COMMAND_TARE = 1


if __name__ == '__main__':
  device = sys.argv[1] if len(sys.argv) > 1 else None
  arduino = Arduino(device=device)
  arduino.send_int(COMMAND_TARE)
