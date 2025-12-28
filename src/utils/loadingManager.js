// Loading Manager để theo dõi các API requests
class LoadingManager {
  constructor() {
    this.activeRequests = new Set();
    this.loadingElement = null;
  }

  init() {
    this.loadingElement = document.querySelector("#loading-overlay");
  }

  show() {
    if (this.loadingElement) {
      this.loadingElement.classList.remove("hidden");
    }
  }

  hide() {
    if (this.loadingElement && this.activeRequests.size === 0) {
      this.loadingElement.classList.add("hidden");
    }
  }

  addRequest(requestId) {
    this.activeRequests.add(requestId);
    if (this.activeRequests.size > 0) {
      this.show();
    }
  }

  removeRequest(requestId) {
    this.activeRequests.delete(requestId);
    if (this.activeRequests.size === 0) {
      this.hide();
    }
  }
}

// Tạo instance singleton
const loadingManager = new LoadingManager();

export default loadingManager;

