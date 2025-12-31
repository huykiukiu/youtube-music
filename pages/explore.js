import instance from "../src/httpRequest";

export default function Explore() {
  return `
        <div class="w-[1200px] mx-auto">
            <section class="flex justify-evenly gap-4 mb-35">
                <a href='/new-releases' class="flex items-center gap-3 px-6 py-3 text-white bg-white/10 rounded-md w-full hover:bg-white/20">
                    <i class="fa-solid fa-compact-disc text-2xl"></i>
                    <span>Bản phát hành mới</span>
                </a>
                <a href='/chart' class="flex items-center gap-3 px-6 py-3 text-white bg-white/10 rounded-md w-full hover:bg-white/20">
                    <i class="fa-solid fa-chart-line text-2xl"></i>
                    <span>Bảng xếp hạng</span>
                </a>
                <a href="/moods-and-genres" class="flex items-center gap-3 px-6 py-3 text-white bg-white/10 rounded-md w-full hover:bg-white/20">
                    <i class="fa-regular fa-face-smile text-2xl"></i>
                    <span>Tâm trạng và thể loại</span>
                </a>
            </section>
            <section class="mb-20">
                <div class="flex items-end justify-between mb-10">
                    <h1 class="text-white text-5xl font-bold">Khám phá Albums mới</h1>
                    <div class="flex gap-4">
                        <div class="js-explore-album-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-left text-gray-500"></i>
                        </div>
                        <div class="js-explore-album-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-right text-gray-500"></i>
                        </div>
                    </div>
                </div>
                <div class="overflow-hidden">
                    <div class="js-explore-albums flex gap-3 transition-transform duration-500 ease-in-out"></div>
                </div>
            </section>
            <section class="mb-20">
                <div class="flex items-end justify-between mb-10">
                    <h1 class="text-white text-5xl font-bold">Tâm trạng và thể loại</h1>
                    <div class="flex gap-4">
                        <div class="js-genre-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-left text-gray-500"></i>
                        </div>
                        <div class="js-genre-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-right text-gray-500"></i>
                        </div>
                    </div>
                </div>
                <div class="overflow-hidden">
                    <div class="js-explore-genre flex gap-3 transition-transform duration-500 ease-in-out"></div>
                </div>
            </section>
            <section class="mb-20">
                <div class="flex items-end justify-between mb-10">
                    <h1 class="text-white text-5xl font-bold">Video nhạc mới</h1>
                    <div class="flex gap-4">
                        <div class="js-explore-videos-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-left text-gray-500"></i>
                        </div>
                        <div class="js-explore-videos-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-right text-gray-500"></i>
                        </div>
                    </div>
                </div>
                <div class="overflow-hidden">
                    <div class="js-explore-videos flex gap-3 transition-transform duration-500 ease-in-out"></div>
                </div>
            </section>
        </div>
    `;
}

export function exploreScript() {
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
  async function fetchAlbumsInExplore() {
    const response = await instance.get("/explore/albums");
    const albums = response.data.items;
    document.querySelector(".js-explore-albums").innerHTML = albums
      .map((album) => {
        return `
            <a href="/albums/details/${album.slug}" data-navigo class="shrink-0 block">
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
      ".js-explore-albums",
      ".js-explore-album-previous-btn",
      ".js-explore-album-next-btn"
    );
  }
  fetchAlbumsInExplore();

  async function fetchGenre() {
    function chunkArray(arrayAlbums, size = 5) {
      const result = [];
      for (let i = 0; i < arrayAlbums.length; i += size) {
        result.push(arrayAlbums.slice(i, i + size));
      }
      return result;
    }
    const response = await instance.get("/explore/meta");
    const albums = response.data.categories;
    const newArrAlbums = chunkArray(albums, 5);
    document.querySelector(".js-explore-genre").innerHTML = newArrAlbums.map(
      (array) => {
        return `
            <div class="flex flex-col w-full gap-5">
                ${array
                  .map((item) => {
                    return `
                        <a href='/${item.slug}' data-navigo class="text-white flex bg-[#292929] items-center h-10">
                            <div style="background-color:${item.color};" class="h-full w-2 rounded-l-[999px] rounded-tr-[30px] rounded-br-[30px]"></div>
                            <p class="flex-1 flex justify-center">${item.name}</p>
                        </a>
                    `;
                  })
                  .join("")}
            </div>
        `;
      }
    );
    createSliderNavigation(
      ".js-explore-genre",
      ".js-genre-previous-btn",
      ".js-genre-next-btn"
    );
  }
  fetchGenre();

  async function fetchVideos() {
    const response = await instance.get("/explore/videos");
    const videos = response.data.items;
    console.log(videos);

    document.querySelector(".js-explore-videos").innerHTML = videos
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
      ".js-explore-videos",
      ".js-explore-videos-previous-btn",
      ".js-explore-videos-next-btn"
    );
  }
  fetchVideos();
}
