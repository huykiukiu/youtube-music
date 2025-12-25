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
                        <div class="js-album-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-left text-gray-500"></i>
                        </div>
                        <div class="js-album-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
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
                        <div class="js-album-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-left text-gray-500"></i>
                        </div>
                        <div class="js-album-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
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
                        <div class="js-album-previous-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
                            <i class="fa-solid fa-angle-left text-gray-500"></i>
                        </div>
                        <div class="js-album-next-btn w-8 h-8 rounded-full bg-[#132337] flex justify-center items-center cursor-pointer">
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
  async function fetchAlbumsInExplore() {
    const response = await instance.get("/explore/albums");
    const albums = response.data.items;
    document.querySelector(".js-explore-albums").innerHTML = albums
      .map((album) => {
        return `
            <a href="/albums/details/${album.slug}" class="shrink-0 block">
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
                        <a href='' class="text-white flex bg-[#292929] items-center h-10">
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
  }
  fetchGenre();

  async function fetchVideos() {
    const response = await instance.get("/explore/videos");
    const videos = response.data.items;
    console.log(videos);

    document.querySelector(".js-explore-videos").innerHTML = videos
      .map((video) => {
        return `
            <div class="shrink-0">
                <img class="rounded-xl w-full h-[180px]" src='${video.thumb}' alt='image'/>
                <p class="text-white">${video.name}</p>
                <p class="text-white">${video.views} lượt xem</p>
            </div>
        `;
      })
      .join("");
  }
  fetchVideos();
}
