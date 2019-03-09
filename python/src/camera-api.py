# -*- coding: utf-8 -*-
from flask import Flask, make_response
from libs import camera


HOST = '0.0.0.0'
PORT = 5000


class Server(Flask):
    def __init__(self):
        Flask.__init__(self, __name__)
        self.route('/camera', methods=['GET'])(self._capture_b64)
        self.route('/camera/jpg', methods=['GET'])(self._capture_jpg)

    def _capture_b64(self):
        return camera.take_picture_b64()

    def _capture_jpg(self):
        image_data = camera.take_picture().getvalue()
        response = make_response(image_data)
        response.headers.set('Content-Type', 'image/jpeg')
        return response


if __name__ == '__main__':
    app = Server()
    app.run(host=HOST, port=PORT)
