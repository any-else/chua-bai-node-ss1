const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

//đọc đường dẫn file json ra
const dataPath = path.join(__dirname, "./dev-data/data.json");
const server = http.createServer((request, response) => {
  const { pathname } = url.parse(request.url, true);
  console.log("pathname", pathname);

  const dataJson = fs.readFileSync(dataPath, "utf8");
  const dataObject = JSON.parse(dataJson);
  if (pathname === "/api") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(dataJson);
  } else {
    const pathUrl = pathname.split("/");
    const id = pathUrl[pathUrl.length - 1];
    const data = dataObject.find((item) => +item.id == +id);
    console.log("data", data);
    if (data) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(data));
    } else {
      response.writeHead(404, { "Content-Type": "text/html; charset=utf8" });
      response.write("<h1 style='color:red'>Không tìm thấy Product</h1>");
    }
  }
  response.end();
});

let PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
