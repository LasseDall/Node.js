import { readPage, renderPage } from "./templateEngine.js";

const frontpage = readPage("./public/pages/frontpage/frontpage.html");
export const frontpagePage = renderPage(frontpage, {
    tabTitle: "Mandatory 1"
});

const nodePage = readPage("./public/pages/nodeJSPage/nodeJSPage.html");
export const nodeJSPage = renderPage(nodePage, {
    tabTitle: "Node.js"
});

const appPage = readPage("./public/pages/appJSPage/appJSPage.html");
export const appJSPage = renderPage(appPage, {
    tabTitle: "App.js"
});

const JSpage = readPage("./public/pages/JSPage/JSPage.html");
export const JSpagePage = renderPage(JSpage, {
    tabTitle: "JavaScript"
});

const structure = readPage("./public/pages/structurePage/structurePage.html");
export const structurePage = renderPage(structure, {
    tabTitle: "Mappestruktur"
});

export const loginPage = readPage("./public/pages/login/login.html");