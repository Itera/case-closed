

export function takePicture() {
  return fetch('http://192.168.1.138:5000/camera', {
    method: 'GET',
    headers: {
      Accept: 'text/html',
      'Content-Type': 'application/json',
    },
  });
}