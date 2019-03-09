from flask import Flask, make_response
from picamera import PiCamera
from time import sleep
from io import BytesIO

camera = PiCamera()

def take_picture():
    stream = BytesIO()
    camera.start_preview()
    sleep(2)
    camera.capture(stream, format='jpeg')
    camera.stop_preview()
    return stream

class Server(Flask):
    def __init__(self):
        Flask.__init__(self, __name__)
        self.route('/camera', methods=['GET'])(self._capture)

    def _capture(self):
        image_data = take_picture().getvalue()
        response = make_response(image_data)
        response.headers.set('Content-Type', 'image/jpeg')
        # response.headers.set('Content-Disposition', 'attachment', filename='%s.jpg' % pid)
        return response

if __name__ == '__main__':
    app = Server()
    app.run(host='0.0.0.0')