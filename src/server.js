const http = require("http");
const fs = require("fs");
const path = require("path");

const finalPath = path.join(__dirname, "txt", "final.txt");
console.log("finalPath", finalPath);

const server = http.createServer((request, response) => {
  fs.readFile(finalPath, "utf-8", (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain;  charset=utf8 " });
      response.write("Server co loi");
      response.end();
    }
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf8" });
    response.write(data);
    response.end();
  });
});

let PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
