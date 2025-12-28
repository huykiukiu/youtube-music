export default function Controll() {
  return `
        <div class="js-controll fixed left-0 bottom-0 bg-[#212121] w-full h-16 flex items-center justify-between hidden">
            <input class="w-full h-1 absolute top-0" type='range'/>
            <div class="flex items-center justify-between w-full">
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
                <div class="flex items-center gap-5">
                    <button class="text-white"><i class="fa-solid fa-volume-high text-xl"></i></button>
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
    const totalSeconds = Math.floor(audioPlayerEl.currentTime);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    currentTimeEl.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  });
}
