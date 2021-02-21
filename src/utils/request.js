export const get = function(url){
    return new Promise( (resolve) => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function(){resolve(xhr.responseText)});
            xhr.open('get', url);
            xhr.send();
        }
    )
};
