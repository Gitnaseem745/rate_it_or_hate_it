/**
 * Generate a unique user ID for localStorage
 */
/**
 * Utility function to generate a unique userId for anonymous voting
 * Uses browser fingerprinting + timestamp for uniqueness
 * Stored in localStorage for persistence across sessions
 */
export function generateUserId(): string {
  // Check if userId already exists in localStorage
  if (typeof window !== "undefined") {
    const existingUserId = localStorage.getItem("userId");
    if (existingUserId) {
      return existingUserId;
    }

    // Generate new userId: prefix + random string + timestamp
    const randomStr = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now().toString(36);
    const userId = `user_${randomStr}_${timestamp}`;

    // Store for future sessions
    localStorage.setItem("userId", userId);
    return userId;
  }

  // Fallback for server-side rendering (not persisted)
  return `user_${Math.random().toString(36).substring(2, 15)}`;
}
