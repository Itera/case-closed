# -*- coding: utf-8 -*-
import sys
from arduino import Arduino


TIMEOUT = 10.0 # Windows will sleep forever, ignore Ctrl+C, and my keyboard does not have the 'break' key...


def stream_weight():
  device = None
  if len(sys.argv) > 1:
    device = sys.argv[1]

  source = Arduino(device=device, timeout=TIMEOUT)
  while True:
    print(source.fetch_float())


if __name__ == '__main__':
  stream_weight()
