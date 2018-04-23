const Rx = require('rxjs/Rx');
const requestStream = Rx.Observable.of('https://api.github.com/users');
console.log("requestStream", requestStream);

requestStream.subscribe(function(requestUrl) {
  // execute the request
  const responseStream = Rx.Observable.create(function (observer) {
  	console.log("observal", observer);
    jQuery.getJSON(requestUrl)
    .done(function(response) { observer.next(response); })
    .fail(function(jqXHR, status, error) { observer.error(error); })
    .always(function() { observer.complete(); });

 
  });
  
  responseStream.subscribe(function(response) {
    // do something with the response
    console.log("response", response);
  });
});