# -*- coding: utf-8 -*-
import grovepi

PORT = 4 # Digital port D4
SENSOR_VERSION = 0 # Blue colored sensor

def get_temp_humidity():
  return grovepi.dht(PORT, SENSOR_VERSION)
