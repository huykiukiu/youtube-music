import Explore, { exploreScript } from "../pages/explore";
import Detail, { detailScript } from "../pages/detail";
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
    mainContent.innerHTML = Explore();
    exploreScript();
    // Scroll main-content về đầu, không ảnh hưởng đến sidebar
    mainContent.scrollTop = 0;
  });
  router.on("/playlists/details/:slud", ({ data }) => {
    const mainContent = document.querySelector("#main-content");
    mainContent.innerHTML = Detail();
    detailScript("playlists", data.slud);
  });
  router.on("/albums/details/:slud", ({ data }) => {
    const mainContent = document.querySelector("#main-content");
    mainContent.innerHTML = Detail();
    detailScript("albums", data.slud);
  });
  router.resolve();
}
