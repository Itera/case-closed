# -*- coding: utf-8 -*-
import base64
import time
from io import BytesIO
from picamera import PiCamera


SLEEP = 2.0
camera = PiCamera()


def take_picture():
    stream = BytesIO()
    camera.start_preview()
    time.sleep(SLEEP)
    camera.capture(stream, format='jpeg')
    camera.stop_preview()
    return stream


def take_picture_b64():
    image_data = take_picture().getvalue()
    return base64.b64encode(image_data)
