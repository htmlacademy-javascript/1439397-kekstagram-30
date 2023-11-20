const URLS = {
  GET_DATA: 'https://30.javascript.pages.academy/kekstagram/data',
  SEND_DATA: 'https://30.javascript.pages.academy/kekstagram',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const load = (url, method = METHOD.GET, body = null) => fetch(url, { method, body })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error();
  });

const getData = () => load(URLS.GET_DATA);
const sendData = (body) => load(URLS.SEND_DATA, METHOD.POST, body);

export { getData, sendData };

