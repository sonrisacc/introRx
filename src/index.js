const Rx = require('rxjs/Rx');
// const refreshButton = document.querySelector('.refresh');
const closeButton1 = document.querySelector('.close1');
const closeButton2 = document.querySelector('.close2');
const closeButton3 = document.querySelector('.close3');

// const refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
const close1ClickStream = Rx.Observable.fromEvent(closeButton1, 'click');
const close2ClickStream = Rx.Observable.fromEvent(closeButton2, 'click');
const close3ClickStream = Rx.Observable.fromEvent(closeButton3, 'click');

 
const refreshButton = document.querySelector('.refresh');
const refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

const requestStream = refreshClickStream.startWith('startup click')
  .map(function() {
    const randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

const responseStream = requestStream
.flatMap(function(requestUrl) {
  return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
});


const suggestion1Stream = close1ClickStream.startWith('startup click')
  .combineLatest(responseStream,             
    function(click, listUsers) {
      return listUsers[Math.floor(Math.random()*listUsers.length)];
    }
  )
  .merge(
    refreshClickStream.map(function(){ return null; })
  )
  .startWith(null);

suggestion1Stream.subscribe(function(response) {
  if(response === null ) {

  } else {
    const suggestion1Box = document.getElementById('suggestion1');
    const avatar = suggestion1Box.querySelector('img');
    const username = suggestion1Box.querySelector('.username');

    avatar.src = response? response.avatar_url : "#";
    avatar.href = response? response.avatar_url : "#";
    username.innerHTML = response ? response.login : "#";
  }
});



/* 
  version 2
*/

// const startupRequestStream = Rx.Observable.of('https://api.github.com/users');
// const requestOnRefreshStream = refreshClickStream
//   .map(function() {
//     const randomOffset = Math.floor(Math.random()*500);
//     return 'https://api.github.com/users?since=' + randomOffset;
//   });

// const requestStream = Rx.Observable.merge(
//   requestOnRefreshStream, startupRequestStream
// );

// const responseStream = requestStream
//   .flatMap(function(requestUrl) {
//     return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
//   });

// responseStream.subscribe(function(response) {
//   // render `response` to the DOM however you wish
//   console.log("response", response);
// });


 


/*
  version 1
*/
// const requestStream = Rx.Observable.of('https://api.github.com/users');

// requestStream.subscribe(function(requestUrl) {
//   // execute the request
//   const responseStream = Rx.Observable.create(function (observer) {
//   	console.log("observal", observer);
//     jQuery.getJSON(requestUrl)
//     .done(function(response) { observer.next(response); })
//     .fail(function(jqXHR, status, error) { observer.error(error); })
//     .always(function() { observer.complete(); });

//   });
  
//   responseStream.subscribe(function(response) {
//     // do something with the response
//     console.log("response", response);
//   });
// });