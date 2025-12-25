import Home, { homeScript } from "../pages/home";
import Navigo from "navigo";

export default function router() {
  const router = new Navigo("/", {
    hash: false,
  });

  router.on("/", () => {
    const mainContent = document.querySelector("#main-content");
    mainContent.innerHTML = Home();
    // Scroll main-content về đầu, không ảnh hưởng đến sidebar
    mainContent.scrollTop = 0;
    homeScript();
  });
  router.on("/explore", () => {
    const mainContent = document.querySelector("#main-content");
    mainContent.innerHTML = "huy";
    // Scroll main-content về đầu, không ảnh hưởng đến sidebar
    mainContent.scrollTop = 0;
  });
  router.on("/playlists/details/:slud", () => {
    const mainContent = document.querySelector("#main-content");
    mainContent.innerHTML = "detail";
  });
  router.on("/albums/details/:slud", () => {
    const mainContent = document.querySelector("#main-content");
    mainContent.innerHTML = "detail";
  });
  router.resolve();
}
