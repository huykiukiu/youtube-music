import instance from "../src/httpRequest";
export default function Detail() {
  return `
    <div class="flex justify-evenly w-[1200px] mx-auto">
        <div class="js-infor-detail"></div>
        <div class="js-songs-detail"></div>
    </div>
  `;
}

export function detailScript(type, slud) {
  async function fetchPlaylistOrAlbumsDetail() {
    const response = await instance.get(`/${type}/details/${slud}`);
    const data = response.data;
    const totalSeconds = data.duration;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    console.log(response);
    document.querySelector(".js-infor-detail").innerHTML = `
        <div class="flex flex-col items-center justify-center gap-3 sticky top-24">
            <img src='${data.thumbnails[0]}' alt='image' class="w-100 h-100 object-cover rounded-xl"/>
            <h1 class="text-white text-2xl">${data.title}</h1>
            <p class="text-white/70">${data.description}</p>
            <div>
                <span class="text-white/70">${data.tracks.length} bài hát</span>
                <span class="text-white/70">•</span>
                <span class="text-white/70">${hours} giờ ${minutes} phút</span>
            </div>
            <p class="text-white/70">Các nghệ sĩ: ${data.artists}</p>
        </div>
    `;
    document.querySelector(".js-songs-detail").innerHTML = data.tracks
      .map((item) => {
        return `
        <a href="/playlists/details/${item.slug}" class="relative group hover:bg-white/10 p-2 block">
            <div class="flex gap-5">
                <div class="relative group">
                    <img src='${item.thumbnails[0]}' alt='image' class="w-12 h-12 object-cover rounded-md"/>
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <i class="fa-solid fa-play text-white text-sm"></i>
                    </div>
                </div>
                <div>
                    <h3 class="text-white">${item.title}</h3>
                    <h3 class="text-gray-400">${item.artists}</h3>
                </div>
            </div>
        </a>
      `;
      })
      .join("");
  }
  fetchPlaylistOrAlbumsDetail();
}
