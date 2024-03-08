
// theme color switch
function setTheme(theme) {
    let body = document.body;
    let themeIcon = document.querySelector(".theme-icon");
    if (theme === "dark") {
        console.log("Going dark")
        body.classList.add("dark-mode");
        themeIcon.src = "{{ .Site.BaseURL }}images/svg/moon.svg";
        themeIcon.alt = "moon icon";
    } else {
        console.log("Lightening")
        body.classList.remove("dark-mode");
        themeIcon.src = "{{ .Site.BaseURL }}images/svg/sun.svg";
        themeIcon.alt = "sun icon";
    }
    // Save the user-selected theme mode to local storage.
    localStorage.setItem("theme", theme);
}

// Retrieve the user-selected theme mode from local storage
window.onload = (e) => {
    let theme = localStorage.getItem("theme") || "light";
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
        // Site is in dark mode
        setTheme('dark');

    } else {
        // Site is in light mode
        setTheme('light');
    }
    setTheme(theme);

    // Toggle theme when sun icon is clicked
    document.getElementById("theme-toggle").addEventListener("click", function() {
        if (theme === "light") {
            theme = "dark";
        } else {
            theme = "light";
        }
        setTheme(theme);
    });
}

console.log("More text; static/js/theme-toggle.js")

