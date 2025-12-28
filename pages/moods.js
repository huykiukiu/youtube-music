import instance from "../src/httpRequest";
export default function Moods() {
  return `
        <div class="js-moods-container w-[1200px] mx-auto">
            <div class="js-moods-cate"></div>
            <div class="js-moods-quick"></div>
            <div class="js-moods-relax"></div>
        </div>
    `;
}

export function moodsScript(slug) {
  async function fetchMoodsCategories(params) {
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
    const response = await instance.get(`/quick-picks?mood=relax`);
    const moods = response.data;
    console.log(moods);
    const moodQuickEl = document.querySelector(".js-moods-quick");
    moodQuickEl.innerHTML = moods.map((mood) => {
      return ``;
    });
  }
  fetchQuickPickMood();
  async function fetchMoodsRelax() {
    const response = await instance.get(`moods/relax`);
    const moods = response.data.items;
  }
  fetchMoodsRelax();
}
