export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://donjay-server-mw7v-4klcotyzr-jaytechs-projects-e325c32a.vercel.app";

/**
 * Helper to build API URLs safely
 */
export const apiUrl = (path) => {
  if (!path.startsWith("/")) {
    throw new Error("API path must start with '/'");
  }
  return `${API_BASE_URL}${path}`;
};
