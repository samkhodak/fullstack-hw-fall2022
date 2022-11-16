const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('./public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post('/form', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
  let body = req.body;
  let name = body.name || 'n/a';
  let email = body.email || 'n/a';
  let comments = body.feedback || 'n/a';
  let newsletter = body.newsletter || 'n/a';

  res.set({'Content-Type': 'text/html'});
  res.write(`<p>Name: ${name}</p>`);
  res.write(`<p>Email: ${email}</p>`);
  res.write(`<p>Comments: ${comments}</p>`);
  res.write(`<p>Newsletter: ${newsletter}</p>`);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
