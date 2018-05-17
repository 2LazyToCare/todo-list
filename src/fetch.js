export const getFetch = (url, method, body) => {
    return fetch(url, {
      method: method,
      mode: "CORS",
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
};
