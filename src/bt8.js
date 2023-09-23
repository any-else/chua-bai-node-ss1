const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

//đọc 2 cái template với html
const overviewHtml = path.join(__dirname, "./templates/overview.html");
const productHtml = path.join(__dirname, "./templates/product.html");
const cartTemplateHtml = path.join(__dirname, "./templates/cartTemplate.html");
//đọc file json ra
const dataPath = path.join(__dirname, "./dev-data/data.json");
const server = http.createServer((request, response) => {
  console.log("request ==>", request.url);
  const { pathname } = url.parse(request.url, true);

  //phần đọc cái file json
  const dataJson = fs.readFileSync(dataPath, "utf8");
  const dataObject = JSON.parse(dataJson);
  if (pathname === "/" || pathname === "/overview") {
    //phần đọc html
    const cartTemplate = fs.readFileSync(cartTemplateHtml, "utf8");
    const overview = fs.readFileSync(overviewHtml, "utf8");
    //bien doi
    const replaceData = dataObject.map((product) => {
      return cartTemplate
        .replace("{{image}}", product.image)
        .replace("{{productName}}", product.productName)
        .replace("{{price}}", product.price)
        .replace("{{quantity}}", product.quantity)
        .replace("{{id}}", product.id);
    });
    console.log("replaceData", replaceData);
    const renderOverView = overview.replace("{{listProduct}}", replaceData);
    response.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    response.write(renderOverView);
  } else {
    const pathUrl = pathname.split("/");
    const id = pathUrl[pathUrl.length - 1];
    console.log("id", id);
    const productDetail = dataObject.find((product) => +product.id == +id);
    console.log("productDetail ===>", productDetail);
    const product = fs.readFileSync(productHtml, "utf8");
    const productReplace = product
      .replace("{{productName}}", productDetail.productName)
      .replace("{{from}}", productDetail.from)
      .replace("{{nutrients}}", productDetail.nutrients)
      .replace("{{quantity}}", productDetail.quantity)
      .replace("{{price}}", productDetail.price)
      .replace("{{description}}", productDetail.description);
    response.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
    response.write(productReplace);
  }
  response.end();
});

let PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
