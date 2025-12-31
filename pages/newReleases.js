import instance from "../src/httpRequest";
export default function NewRealeases() {
  return `
        <div class="w-[1200px] mx-auto">
            <section class="mb-20">
                <div class="flex items-end justify-between mb-10">
                    <h1 class="text-white text-5xl font-bold">Bản phát hành mới</h1>
                    <div class="flex gap-4">
                        <div class="js-newReleases-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-left text-gray-500"></i>
                        </div>
                        <div class="js-newReleases-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-right text-gray-500"></i>
                        </div>
                    </div>
                </div>
                <div class="overflow-hidden">
                    <div class="js-newReleases flex gap-3 transition-transform duration-500 ease-in-out"></div>
                </div>
            </section>
            <section class="mb-20">
                <div class="flex items-end justify-between mb-10">
                    <h1 class="text-white text-5xl font-bold">Video nhạc mới</h1>
                    <div class="flex gap-4">
                        <div class="js-new-music-videos-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-left text-gray-500"></i>
                        </div>
                        <div class="js-new-music-videos-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-right text-gray-500"></i>
                        </div>
                    </div>
                </div>
                <div class="overflow-hidden">
                    <div class="js-new-music-videos flex gap-3 transition-transform duration-500 ease-in-out"></div>
                </div>
            </section>
        </div>
    `;
}

export function newRealeasesScript() {
  // Hàm tạo slider navigation chung với width động
  function createSliderNavigation(
    containerSelector,
    prevBtnSelector,
    nextBtnSelector,
    visibleItems = 5
  ) {
    const container = document.querySelector(containerSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    if (!container || !prevBtn || !nextBtn || container.children.length === 0)
      return;

    let currentIndex = 0;
    const totalItems = container.children.length;
    const maxIndex = Math.max(0, totalItems - visibleItems);

    // Lấy width và gap động từ phần tử đầu tiên
    const getItemDimensions = () => {
      const firstItem = container.children[0];
      const itemWidth = firstItem.offsetWidth;

      // Lấy gap từ CSS computed style của container
      const containerStyle = window.getComputedStyle(container);
      const gap = parseFloat(containerStyle.gap) || 0;

      return { itemWidth, gap };
    };

    const handleSlide = (index) => {
      if (index > maxIndex || index < 0) return;

      const { itemWidth, gap } = getItemDimensions();
      const translateX = index * (itemWidth + gap);
      container.style.transform = `translateX(-${translateX}px)`;
      currentIndex = index;

      // Cập nhật trạng thái nút
      updateButtonState();
    };

    const updateButtonState = () => {
      // Disable nút previous khi ở đầu
      if (currentIndex <= 0) {
        prevBtn.style.opacity = "0.5";
        prevBtn.style.cursor = "not-allowed";
      } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.cursor = "pointer";
      }

      // Disable nút next khi ở cuối
      if (currentIndex >= maxIndex) {
        nextBtn.style.opacity = "0.5";
        nextBtn.style.cursor = "not-allowed";
      } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
      }
    };

    // Xử lý nút next
    nextBtn.addEventListener("click", () => {
      if (currentIndex >= maxIndex) return;
      handleSlide(currentIndex + 1);
    });

    // Xử lý nút previous
    prevBtn.addEventListener("click", () => {
      if (currentIndex <= 0) return;
      handleSlide(currentIndex - 1);
    });

    // Khởi tạo trạng thái ban đầu
    updateButtonState();

    // Xử lý resize window để tính lại khi màn hình thay đổi
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        handleSlide(currentIndex); // Tính lại vị trí với kích thước mới
      }, 250);
    });
  }
  async function fetchNewRealeases() {
    const response = await instance.get("/explore/new-releases");
    const albums = response.data.items;
    document.querySelector(".js-newReleases").innerHTML = albums
      .map((album) => {
        return `
            <a href="/albums/details/${album.id}" data-navigo class="shrink-0 block">
            <div class="relative group">
                <img src='${album.thumb}' alt='image' class="w-[220px] rounded-2xl"/>
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <i class="fa-solid fa-play text-white text-5xl"></i>
                </div>
            </div>
            <h3 class="text-white w-[220px] truncate">${album.name}</h3>
            <p class="text-gray-400">${album.albumType}</p>
            </a>
        `;
      })
      .join("");
    createSliderNavigation(
      ".js-newReleases",
      ".js-newReleases-previous-btn",
      ".js-newReleases-next-btn"
    );
  }
  fetchNewRealeases();

  async function fetchVideos() {
    const response = await instance.get("/explore/videos");
    const videos = response.data.items;
    document.querySelector(".js-new-music-videos").innerHTML = videos
      .map((video) => {
        return `
              <a href="/videos/details/${video.slug}" data-navigo class="shrink-0">
                  <div class="relative group">
                      <img class="rounded-xl w-full h-[180px]" src='${video.thumb}' alt='image'/>
                      <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <i class="fa-solid fa-play text-white text-5xl"></i>
                      </div>
                  </div>
                  <p class="text-white">${video.name}</p>
                  <p class="text-white">${video.views} lượt xem</p>
              </a>
          `;
      })
      .join("");
    createSliderNavigation(
      ".js-new-music-videos",
      ".js-new-music-videos-previous-btn",
      ".js-new-music-videos-next-btn"
    );
  }
  fetchVideos();
}
