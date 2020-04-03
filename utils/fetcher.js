import fetch from "isomorphic-fetch";

export const getJSON = (input) =>
  fetch(input).then((res) =>
    res.json().then((body) => (res.ok ? body : Promise.reject(body)))
  );
