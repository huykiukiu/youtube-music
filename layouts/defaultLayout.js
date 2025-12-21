import { Header } from "../src/components/header";
import { SideBar } from "../src/components/sidebar";

export default function DefaultLayout() {
  return `
    ${Header()}
    <div class="flex bg-[#091527]">
        ${SideBar()}
        <main id="main-content" class="mt-35 w-[1500px] mx-auto"></main>
    </div>
    `;
}
