const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  "welcome",
  "redirect",
  "redirected",
  "cache",
  "cookie",
  "other",
];

let getRoutes = () => {
  let result = "";

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );

  return result;
};

app.get("/", (req, res) => {
  let routeResults = getRoutes();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h1>Exercise 04</h1>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get("/welcome", (req, res) => {
  //Optional way like https, but we can also do it the express way below.
  // res.writeHead(200, { "Content-Type": "text/html" });
  // res.write("<h1>Hello and welcome!</h1>");
  // res.end();
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send("<h1>Hello and welcome!");
});

//Just using res.redirect does not actually give you a page. You must set /redirected as well.
app.get("/redirect", (req, res) => {
  res.redirect(302, "/redirected");
});
app.get("/redirected", (req, res) => {
  res.status(302);
  res.set({ "Content-Type": "text/html" });
  res.send("<h1>This is the redirected page.</h1>");
});

//res.send() sends once and closes the stream, whereas with write() we can write multiple times before ending.
app.get("/cache", (req, res) => {
  res.set({
    "Content-type": "text/plain",
    "Cache-Control": "max-age=86400",
  });
  res.send("This resource was cached.");
});

app.get("/cookie", (req, res) => {
  res.set({ "Content-Type": "text/plain" });
  res.cookie("hello", "world");
  res.send("cookies... yummm")
});

//* path covers all paths that aren't accounted for with the gets.
app.get("*", (req, res) => {
  res.set(404);
  res.set({'Content-Type': 'text/html'});
  res.send("<h1>404 Error</h1>");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
