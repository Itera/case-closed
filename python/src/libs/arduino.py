# -*- coding: utf-8 -*-
import struct
import serial.tools.list_ports


BAUDRATE = 9600


class NoDeviceAvailable(Exception):
  '''
  Raised when the (correct) COM port could not be found.
  '''
  pass


class Arduino(serial.Serial):
  def __init__(self, device=None, timeout=None):
    if device is None:
      # TODO: Probe all ports.
      ports = serial.tools.list_ports.comports()

      if len(ports) == 0:
        raise NoDeviceAvailable()

      device = ports[0].device

    serial.Serial.__init__(self, port=device, baudrate=BAUDRATE, timeout=timeout)

  # Single values.

  def send_int(self, value):
    self.write(struct.pack('b', value))

  def fetch_int(self):
    return self.fetch_ints(1)[0]

  def fetch_float(self):
    return self.fetch_floats(1)[0]

  def fetch_double(self):
    return self.fetch_doubles(1)[0]

  # Multiple values.

  def fetch_ints(self, n):
    return struct.unpack('i', self.read(4*n))

  def fetch_floats(self, n):
    return struct.unpack('f', self.read(4*n))

  def fetch_doubles(self, n):
    return struct.unpack('d', self.read(8*n))
