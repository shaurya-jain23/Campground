document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const icon = themeToggle.querySelector("i");
  const html = document.documentElement;

  // Check stored preference or system preference (optional enhancement)
  const currentTheme = localStorage.getItem("theme") || "light";

  // Set initial icon
  updateIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const existingTheme = html.getAttribute("data-bs-theme");
    const newTheme = existingTheme === "light" ? "dark" : "light";

    html.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    if (theme === "dark") {
      icon.classList.remove("bi-moon-stars-fill");
      icon.classList.add("bi-sun-fill");
    } else {
      icon.classList.remove("bi-sun-fill");
      icon.classList.add("bi-moon-stars-fill");
    }
  }
});
