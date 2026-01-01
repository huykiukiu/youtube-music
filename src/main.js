import { controllScript } from "./components/controll";
import DefaultLayout from "../layouts/defaultLayout";
import router, { initRouter } from "../route/router";
import { initSidebarToggle } from "./components/sidebarController";
import { searchController } from "./components/searchController";
import loadingManager from "./utils/loadingManager";

const app = document.querySelector("#app");
app.innerHTML = DefaultLayout();
initRouter();
loadingManager.init(); // Khởi tạo loading manager sau khi DOM đã được render
initSidebarToggle();
controllScript();
searchController();
