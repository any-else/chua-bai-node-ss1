const fs = require("fs");
// Đọc và gi đồng bộ
// const data = fs.readFileSync("./txt/read-this.txt", "utf8");
// const input = fs.readFileSync("./txt/input.txt", "utf8");
// const append = fs.readFileSync("./txt/append.txt", "utf-8");

// console.log("data", data);
// console.log("input", input);
// console.log("append", append);

// const finalResult = input + "\n" + append;

// fs.writeFileSync("./txt/final.txt", finalResult, "utf8");
// console.log("đã ghi thành công");

//Đoc và ghi bất đồng bộ
fs.readFile("./txt/read-this.txt", "utf8", (err, data) => {
  if (err) {
    console.log("có lỗi rồi ");
  }
  console.log("data", data);
});

const input = fs.readFile("./txt/input.txt", "utf8", (err, dataInput) => {
  if (err) {
    console.log("có lỗi rồi ");
  }
  fs.readFile("./txt/append.txt", "utf8", (err, dataAppend) => {
    if (err) {
      console.log("có lỗi rồi ");
    }
    const result = dataInput + dataAppend;
    fs.writeFile("./txt/final.txt", result, "utf8", (err) => {
      if (err) {
        console.log("có lỗi rồi ");
      }
    });
  });
});
