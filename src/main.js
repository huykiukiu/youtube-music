import DefaultLayout from "../layouts/defaultLayout";
import router from "../route/router";
import { initSidebarToggle } from "./components/sidebarController";

const app = document.querySelector("#app");
app.innerHTML = DefaultLayout();
initSidebarToggle();
router();
