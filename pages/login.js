import router from "../route/router";
export default function Login() {
  return `
        <div class="js-login-wrap flex justify-center items-center">
            <form class="js-login-form bg-purple-500 max-w-[400px] bg-white/10 rounded-xl shadow-xl border border-white/20">
                <div class="p-10">
                    <h1 class="font-semibold text-white text-center text-xl mb-6">ĐĂNG NHẬP</h1>
                    <div class="mb-6">
                        <label class="text-white">Email</label>
                        <input class="js-email-login w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type='email' placeholder="Email của bạn"/>
                    </div>
                    <div class="mb-6">
                        <label class="text-white">Mật khẩu</label>
                        <input class="js-password-login w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type='password' placeholder="Mật khẩu"/>
                    </div>
                    <button type="submit" class="block w-full mt-8 px-4 py-2 mb-6 bg-black/80 text-white rounded-xl hover:bg-red-400 transition cursor-pointer">
                        Đăng nhập
                    </button>
                   <div class="mt-10 flex items-center justify-center gap-1">
                        <span class="text-gray-500 text-sm">Bạn chưa có tài khoản?</span>
                        <button id="go-register" type="button" class="text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div class="js-register-wrap flex justify-center items-center hidden">
            <form class="js-register-form bg-purple-500 max-w-[400px] bg-white/10 rounded-xl shadow-xl border border-white/20">
                <div class="p-10">
                    <h1 class="font-semibold text-white text-center text-xl mb-6">ĐĂNG NHẬP</h1>
                    <div class="mb-6">
                        <label class="text-white">Email</label>
                        <input class="js-email-register w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type='email' placeholder="Email của bạn"/>
                    </div>
                    <div class="mb-6">
                        <label class="text-white">Tên hiển thị</label>
                        <input class="js-name-register w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type='text' placeholder="Tên hiển thị của bạn"/>
                    </div>
                    <div class="mb-6">
                        <label class="text-white">Mật khẩu</label>
                        <input class="js-name-register w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type='password' placeholder="Mật khẩu"/>
                    </div>
                    <div class="mb-6">
                        <label class="text-white">Nhập lại mật khẩu</label>
                        <input class="js-name-register w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type='password' placeholder="Nhập lại mật khẩu"/>
                    </div>
                    <button type="submit" class="block w-full mt-8 px-4 py-2 mb-6 bg-black/80 text-white rounded-xl hover:bg-red-400 transition cursor-pointer">
                        Đăng ký
                    </button>
                   <div class="mt-10 flex items-center justify-center gap-1">
                        <span class="text-gray-500 text-sm">Bạn đã có tài khoản?</span>
                        <button id="go-login" type="button" class="text-sm text-white hover:text-red-400 underline font-semibold cursor-pointer">
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div class="js-update-wrap flex justify-center items-center hidden">
            <form class="js-update-form bg-purple-500 max-w-[400px] bg-white/10 rounded-xl shadow-xl border border-white/20">
                <div class="p-10">
                    <h1 class="font-semibold text-white text-center text-xl mb-6">CẬP NHẬT THÔNG TIN</h1>
                     <div class="mb-6">
                        <label class="text-white">Tên hiển thị</label>
                        <input class="js-name-update w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type='text' placeholder="Tên hiển thị của bạn"/>
                    </div>
                    <div class="mb-6">
                        <label class="text-white">Email</label>
                        <input class="js-email-update w-full px-4 py-2 rounded bg-white/70 focus:bg-white text-gray-800" type='email' placeholder="Email của bạn"/>
                    </div>
                    <button type="submit" class="block w-full mt-8 px-4 py-2 mb-6 bg-black/80 text-white rounded-xl hover:bg-red-400 transition cursor-pointer">
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    `;
}

export function loginScript() {
  const BASE_URL = "https://youtube-music.f8team.dev/api";
  const loginFormEl = document.querySelector(".js-login-form");
  const UpdateFormEl = document.querySelector(".js-update-form");

  //   login form
  loginFormEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector(".js-email-login").value;
    const password = document.querySelector(".js-password-login").value;
    const token = await handleLogin(email, password);
    if (token) {
      localStorage.setItem("access_token", token.access_token);
      localStorage.setItem("refresh_token", token.refresh_token);
      localStorage.setItem("user", JSON.stringify(token.user));
      alert("Đăng nhập thành công!");
      router.navigate("/");
    }
  });

  //   login form
  UpdateFormEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector(".js-name-update").value;
    const email = document.querySelector(".js-email-update").value;
    const data = await handleUpdate(name, email);
    console.log(data);
    // if (token) {
    //   localStorage.setItem("access_token", token.access_token);
    //   localStorage.setItem("refresh_token", token.refresh_token);
    //   localStorage.setItem("user", JSON.stringify(token.user));
    //   alert("Đăng nhập thành công!");
    //   router.navigate("/");
    // }
  });

  async function handleLogin(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  }

  async function handleUpdate(name, password) {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${BASE_URL}/auth/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, password }),
    });
    return res.json();
  }

  //   xử lý khi click update
  const updateBtnEl = document.querySelector(".js-update-btn");
  const loginWrapEl = document.querySelector(".js-login-wrap");
  const registerWrapEl = document.querySelector(".js-register-wrap");
  const updateWrapEl = document.querySelector(".js-update-wrap");
  updateBtnEl.addEventListener("click", () => {
    loginWrapEl.classList.add("hidden");
    registerWrapEl.classList.add("hidden");
    updateWrapEl.classList.remove("hidden");
  });
}
