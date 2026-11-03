// Keep the original dark appearance unless the visitor chooses light mode.
try {
  const theme = localStorage.getItem("portfolio-theme");
  document.documentElement.dataset.theme = theme === "light" ? "light" : "dark";
} catch {
  document.documentElement.dataset.theme = "dark";
}
