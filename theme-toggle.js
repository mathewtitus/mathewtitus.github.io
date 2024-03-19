(() => {
  // ns-params:@params
  var params_default = { pageName: "About", theme: "dark" };

  // <stdin>
  console.log("Page: " + params_default.pageName);
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
  }
  function setTheme(theme) {
    let body = document.body;
    let themeIcon = document.querySelector(".theme-icon");
    if (theme === "dark") {
      body.classList.add("dark-mode");
      themeIcon.src = "/images/svg/moon.svg";
      themeIcon.alt = "moon icon";
    } else {
      body.classList.remove("dark-mode");
      themeIcon.src = "/images/svg/sun.svg";
      themeIcon.alt = "sun icon";
    }
    localStorage.setItem("theme", theme);
  }
  window.onload = (e) => {
    makeToggle();
    let theme = localStorage.getItem("theme") || "light";
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setTheme(theme);
    document.getElementById("theme-toggle").addEventListener("click", function() {
      if (theme === "light") {
        theme = "dark";
      } else {
        theme = "light";
      }
      setTheme(theme);
    });
  };
})();
