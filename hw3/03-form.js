const http = require("http");
const port = process.env.PORT || 5001;
const static = require("node-static");
const querystring = require("node:querystring");

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const files = new static.Server("./");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/form":
      console.log(`${req.method}, ${req.url}`);
      files.serveFile("/03-form.html", 200, {}, req, res);
      break;

    case "/submit":
      console.log(`${req.method}, ${req.url}`);

      //Gather body data in a string, since data does not necessarily come all at once.
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      //Only after all data is sent back should you manipulate the data. If this was outside of .on("end"), you might not get all data back before manipulating it.
      req.on("end", () => {
        const parsed_body = querystring.parse(body); //This parse function automatically seperates the body string into a collection of key-value pairs.
        console.log(parsed_body);
        const name = parsed_body.name || "n/a";
        const email = parsed_body.email || "n/a";
        const comments = parsed_body.comments || "n/a";
        const newsletter = parsed_body.newsletter || "n/a";

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Comments: ${comments}</p>
        <p>Newsletter: ${newsletter}</p>`);
        res.end();
      });
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
