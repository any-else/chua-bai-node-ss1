const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

//đọc 2 cái template với html
const overviewHtml = path.join(__dirname, "./templates/overview.html");
const productHtml = path.join(__dirname, "./templates/product.html");

const server = http.createServer((request, response) => {
  console.log("request ==>", request.url);
  const { pathname } = url.parse(request.url, true);

  if (pathname === "/" || pathname === "/overview") {
    const overview = fs.readFileSync(overviewHtml, "utf8");
    response.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    response.write(overview);
  } else if (pathname === "/product") {
    const product = fs.readFileSync(productHtml, "utf8");
    response.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    response.write(product);
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
