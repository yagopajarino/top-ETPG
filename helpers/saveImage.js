let fetch = require("node-fetch");
let fs = require("fs");

async function saveImage(url, filename) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const reg = /.*.(jpg|JPG|jpeg|png|gif|GIF)$/i;
  let arr = url.match(reg);
  if (arr == null) {
    fs.createWriteStream(filename + ".png").write(buffer);
    return;
  }
  let fileExt = arr[1];
  fs.createWriteStream(filename + "." + fileExt).write(buffer);
  return;
}
