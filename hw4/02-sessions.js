const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5001;

// Add your code here

// Use the express-session module
app.use(
  session({
    store: new session.MemoryStore(),
    secret: "02302399203212",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 864000,
    },
  })
);

app.get("*", (req, res) => {
  res.status(200);
  res.set({"Content-Type": "text/html"});

  let html = '';

  if (!req.session.pages_viewed){
    req.session.pages_viewed = [];
    req.session.pages_viewed.push(req.url);
    html += `<p>Welcome to http://localhost:${port}</p>`;
    html += `<p>Currently on route: ${req.url}</p>`;
  }
  else{
    req.session.pages_viewed.push(req.url);
    html += `<p>Currently on route: ${req.url}</p>`;
    html += `<p>Previously visited:</p>`;

    //This goes backwards so the user always sees the last page visited at the top of the list, not including the current page.
    for (let i = req.session.pages_viewed.length - 2; i >= 0; --i)
      html += `<p>${req.session.pages_viewed[i]}</p>`;
    console.log(req.session.pages_viewed);
  }

  res.send(html);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
