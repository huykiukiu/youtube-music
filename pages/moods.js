import instance from "../src/httpRequest";
export default function Moods() {
  return `
        <div class="js-moods-container w-[1200px] mx-auto">
            <div class="js-moods flex gap-5 mb-35"></div>
            <section class="js-moods-cate mb-35"></section>
            <section class="mb-20">
              <div class="flex items-end justify-between mb-10">
                <h1 class="text-white text-5xl font-bold">Quick Picks</h1>
                <div class="flex gap-4">
                    <div class="js-quickPick-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-left text-gray-500"></i>
                    </div>
                    <div class="js-quickPick-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-right text-gray-500"></i>
                    </div>
                </div>
              </div>
              <div class="overflow-hidden">
                <div class="js-moods-quick"></div>
              </div>
            </section>
            <section class="mb-20">
              <div class="flex items-end justify-between mb-10">
                <h1 class="text-white text-5xl font-bold">Featured</h1>
                <div class="flex gap-4">
                    <div class="js-featured-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-left text-gray-500"></i>
                    </div>
                    <div class="js-featured-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-right text-gray-500"></i>
                    </div>
                </div>
              </div>
              <div class="overflow-hidden">
                <div class="js-moods-featured flex gap-3 transition-transform duration-500 ease-in-out"></div>
              </div>
            </section>
            <section class="mb-20">
              <div class="flex items-end justify-between mb-10">
                <h1 class="text-white text-5xl font-bold">More picks</h1>
                <div class="flex gap-4">
                    <div class="js-morePicks-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-left text-gray-500"></i>
                    </div>
                    <div class="js-morePicks-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-right text-gray-500"></i>
                    </div>
                </div>
              </div>
              <div class="overflow-hidden">
                <div class="js-moods-morePicks flex gap-3 transition-transform duration-500 ease-in-out"></div>
              </div>
            </section>
        </div>
    `;
}

export function moodsScript(slug) {
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

  async function fetchMoods() {
    const response = await instance.get("/moods");
    const moods = response.data.items;
    console.log(moods);

    document.querySelector(".js-moods").innerHTML = moods
      .map((mood) => {
        return `
        <a href="/moods/${mood.slug}" data-navigo class="group"> 
          <button class="bg-[#39414C] text-white px-2 py-1 rounded-md cursor-pointer text-[14px] group-hover:bg-gray-400">${mood.name}</button>
        </a>
        `;
      })
      .join("");
  }
  fetchMoods();

  async function fetchMoodsCategories() {
    const response = await instance.get(`/moods/${slug}`);
    const mood = response.data.hero;
    const moodCateEl = document.querySelector(".js-moods-cate");
    moodCateEl.innerHTML = `
        <div>
            <h1 class="font-bold text-[45px] mb-4 text-white">${mood.title}</h1>
            <p class="text-white">${mood.subtitle}</p>
        </div>
    `;
  }
  fetchMoodsCategories();
  async function fetchQuickPickMood() {
    const response = await instance.get(`/quick-picks?mood=${slug}`);
    const moods = response.data;
    const moodQuickEl = document.querySelector(".js-moods-quick");
    moodQuickEl.innerHTML = moods.map((mood) => {
      return `
        <a href="/playlists/details/${mood.slug}" data-navigo class="relative group hover:bg-white/10 p-2 block">
            <div class="flex gap-5">
                <div class="relative group">
                    <img src='${mood.thumbnails[0]}' alt='image' class="w-12 h-12 object-cover rounded-md"/>
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <i class="fa-solid fa-play text-white text-sm"></i>
                    </div>
                </div>
                <div>
                    <h3 class="text-white">${mood.title}</h3>
                    <h3 class="text-gray-400">${mood.artists} • <span>${mood.popularity} lượt nghe</span></h3>
                </div>
            </div>
        </a>
      `;
    });
    createSliderNavigation(
      ".js-moods-quick",
      "js-quickPick-previous-btn",
      ".js-quickPick-next-btn"
    );
  }
  fetchQuickPickMood();

  async function fetchMoodsFeatured() {
    const response = await instance.get(`moods/relax`);
    const featured = response.data.sections[0].items;
    console.log("featured: ", featured);
    // hiển thị cho feature:
    const moodsFeaturedEl = document.querySelector(".js-moods-featured");
    moodsFeaturedEl.innerHTML = featured.map((feature) => {
      return `
        <a href="/playlists/details/${feature.slug}" data-navigo class="shrink-0 block">
          <div class="relative group">
            <img src='${feature.thumbnails}' alt='image' class="w-[220px] h-[220px] object-cover rounded-2xl"/>
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <i class="fa-solid fa-play text-white text-5xl"></i>
            </div>
          </div>
          <h3 class="text-white w-[220px] truncate">${feature.title}</h3>
          <p class="text-gray-400">${feature.artists}</p>
        </a>
      `;
    });
    createSliderNavigation(
      ".js-moods-featured",
      ".js-featured-previous-btn",
      ".js-featured-next-btn"
    );
  }
  fetchMoodsFeatured();

  async function fetchMoodsMorePick() {
    const response = await instance.get(`moods/relax`);
    const morePicks = response.data.sections[1].items;
    console.log("morePicks: ", morePicks);
    // hiển thị cho more picks:
    const moodsMorePicksEl = document.querySelector(".js-moods-morePicks");
    moodsMorePicksEl.innerHTML = morePicks.map((morePick) => {
      return `
        <a href="/playlists/details/${morePick.slug}" data-navigo class="shrink-0 block">
          <div class="relative group">
            <img src='${morePick.thumbnails}' alt='image' class="w-[220px] h-[220px] object-cover rounded-2xl"/>
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <i class="fa-solid fa-play text-white text-5xl"></i>
            </div>
          </div>
          <h3 class="text-white w-[220px] truncate">${morePick.title}</h3>
          <p class="text-gray-400">${morePick.artists}</p>
        </a>
      `;
    });
    createSliderNavigation(
      ".js-moods-morePicks",
      ".js-morePicks-previous-btn",
      ".js-morePicks-next-btn"
    );
  }
  fetchMoodsMorePick();
}
