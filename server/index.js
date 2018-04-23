
const express = require('express');
const bodyParse = require('body-parser');
 

const app = express();
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static('dist'));

 

const HOST = 'localhost';
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});