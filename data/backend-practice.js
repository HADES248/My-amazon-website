const xhr = new XMLHttpRequest (); //created new HTTP message to send to backend

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});
xhr.open('GET', 'https://supersimplebackend.dev') // set up the request with type of message and url of where to send the message
xhr.send(); // 1.sends the message 2.xhr.send() is asynchronous code(dosent wait for response just sends request and moves on)
