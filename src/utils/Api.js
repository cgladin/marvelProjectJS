import md5 from 'md5';

const apiKeyPrivate="2fb45eed5cf3b68ee47cd801b46299ed22546ac1";

const apiKeyPublic="cd3263fa30043ee1d75311ba6353e62c";

const url="https://gateway.marvel.com/v1/public/";

export const get = async (endpoint) => {
    let ts=Date.now();
    let hash = md5( ts+ apiKeyPrivate + apiKeyPublic);
    const options = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }    
    fetch(url+endpoint+"?ts="+ts+"&apikey="+apiKeyPublic+"&hash="+hash,options)
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    })
};

