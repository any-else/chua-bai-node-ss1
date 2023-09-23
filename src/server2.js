const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer((request, response) => {
  console.log("request ==>", request.url);
  const { pathname } = url.parse(request.url, true);

  if (pathname === "/") {
    response.write("<h1 style='color:red'> This is Home Page </h1>");
  } else if (pathname === "/overview") {
    response.write("<h1 style='color:yellow'> This is overview Page </h1>");
  } else if (pathname === "/product") {
    response.write("<h1 style='color:green'> This is Product Page </h1>");
  } else {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf8" });
    response.write("<h1 style='color:red'>Page not found</h1>");
  }
  response.end();
});

let PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
