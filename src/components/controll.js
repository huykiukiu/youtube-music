export default function Controll() {
  return `
        <div class="js-controll fixed left-0 bottom-0 bg-[#212121] w-full h-20 flex items-center justify-between hidden">
            <input class="js-slider-controll w-full h-1 absolute top-0" type='range' value="0"/>
            <div class="flex items-center justify-between w-full px-5">
                <div class="flex items-center gap-5">
                    <button class="js-previous-btn text-white"><i class="fa-solid fa-backward-step text-xl"></i></button>
                    <button class="js-play-btn text-white"><i class="fa-solid fa-play text-3xl"></i></button>
                    <button class="js-pause-btn text-white hidden"><i class="fa-solid fa-pause text-3xl"></i></button>
                    <button class="js-next-btn text-white"><i class="fa-solid fa-forward-step text-xl"></i></button>
                    <div>
                        <span class="js-current-time text-white">0:00</span>
                        <span class="text-white">/</span>
                        <span class="js-total-duration text-white">0:00</span>
                    </div>
                </div>
                <div class="flex gap-5">
                    <div>
                        <img src='' alt=''class="js-img-controll w-10 h-10"/>
                    </div>
                    <div>
                        <h3 class="js-title-controll text-white font-semibold text-[14px] sm:text-base truncate"></h3>
                        <p class="js-artis-controll text-sm text-gray-400 truncate"></p>
                    </div>
                </div>
                <div class="flex items-center gap-5">
                    <button class="js-volume-btn text-white"><i class="js-icon-volume fa-solid fa-volume-high text-xl"></i></button>
                    <input type='range' class="js-volume-range" min="0" max="100" value="100"></input>
                    <button class="text-white"><i class="fa-solid fa-repeat text-lg md:text-xl"></i></button>
                    <button class="text-white"><i class="fa-solid fa-shuffle text-lg md:text-xl"></i></button>
                </div>
            </div>
            <audio class="js-audio-player" src=""></audio>
        </div>
    `;
}

export function controllScript() {
  const audioPlayerEl = document.querySelector(".js-audio-player"); //audio
  const playBtnEl = document.querySelector(".js-play-btn"); // nút play
  const pauseBtnEl = document.querySelector(".js-pause-btn"); //nút pause
  const volumeRangeEl = document.querySelector(".js-volume-range");
  const sliderEl = document.querySelector(".js-slider-controll");

  playBtnEl.addEventListener("click", () => {
    playBtnEl.classList.add("hidden");
    pauseBtnEl.classList.remove("hidden");
    audioPlayerEl.play();
  });

  pauseBtnEl.addEventListener("click", () => {
    playBtnEl.classList.remove("hidden");
    pauseBtnEl.classList.add("hidden");
    audioPlayerEl.pause();
  });

  audioPlayerEl.addEventListener("timeupdate", () => {
    const currentTimeEl = document.querySelector(".js-current-time");
    const sliderEl = document.querySelector(".js-slider-controll");
    const currentTime = Math.floor(audioPlayerEl.currentTime);
    sliderEl.value = currentTime;
    const totalSeconds = Math.floor(audioPlayerEl.currentTime);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    currentTimeEl.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  });

  // Xử lý tăng giảm âm lượng
  volumeRangeEl.addEventListener("input", (e) => {
    const audioPlayerEl = document.querySelector(".js-audio-player"); //audio
    const iconvolumeEl = document.querySelector(".js-icon-volume");
    const volume = e.target.value / 100;
    audioPlayerEl.volume = volume;
    if (volume === 0) {
      iconvolumeEl.className =
        "js-icon-volume fa-solid fa-volume-xmark text-xl";
    } else if (volume <= 0.5) {
      iconvolumeEl.className = "js-icon-volume fa-solid fa-volume-low text-xl";
    } else {
      iconvolumeEl.className = "js-icon-volume fa-solid fa-volume-high text-xl";
    }
  });

  // Xử lý kéo slider để tua nhạc:
  sliderEl.addEventListener("input", (e) => {
    audioPlayerEl.currentTime = sliderEl.value;
  });

  // update duration display:
  audioPlayerEl.addEventListener("loadedmetadata", () => {
    const totalDurationEl = document.querySelector(".js-total-duration");
    const duration = Math.floor(audioPlayerEl.duration);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    totalDurationEl.innerText = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    const sliderEl = document.querySelector(".js-slider-controll");
    // set max cho slider
    sliderEl.max = duration;
    sliderEl.value = 0;
  });
}
