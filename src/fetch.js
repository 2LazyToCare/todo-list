export const getFetch = (url, method, body) => {
    return fetch(url, {
      method: method,
      mode: "CORS",
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
        }
        return response;
      })
      .then(response => response.json());
  };
