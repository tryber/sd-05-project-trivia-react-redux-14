const TOKENURL = 'https://opentdb.com/api_token.php?command=request';

const tokenAPI = () => (
  fetch(TOKENURL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
        //.then((json) => json.token)
    ))
);

export default tokenAPI;
