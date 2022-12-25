const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
const $ = cheerio.load(html);

// 遍历 src/page 目录下的所有 js 文件
function dir(_path) {
    console.log(_path);
    const pageDir = path.resolve(__dirname, _path);
    const pageFiles = fs.readdirSync(pageDir);
    console.log(pageFiles)
    pageFiles.forEach((file) => {
        const filePath = path.resolve(pageDir, file);
        const fileStat = fs.statSync(filePath);
        if (fileStat.isFile() && path.extname(filePath) === '.html') {
            console.log("is file");
            const fileName = path.basename(filePath, '.html');
            const fileContent = fs.readFileSync(filePath, 'utf8');
            $("#app").html(fileContent);
            fs.writeFileSync("dist/" + fileName + ".html", $.html(), 'utf8');
        } else if (!fileStat.isFile()) {
            console.log("is dir");
            dir(filePath);
        }
    });
}
dir('src/page');
fs.writeFileSync("dist/style.css", fs.readFileSync("src/style.css"), 'utf8');
setInterval(() => {
    dir('src/page');
    fs.writeFileSync("dist/style.css", fs.readFileSync("src/style.css"), 'utf8');
}, 30000)