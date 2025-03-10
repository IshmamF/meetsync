export function getApiBase() {
  return process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api.meet-sync.us";
}
