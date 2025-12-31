import instance from "../src/httpRequest";
export default function VideoDetail() {
  return `
    <div class="flex justify-evenly w-[80%] mx-auto gap-20">
        <iframe
            class="js-main-video"
            width="900"
            height="500"
            src=""
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen>
        </iframe>
        <div class="js-videos-detail w-[300px] h-[500px] overflow-y-auto"></div>
    </div>
  `;
}

export function videosScript(slug) {
  async function fetchAllVideos() {
    const response = await instance.get(`/videos/details/${slug}`);
    const related = response.data.related;
    console.log("res", response);

    // xử lý chạy video
    const iframeEl = document.querySelector(".js-main-video");
    iframeEl.src = `https://www.youtube.com/embed/${response.data.videoId}?autoplay=1`;

    document.querySelector(".js-videos-detail").innerHTML = related
      .map((item) => {
        return `
        <div data-id-video="${item.videoId}" class="js-video relative group hover:bg-white/10 p-2 block cursor-pointer">
            <div class="flex gap-5">
                <div class="relative group">
                    <img src='${item.thumbnails[0]}' alt='image' class="w-12 h-12 object-cover rounded-lg"/>
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <i class="fa-solid fa-play text-white text-sm"></i>
                    </div>
                </div>
                <div>
                    <h3 class="text-white">${item.title}</h3>
                    <p class="text-gray-400">${item.popularity} lượt xem</p>
                </div>
            </div>
        </div>
      `;
      })
      .join("");
  }
  fetchAllVideos();

  // xử lý chọn video ở phần related:
  const videoListEL = document.querySelector(".js-videos-detail");
  videoListEL.addEventListener("click", (e) => {
    const videoEl = e.target.closest(".js-video");
    console.log(videoEl);
    if (videoEl) {
      const iframeEl = document.querySelector(".js-main-video");
      iframeEl.src = `https://www.youtube.com/embed/${videoEl.dataset.idVideo}?autoplay=1`;
    }
  });
}
