const Urls = {
  GET_DATA: 'https://30.javascript.pages.academy/kekstagram/data',
  SEND_DATA: 'https://30.javascript.pages.academy/kekstagram/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (url, method = Method.GET, body = null) => fetch(url, { method, body })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });

const getData = () => load(Urls.GET_DATA);
const sendData = (body) => load(Urls.SEND_DATA, Method.POST, body);

export { getData, sendData };

