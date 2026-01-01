import instance from "../src/httpRequest";
import router from "../route/router";
export default function Home() {
  return `
  <div class="w-[1200px] mx-auto">
    <h2 class="js-hello text-4xl lg:text-5xl font-semibold text-white mb-20 hidden"></h2>
    <section class="mb-35">
        <div class="js-moods flex gap-5 mb-35"></div>
        <div class="js-heard-recently-wrap mb-35 hidden">
          <h1 class="text-white text-5xl font-bold mb-5">Nghe gần đây</h1>
          <div class="js-heard-recently flex gap-5 overflow-y-auto"></div>
        </div>
        <div>
            <div class="flex items-end justify-between">
                <h1 class="text-white text-5xl font-bold">Quick picks</h1>
            </div> 
            <div class="overflow-hidden">
                <div class="js-quickPicks my-3 transition-transform duration-500 ease-in-out"></div>
            </div>
        </div>
    </section>
    <section class="mb-20">
        <div class="flex items-end justify-between mb-10">
            <h1 class="text-white text-5xl font-bold">Album gợi ý cho bạn</h1>
            <div class="flex gap-4">
                <div class="js-album-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                    <i class="fa-solid fa-angle-left text-gray-500"></i>
                </div>
                <div class="js-album-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                    <i class="fa-solid fa-angle-right text-gray-500"></i>
                </div>
            </div>
        </div>
        <div class="overflow-hidden">
            <div class="js-album-suggestions flex gap-3 transition-transform duration-500 ease-in-out"></div>
        </div>
    </section>
    <section class="mb-20">
        <div class="flex items-end justify-between mb-10">
            <h1 class="text-white text-5xl font-bold">Today's Hits</h1>
            <div class="flex gap-4">
                <div class="js-todayhits-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                    <i class="fa-solid fa-angle-left text-gray-500"></i>
                </div>
                <div class="js-todayhits-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                    <i class="fa-solid fa-angle-right text-gray-500"></i>
                </div>
            </div>
        </div>
        <div class="overflow-hidden">
            <div class="js-today-hits flex gap-3 transition-transform duration-500 ease-in-out"></div>
        </div>
    </section>
    <section>
        <div class="flex items-end justify-between mb-10">
            <h1 class="text-white text-5xl font-bold">Nhạc Việt</h1>
            <div class="flex gap-4">
                <div class="js-vietnamese-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                    <i class="fa-solid fa-angle-left text-gray-500"></i>
                </div>
                <div class="js-vietnamese-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                    <i class="fa-solid fa-angle-right text-gray-500"></i>
                </div>
            </div>
        </div>
        <div class="overflow-hidden">
            <div class="js-vietnamese-music flex gap-3 transition-transform duration-500 ease-in-out"></div>
        </div>
    </section>
  </div>
  `;
}

