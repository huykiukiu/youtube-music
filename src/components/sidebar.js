export const SideBar = () => {
  return `
  <aside>
    <nav class="bg-black h-full w-[88px] pt-20">
        <ul class="text-white">
            <li>
                <a href='/' data-navigo class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
                    <i class="fa-solid fa-house text-2xl"></i>
                    <span class="text-[11px] text-gray-300 group-hover:text-white">Trang chủ</span>
                </a>
            </li>
            <li>
                <a href='/explore' data-navigo class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
                    <i class="fa-regular fa-compass text-2xl"></i>
                    <span class="text-[11px] text-gray-300 group-hover:text-white">Khám phá</span>
                </a>
            </li>

            <li>
                <a href=''class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
                    <i class="fa-solid fa-bookmark text-2xl"></i>
                    <span class="text-[11px] text-gray-300 group-hover:text-white">Thư viện</span>
                </a>
            </li>

            <li>
                <a href=''class="flex flex-col items-center justify-center gap-1 p-3 hover:bg-white/10 rounded-xl transition group sidebar-active">
                    <i class="fa-solid fa-crown text-2xl"></i>
                    <span class="text-[11px] text-gray-300 group-hover:text-white">Nâng cấp</span>
                </a>
            </li>
        </ul>
    </nav>
  </aside>
  `;
};
