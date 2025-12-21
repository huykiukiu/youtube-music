import instance from "../src/httpRequest";
export default function Home() {
  return `
    <div class="mb-35">
        <div class="js-moods flex gap-5 mb-35"></div>
        <div>
            <div class="flex items-end justify-between">
                    <h1 class="text-white text-5xl font-bold">Quick picks</h1>
                    <div class="flex gap-4">
                        <div class="w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-left text-gray-500"></i>
                        </div>
                        <div class="w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-right text-gray-500"></i>
                        </div>
                    </div>
            </div>
            <div class="js-quickPicks my-3"></div>
        </div>
    </div>
    <div class="mb-20">
        <div class="flex items-end justify-between mb-10">
            <h1 class="text-white text-5xl font-bold">Album gợi ý cho bạn</h1>
                <div class="flex gap-4">
                    <div class="w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-left text-gray-500"></i>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-right text-gray-500"></i>
                    </div>
                </div>
        </div>
        <div class="js-album-suggestions flex gap-3 overflow-hidden overflow-x-auto"></div>
    </div>
    <div class="mb-20">
        <div class="flex items-end justify-between mb-10">
            <h1 class="text-white text-5xl font-bold">Today's Hits</h1>
                <div class="flex gap-4">
                    <div class="w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-left text-gray-500"></i>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-right text-gray-500"></i>
                    </div>
                </div>
        </div>
        <div class="js-today-hits flex gap-3 overflow-hidden overflow-x-auto"></div>
    </div>
    <div>
        <div class="flex items-end justify-between mb-10">
            <h1 class="text-white text-5xl font-bold">Nhạc Việt</h1>
                <div class="flex gap-4">
                    <div class="w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-left text-gray-500"></i>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-angle-right text-gray-500"></i>
                    </div>
                </div>
        </div>
        <div class="js-vietnamese-music flex gap-3 overflow-hidden overflow-x-auto"></div>
    </div>
  `;
}

export function homeScript() {
  async function fetchMoods() {
    const response = await instance.get("/moods");
    const moods = response.data.items;
    document.querySelector(".js-moods").innerHTML = moods
      .map(
        (mood) =>
          `<button class=" bg-[#39414C] text-white px-2 py-1 rounded-md cursor-pointer text-[14px]">${mood.name}</button>`
      )
      .join("");
  }
  fetchMoods();

  async function fetchQuickPicks() {
    const response = await instance.get("/quick-picks");
    const data = response.data;

    document.querySelector(".js-quickPicks").innerHTML = data.map((item) => {
      return `
        <div class="hover:bg-white/10 p-2">
            <div class="flex gap-5">
                <div>
                    <img src='${item.thumbnails[0]}' alt='image' class="w-12 h-12 object-cover rounded-md"/>
                </div>
                <div>
                    <h3 class="text-white">${item.title}</h3>
                    <h3 class="text-gray-400">${item.artists} • <span>${item.popularity} lượt nghe</span></h3>
                </div>
            </div>
        </div>
      `;
    });
  }
  fetchQuickPicks();

  async function fecthAlbumSuggestions() {
    const response = await instance.get("/home/albums-for-you");
    const data = response.data;
    document.querySelector(".js-album-suggestions").innerHTML = data.map(
      (item) => {
        return `
        <div class="shrink-0">
          <img src='${item.thumbnails}' alt='image' class="w-[220px] rounded-2xl"/>
          <h3 class="text-white w-[220px] truncate">${item.title}</h3>
          <p class="text-gray-400">${item.artists}</p>
        </div>
      `;
      }
    );
  }
  fecthAlbumSuggestions();

  async function fetchTodayHits() {
    const response = await instance.get("/home/todays-hits");
    const data = response.data;
    document.querySelector(".js-today-hits").innerHTML = data.map((item) => {
      return `
        <div class="shrink-0">
          <img src='${item.thumbnails}' alt='image' class="w-[220px] h-[220px] object-cover rounded-2xl"/>
          <h3 class="text-white  w-[220px] truncate">${item.title}</h3>
          <p class="text-gray-400">${item.artists}</p>
        </div>
      `;
    });
  }
  fetchTodayHits();

  async function vietnameseMusic() {
    const response = await instance.get("/playlists/by-country?country=VN");
    const data = response.data;
    document.querySelector(".js-vietnamese-music").innerHTML = data.map(
      (item) => {
        return `
        <div class="shrink-0">
          <img src='${item.thumbnails}' alt='image' class="w-[220px] h-[220px] object-cover rounded-2xl"/>
          <h3 class="text-white  w-[220px] truncate">${item.title}</h3>
          <p class="text-gray-400">${item.artists}</p>
        </div>
      `;
      }
    );
  }
  vietnameseMusic();
}