export function homeScript() {
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

  async function fetchQuickPicks() {
    const response = await instance.get("/quick-picks");
    const data = response.data;
    document.querySelector(".js-quickPicks").innerHTML = data
      .map((item) => {
        return `
        <a href="/playlists/details/${item.slug}" data-navigo class="relative group hover:bg-white/10 p-2 block">
            <div class="flex gap-5">
                <div class="relative group">
                    <img src='${item.thumbnails[0]}' alt='image' class="w-12 h-12 object-cover rounded-md"/>
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <i class="fa-solid fa-play text-white text-sm"></i>
                    </div>
                </div>
                <div>
                    <h3 class="text-white">${item.title}</h3>
                    <h3 class="text-gray-400">${item.artists} • <span>${item.popularity} lượt nghe</span></h3>
                </div>
            </div>
        </a>
      `;
      })
      .join("");

    // Khởi tạo slider cho Quick Picks
    // createSliderNavigation(
    //   ".js-quickPicks",
    //   ".js-quickpicks-previous-btn",
    //   ".js-quickpicks-next-btn",
    //   1
    // );
  }
  fetchQuickPicks();

  async function fecthAlbumSuggestions() {
    const response = await instance.get("/home/albums-for-you");
    const data = response.data;
    document.querySelector(".js-album-suggestions").innerHTML = data
      .map((item) => {
        return `
        <a href="/albums/details/${item.slug}" data-navigo class="shrink-0 block">
          <div class="relative group">
            <img src='${item.thumbnails}' alt='image' class="w-[220px] rounded-2xl"/>
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <i class="fa-solid fa-play text-white text-5xl"></i>
            </div>
          </div>
          <h3 class="text-white w-[220px] truncate">${item.title}</h3>
          <p class="text-gray-400">${item.artists}</p>
        </a>
      `;
      })
      .join("");

    // Khởi tạo slider cho Album Suggestions
    createSliderNavigation(
      ".js-album-suggestions",
      ".js-album-previous-btn",
      ".js-album-next-btn"
    );
  }
  fecthAlbumSuggestions();

  async function fetchTodayHits() {
    const response = await instance.get("/home/todays-hits");
    const data = response.data;
    document.querySelector(".js-today-hits").innerHTML = data
      .map((item) => {
        return `
        <a href="/playlists/details/${item.slug}" data-navigo class="shrink-0 block">
          <div class="relative group">
            <img src='${item.thumbnails}' alt='image' class="w-[220px] h-[220px] object-cover rounded-2xl"/>
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <i class="fa-solid fa-play text-white text-5xl"></i>
            </div>
          </div>  
          <h3 class="text-white w-[220px] truncate">${item.title}</h3>
          <p class="text-gray-400">${item.artists}</p>
        </a>
      `;
      })
      .join("");

    // Khởi tạo slider cho Today's Hits
    createSliderNavigation(
      ".js-today-hits",
      ".js-todayhits-previous-btn",
      ".js-todayhits-next-btn"
    );
  }
  fetchTodayHits();

  async function fetchVietnameseMusic() {
    const response = await instance.get("/playlists/by-country?country=VN");
    const data = response.data;
    document.querySelector(".js-vietnamese-music").innerHTML = data
      .map((item) => {
        return `
        <a href="/playlists/details/${item.slug}" data-navigo class="shrink-0 block">
          <div class="relative group">
            <img src='${item.thumbnails}' alt='image' class="w-[220px] h-[220px] object-cover rounded-2xl"/>
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <i class="fa-solid fa-play text-white text-5xl"></i>
            </div>
          </div>
          <h3 class="text-white w-[220px] truncate">${item.title}</h3>
          <p class="text-gray-400">${item.artists}</p>
        </a>
      `;
      })
      .join("");

    // Khởi tạo slider cho Vietnamese Music
    createSliderNavigation(
      ".js-vietnamese-music",
      ".js-vietnamese-previous-btn",
      ".js-vietnamese-next-btn"
    );
  }
  fetchVietnameseMusic();

  async function fetchHeardRecently() {
    const response = await instance.get("home/personalized?limit=12");
    const data = response.data;
    console.log(data);
    document.querySelector(".js-heard-recently").innerHTML = data
      .map((item) => {
        return `
        <a href="/${item.type}s/details/${item.id}" data-navigo class="shrink-0 block">
          <div class="relative group">
            <img src='${item.thumbnails}' alt='image' class="w-[220px] h-[220px] object-cover  rounded-2xl"/>
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <i class="fa-solid fa-play text-white text-5xl"></i>
            </div>
          </div>
          <h3 class="text-white w-[220px] truncate">${item.title}</h3>
          <p class="text-gray-400">${item.artists}</p>
        </a>
      `;
      })
      .join("");
  }
  fetchHeardRecently();

  // xử lý UI khi đăng nhập:
  function handleUIlogin() {
    const token = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userAvatarEl = document.querySelector("#js-user-avatar");
    const loginBtnEl = document.querySelector(".js-login-btn");
    const heardRecentlyWrapEl = document.querySelector(
      ".js-heard-recently-wrap"
    );
    const dropdownAvatarEl = document.querySelector(".js-dropdown-avatar");
    if (!token) {
      userAvatarEl.classList.add("hidden");
      loginBtnEl.classList.remove("hidden");
      heardRecentlyWrapEl.classList.add("hidden");
      return;
    }
    const userCopy = { ...user };
    const avatar = userCopy.name.slice(0, 1); //cắt tên để làm avât
    const helloEL = document.querySelector(".js-hello");
    helloEL.classList.remove("hidden");
    helloEL.innerText = `👋 Chào mừng ${user.name}`;

    // xử lý hiển thị avatar acton:
    userAvatarEl.classList.remove("hidden");
    userAvatarEl.innerHTML = avatar;
    loginBtnEl.classList.add("hidden");

    // hiển thị danh sách nghe gần đây khi đăng nhập
    heardRecentlyWrapEl.classList.remove("hidden");

    // xử lý khi click vào avtar:
    userAvatarEl.addEventListener("click", () => {
      dropdownAvatarEl.classList.toggle("hidden");
    });
  }
  handleUIlogin();

  async function handleLogout() {
    const userAvatarEl = document.querySelector("#js-user-avatar");
    const loginBtnEl = document.querySelector(".js-login-btn");
    const dropdownAvatarEl = document.querySelector(".js-dropdown-avatar");
    const logoutBtn = document.querySelector(".js-logout-btn");
    if (!logoutBtn) return;
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.navigate("/login");
        return;
      }
      // xử lý khi click vào avtar:
      userAvatarEl.addEventListener("click", () => {
        dropdownAvatarEl.classList.toggle("hidden");
      });
      try {
        await fetch("https://youtube-music.f8team.dev/api/auth/logout", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        alert("Đã đăng xuất");
        dropdownAvatarEl.classList.add("hidden");
        userAvatarEl.classList.add("hidden");
        loginBtnEl.classList.remove("hidden");
        router.navigate("/login");
        // Gọi lại để bind event listener cho DOM mới
        // setTimeout(() => {
        //   handleUIlogin();
        // }, 100);
      }
    });
  }
  handleLogout();
}
