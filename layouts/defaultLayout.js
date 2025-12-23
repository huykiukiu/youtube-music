import { Header } from "../src/components/header";
import { SideBar } from "../src/components/sidebar";

export default function DefaultLayout() {
  return `
    ${Header()}
    <div class="flex bg-[#091527]">
        ${SideBar()}
        <main id="main-content" class="flex-1 mt-35"></main>
    </div>
    `;
}
