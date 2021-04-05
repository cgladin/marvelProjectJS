import md5 from "md5";

const apiKeyPrivate = "2fb45eed5cf3b68ee47cd801b46299ed22546ac1";

const apiKeyPublic = "cd3263fa30043ee1d75311ba6353e62c";

const url = "https://gateway.marvel.com/v1/public/";

export const get = async options => {
  let ts = Date.now();
  let hash = md5(ts + apiKeyPrivate + apiKeyPublic);
  const optionsFetch = {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  };
  //on concatène dans un string les paramètres
  let params = "";
  Object.keys(options).forEach(value => {
    if (options.endpoint !== options[value]) {
      params += "&" + value + "=" + options[value];
    }
  });
  //on effectue l'appel
  return await fetch(
    url +
      options.endpoint +
      "?ts=" +
      ts +
      "&apikey=" +
      apiKeyPublic +
      "&hash=" +
      hash +
      params,
    optionsFetch
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  });
};
