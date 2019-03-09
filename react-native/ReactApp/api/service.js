

export function takePicture() {
  return fetch('http://192.168.1.138:5000/camera', {
    method: 'GET',
    headers: {
      Accept: 'text/html',
      'Content-Type': 'application/json',
    },
  });
}

export function getSensors() {
  return fetch('http://192.168.1.138:5010/sensors', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => JSON.parse(res._bodyText));
}