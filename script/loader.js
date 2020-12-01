let loadShader = function(url) {
  
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      // request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
      // request.setRequestHeader('Access-Control-Allow-Credentials', 'true');
      // request.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
        request.onload = function () {
            if(request.status >= 200 && request.status < 300){
              resolve(request.responseText);
            }
            else{
              reject('HTTP status: ' + request.status + ' on resource ' + url);
            }
        }
        request.send();
    });
  }

