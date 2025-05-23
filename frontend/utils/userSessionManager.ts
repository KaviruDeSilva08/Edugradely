// utils/userSessionManager.ts

export function checkAndRemoveExpiredUser() {
    const stored = localStorage.getItem("user");
  
    if (!stored) return;
  
    const user = JSON.parse(stored);
    const now = new Date().getTime();
  
    // Grace period: expiry + 30 mins
    const removalTime = user.expiryTime + 30 * 60 * 1000;
  
    if (now >= removalTime) {
      localStorage.removeItem("user");
      console.log("User session expired and removed.");
    }
  }
  