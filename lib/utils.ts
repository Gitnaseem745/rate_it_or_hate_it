/**
 * Generate a unique user ID for localStorage
 */
export function generateUserId(): string {
  if (typeof window !== "undefined") {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("userId", userId);
    }
    return userId;
  }
  return "";
}
