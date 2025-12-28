import Controll from "../src/components/controll";
import { Header } from "../src/components/header";
import { SideBar } from "../src/components/sidebar";
export default function DefaultLayout() {
  return `
    ${Header()}
    <div class="flex bg-[#091527] min-h-screen">
        ${SideBar()}
        <main id="main-content" class="flex-1 mt-35 pb-28"></main>
    </div>
    ${Controll()}
    <script src="https://www.youtube.com/iframe_api"></script>
    `;
}
