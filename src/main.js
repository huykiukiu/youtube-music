import DefaultLayout from "../layouts/defaultLayout";
import router from "../route/router";

const app = document.querySelector("#app");
app.innerHTML = DefaultLayout();
router();
