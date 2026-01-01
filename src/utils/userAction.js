export default function userAction() {
  const userActionEl = document.querySelector(".js-user-action");
  userActionEl.addEventListener("click", (e) => {
    const avatarBtnEl = e.target.closest(".js-user-avatar");
    if (avatarBtnEl) {
      const dropdown = document.querySelector("#js-dropdown-avatar");
      dropdown?.classList.toggle("hidden");
    }
  });
}
