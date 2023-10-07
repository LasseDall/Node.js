import fs from "fs";

export function readPage(filePath) {
    return fs.readFileSync(filePath).toString();
}

export function renderPage(page, config={}) {
    const navbar = fs.readFileSync("./public/components/navbar/navbar.html").toString()
        .replace("$TAB_TITLE", config.tabTitle || "Mandatory 1")
    const footer = fs.readFileSync("./public/components/footer/footer.html").toString();

    return navbar + page + footer;
}