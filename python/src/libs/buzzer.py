# -*- coding: utf-8 -*-
import grovepi
import time

BUZZER_PORT = 8 # Digital port D8
BEEP_TIME = 0.5 # seconds


def beep():
  try:
    grovepi.digitalWrite(BUZZER_PORT, 1)
    time.sleep(BEEP_TIME)
  finally:
    grovepi.digitalWrite(BUZZER_PORT, 0)
