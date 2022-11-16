const http = require("http");
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    "/attributes?hello=world&lorem=ipsum",
    "/items?first=1&second=2&third=3&fourth=4",
    "/characters?spongebob=squarepants&patrick=star&sandy=cheeks",
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === "/") {
    let routeResults = getRoutes();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  }

  //Returns a structure with key-value pairs of each url pair, eg. hello=>world
  let search_params = url.searchParams;
  let border_style = `style = 'border: 1px solid grey'`

  //Start with a <table> starting tag, then add to the html with each table row in search_params.
  let html = `<table ${border_style}>`;
  for (const [td1, td2] of search_params) {           //This could also be done with for (td of search_params), and then td[0], td[1]
    html += `<tr>
    <td ${border_style}>${td1}</td>
    <td ${border_style}>${td2}</td>
    </tr>`;
  }
  html += "</table>"

  res.write(html);
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
