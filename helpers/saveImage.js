let fetch = require("node-fetch");
let fs = require("fs");

async function saveImage(url, filename) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.createWriteStream(filename).write(buffer);
}

// saveImage(
//   "https://fotos.perfil.com/2020/01/16/descubri-el-radical-y-extremo-cambio-de-look-de-alex-caniggia-877352.jpg",
//   "../public/images/AlexCaniggia.jpg"
// );

module.exports = saveImage;
