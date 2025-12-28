import instance from "../httpRequest";
export function searchController() {
  const searchEl = document.querySelector(".js-search-input");
  searchEl.addEventListener("input", async (e) => {
    const response = await instance.get(
      `search/suggestions?q=${e.target.value}`
    );
    const results = response.data.suggestions;
    const searchSuggestionEl = document.querySelector(".js-search-suggestions");
    searchSuggestionEl.innerHTML = results
      .map((result) => {
        return `
            <a href='' class="text-white block px-5">
                <span class="text-white/10"><i class="fa-solid fa-magnifying-glass"></i></span>
                <span>${result}</span>
            </a>
        `;
      })
      .join("");
  });
}
