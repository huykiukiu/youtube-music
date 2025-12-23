import { Header } from "../src/components/header";
import { SideBar } from "../src/components/sidebar";

export default function DefaultLayout() {
  return `
    ${Header()}
    <div class="flex bg-[#091527]">
        ${SideBar()}
        <main id="main-content" class="mt-35 w-[calc(100%-88px)]"></main>
    </div>
    `;
}
