(() => {
  // <stdin>
  function makeToggle() {
    let new_node = document.createElement("a");
    new_node.setAttribute("id", "theme-toggle");
    new_node.setAttribute("class", "theme-toggle pt3 pt0-l");
    let thIcon = document.createElement("img");
    thIcon.setAttribute("src", "/images/svg/sun.svg");
    thIcon.setAttribute("alt", "sun icon");
    thIcon.setAttribute("class", "theme-icon");
    new_node.appendChild(thIcon);
    let socials = document.querySelector(".ananke-socials");
    socials.appendChild(new_node);
    return document.getElementById("theme-toggle");
  }
  function setTheme(theme) {
    let body = document.body;
    var ico = document.querySelector(".dib img");
    let img_path = ico.src;
    let themeIcon = document.querySelector(".theme-icon");
    if (theme === "dark") {
      body.classList.add("dark-mode");
      themeIcon.src = "/images/svg/moon.svg";
      themeIcon.alt = "moon icon";
      ico.src = img_path.replace("icon.svg", "icon_dark.svg");
    } else {
      body.classList.remove("dark-mode");
      themeIcon.src = "/images/svg/sun.svg";
      themeIcon.alt = "sun icon";
      ico.src = img_path.replace("icon_dark.svg", "icon.svg");
    }
    localStorage.setItem("theme", theme);
  }
  function startTransition() {
    localStorage.setItem("transition", 0);
  }
  window.onload = (e) => {
    let toggle = makeToggle();
    let theme = localStorage.getItem("theme") || "light";
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setTheme(theme);
    localStorage.setItem("transition", 1);
    document.getElementById("theme-toggle").addEventListener("click", function() {
      theme = theme === "light" ? "dark" : "light";
      setTheme(theme);
      startTransition();
    });
  };
})();
