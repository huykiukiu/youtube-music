export default function Loading() {
  return `
    <div id="loading-overlay" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center hidden">
      <div class="flex flex-col items-center gap-4">
        <div class="loading-spinner"></div>
        <p class="text-white text-lg">Đang tải...</p>
      </div>
    </div>
  `;
}
