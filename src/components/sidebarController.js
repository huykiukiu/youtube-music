export function initSidebarToggle() {
  const barBtn = document.querySelector(".js-bar-btn");
  const sidebar = document.querySelector("aside");
  const ulEl = document.querySelector("ul");

  if (!barBtn || !sidebar) return;

  let isExpanded = false;

  barBtn.addEventListener("click", () => {
    isExpanded = !isExpanded;

    if (isExpanded) {
      // Mở rộng sidebar
      sidebar.classList.remove("w-[88px]");
      sidebar.classList.add("w-[240px]");

      // Hiển thị text trong sidebar
      const spans = sidebar.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.display = "block";
      });

      // Thay đổi layout của các item từ vertical sang horizontal
      const links = sidebar.querySelectorAll("a");
      links.forEach((link) => {
        link.classList.remove(
          "flex-col",
          "items-center",
          "justify-center",
          "gap-1"
        );
        link.classList.add("flex-row", "items-center", "gap-3", "px-4");
      });

      // Thêm padding để cân
      ulEl.classList.add("px-4");
    } else {
      // Thu gọn sidebar
      sidebar.classList.remove("w-[240px]");
      sidebar.classList.add("w-[88px]");

      // Ẩn text trong sidebar
      const spans = sidebar.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.display = "none";
      });

      // Khôi phục layout của các item từ horizontal sang vertical
      const links = sidebar.querySelectorAll("a");
      links.forEach((link) => {
        link.classList.remove("flex-row", "items-center", "gap-3", "px-4");
        link.classList.add(
          "flex-col",
          "items-center",
          "justify-center",
          "gap-1"
        );
      });

      // xóa padding
      ulEl.classList.remove("px-4");
    }
  });
}
