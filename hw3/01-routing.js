const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    "welcome",
    "redirect",
    "redirected",
    "cache",
    "cookie",
    "check-cookies",
    "other",
  ];

  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  switch (req.url) {
    case "/":
      let routeResults = getRoutes();

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h1>Exercise 01</h1>`);
      res.write(`<ul> ${routeResults} </ul>`);
      res.end();
      break;

    case "/welcome":
      console.log(`${req.method}, ${req.url}`);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>Welcome!<h1>");
      res.end();
      break;

    case "/redirect":
      console.log(`${req.method}, ${req.url}`);
      res.writeHead(302, {
        Location: "/redirected",
      });
      res.end();
      break;

    case "/cache":
      console.log(`${req.method}, ${req.url}`);
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Cache-Control": "max-age=86400",
      });
      res.write("<p>This resources was cached</p>");
      res.end();
      break;

    case "/cookie":
      console.log(`${req.method}, ${req.url}`);
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Set-Cookie": "hello=world",
      });
      res.write("<p>cookies... yummm</p>");
      res.end();
      break;

    case "/check-cookies":
      console.log(`${req.method}, ${req.url}`);
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      if (req.headers.cookie.includes("hello=world")) res.write("<p>yes</p>");
      else res.write("<p>no</p>");
      res.end();
      break;

    default:
      console.log(`${req.method}, ${req.url}`);
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.write("<h1>ERROR: 404 Page Not Found</h1>");
      res.end();
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
