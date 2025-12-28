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
    console.log(data.tracks);
    document.querySelector(".js-infor-detail").innerHTML = `
        <div class="flex flex-col items-center justify-center gap-3 sticky top-24">
            <img src='${data.thumbnails[0]}' alt='image' class="w-100 h-100 object-cover rounded-xl"/>
            <h1 class="text-white text-2xl">${data.tracks.title}</h1>
            <p class="text-white/70">${data.tracks.description}</p>
            <div>
                <span class="text-white/70">${data.tracks.length} bài hát</span>
                <span class="text-white/70">•</span>
                <span class="text-white/70">${hours} giờ ${minutes} phút</span>
            </div>
            <p class="text-white/70">Các nghệ sĩ: ${data.tracks.artists}</p>
        </div>
    `;
    document.querySelector(".js-songs-detail").innerHTML = data.tracks
      .map((item) => {
        return `
        <div data-src="${item.audioUrl}" class="js-song relative group hover:bg-white/10 p-2 block cursor-pointer">
            <div class="flex gap-5">
                <div class="relative group">
                    <img src='${item.thumbnails[0]}' alt='image' class="w-12 h-12 object-cover rounded-md"/>
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <i class="fa-solid fa-play text-white text-sm"></i>
                    </div>
                </div>
                <div>
                    <h3 class="text-white">${item.title}</h3>
                    <p class="text-gray-400">${item.artists}</p>
                </div>
            </div>
        </div>
      `;
      })
      .join("");
  }
  fetchPlaylistOrAlbumsDetail();

  // phát nhạc khi chọn bài hát
  const songsListDetailEl = document.querySelector(".js-songs-detail");
  songsListDetailEl.addEventListener("click", (e) => {
    const song = e.target.closest(".js-song");
    if (song) {
      const controllEl = document.querySelector(".js-controll");
      controllEl.classList.remove("hidden");
      const audioPlayerEl = document.querySelector(".js-audio-player"); //audio
      const playBtnEl = document.querySelector(".js-play-btn"); // nút play
      const pauseBtnEl = document.querySelector(".js-pause-btn"); //nút pause
      playBtnEl.classList.add("hidden");
      pauseBtnEl.classList.remove("hidden");

      // các lấy một vài thuộc tính của phần tử bị click:
      const imgSongSrc = song.querySelector("img").src;
      const titleSong = song.querySelector("h3").innerText;
      const artisSong = song.querySelector("p").innerText;
      console.log(imgSongSrc, artisSong, titleSong);

      // các phần tử ở controll để hiển thị:
      const imgSongControllEL = document.querySelector(".js-img-controll");
      const titleSongControllEl = document.querySelector(".js-title-controll");
      const artisSongControllEl = document.querySelector(".js-artis-controll");
      imgSongControllEL.src = imgSongSrc;
      titleSongControllEl.innerText = titleSong;
      artisSongControllEl.innerText = artisSong;

      audioPlayerEl.src = song.dataset.src;
      audioPlayerEl.play();
    }
  });

  // update duration display:
  const audioPlayerEl = document.querySelector(".js-audio-player");
  audioPlayerEl.addEventListener("loadedmetadata", () => {
    const totalDurationEl = document.querySelector(".js-total-duration");
    const duration = Math.floor(audioPlayerEl.duration);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    totalDurationEl.innerText = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  });
}
