
function makeToggle() {
    // make link
    let new_node = document.createElement("a")
    new_node.setAttribute("id", "theme-toggle")
    new_node.setAttribute("class", "theme-toggle pt3 pt0-l")

    // add icon
    let thIcon = document.createElement("img")
    thIcon.setAttribute("src", "/images/svg/sun.svg")
    thIcon.setAttribute("alt", "sun icon")
    thIcon.setAttribute("class", "theme-icon")
    thIcon.setAttribute("style", "stroke:#babab; opacity:0.73; width: 26px; height: 26px;")
    new_node.appendChild(thIcon);

    // log
    console.log("making new node: ")
    console.log(new_node)

    // add to page
    let socials = document.querySelector(".ananke-socials");
    socials.appendChild(new_node);
}

// theme color switch
function setTheme(theme) {
    let body = document.body;
    let themeIcon = document.querySelector(".theme-icon");
    if (theme === "dark") {
        console.log("Going dark")
        body.classList.add("dark-mode");
        themeIcon.src = "/images/svg/moon.svg";
        themeIcon.alt = "moon icon";
    } else {
        console.log("Lightening")
        body.classList.remove("dark-mode");
        themeIcon.src = "/images/svg/sun.svg";
        themeIcon.alt = "sun icon";
    }
    // Save the user-selected theme mode to local storage.
    localStorage.setItem("theme", theme);
}

// Retrieve the user-selected theme mode from local storage
window.onload = (e) => {
    // console.log("window loaded")
    makeToggle();
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

