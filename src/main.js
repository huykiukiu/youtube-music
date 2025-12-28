import { controllScript } from "./components/controll";
import DefaultLayout from "../layouts/defaultLayout";
import router from "../route/router";
import { initSidebarToggle } from "./components/sidebarController";
import { searchController } from "./components/searchController";

const app = document.querySelector("#app");
app.innerHTML = DefaultLayout();
initSidebarToggle();
controllScript();
searchController();
router();
