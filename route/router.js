import Home, { homeScript } from "../pages/home";
import Navigo from "navigo";

export default function router() {
  const router = new Navigo("/");
  router.on("/", () => {
    document.querySelector("#main-content").innerHTML = Home();
    homeScript();
  });
  router.on("/explore", () => {
    document.querySelector("#main-content").innerHTML = "huy";
  });
  router.resolve();
}
