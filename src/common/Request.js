// request compoennt
// Packs the POST and GET methods, as well as storing cookie from back end
// All requests sent to the back end should be using this package
const request = (uri, method, body) => {
  const req = {};

  req.method = method;
  req.credentials = 'include';

  if (body !== undefined) {
    if (method !== 'GET') {
      if (body.isFile !== undefined && body.isFile === true) {
        req.body = body.data;
      } else {
        req.headers = {
          'Content-Type': 'application/json',
        };
        req.body = JSON.stringify(body);
      }
    } else {
      req.uri += `?${Object.keys(body)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
        .join('&')}`;
    }
  }
  console.log(req); // eslint-disable-line no-console

  return fetch(`/api/${uri}`, req)
    .then((res) => {
      if (!res.ok) {
        console.log(res); // eslint-disable-line no-console
        return { error: res.status };
      }

      return res.json();
    });
};

const get = (uri, body) => request(uri, 'GET', body);

const post = (uri, body) => request(uri, 'POST', body);

export { get, post };
