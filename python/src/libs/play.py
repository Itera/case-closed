# -*- coding: utf-8 -*-
import pygame
import threading
import time


def play_sound(filepath):
  pygame.mixer.init()
  pygame.mixer.music.load(filepath)
  pygame.mixer.music.set_volume(1.0)
  pygame.mixer.music.play()
  time.sleep(10)
  pygame.mixer.music.stop()

  while pygame.mixer.music.get_busy():
    pass


class Player(threading.Thread):
  def __init__(self, filepath):
    threading.Thread.__init__(self)
    self._filepath = filepath

  def run(self):
    play_sound(self._filepath)
