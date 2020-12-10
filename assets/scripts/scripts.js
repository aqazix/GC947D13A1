let animationMenu;
let directionMenu;

// Opening animation
window.onload = () => {
  let statusBar = document.getElementById("op-status");
  let statusWidth = 0;

  let id = setInterval(() => {
    if (statusWidth >= 100) {
      clearInterval(id);
      setTimeout(() => {
        document.querySelector(".opening-animation").classList.remove("is-active");
      }, 25);
    } else {
      statusWidth++;
      statusBar.style.width = statusWidth + "%";
    }
  }, 15);
};

// DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Scrollspy
  // Get the sections (targets) and menu links (triggers)
  const sections = document.querySelectorAll("[class*='anchor-']");
  const menuLinks = document.querySelectorAll("[data-target]");

  // Add the "is-active" class to the element present in the [link] index of the menuLinks array.
  // It does so throguh a ternary operator: is the target element a parent element? If so, apply the class to its parent.
  // Else, apply it to itself
  const makeActive = (link) => {
    menuLinks[link].classList.contains("navbar-link")
      ? menuLinks[link].parentElement.classList.add("is-active")
      : menuLinks[link].classList.add("is-active");
  }
  const remove = (elem) =>
    elem.classList.contains("navbar-link")
      ? elem.parentElement.classList.remove("is-active")
      : elem.classList.remove("is-active");

  // Remove the "is-active" from all menuLinks elements or from a specific one through a ternary operator: Is the element null?
  // If so, remove "is-active" from all menu items. Else, remove the class from just the specified element
  const removeActive = (link) =>
    link == null
      ? [...menuLinks].forEach((elem) => remove(elem))
      : [...Array(section.length).keys()].forEach((link) =>
        remove(menuLinks[link])
      );

  let currentActive =
    sections.length -
    [...sections]
      .reverse()
      .findIndex((section) => window.scrollY >= (section.getBoundingClientRect().top + window.scrollY - 60)) -
    1;

  makeActive(currentActive);

  window.addEventListener("scroll", () => {
    // Determines which, from the elements who have an anchor identifier, is the current one to be active.
    // This code does that by subtracting the index of the first of the elements that has already passed
    // From the length of the array of possible elements
    const current =
      sections.length -
      [...sections]
        .reverse()
        .findIndex((section) => window.scrollY >= (section.getBoundingClientRect().top + window.scrollY - 60)) -
      1;

    if (current !== currentActive) {
      // When the current element is different from the current element active,
      // it removes all active menu items, set the current active element to the current being displayed and makes it
      // Active in the menu
      removeActive();
      currentActive = current;
      makeActive(current);
    }
  });

  // Lottie / Bodymovin
  // Load icons and animations json
  let iconArrow = document.querySelector(".icon-arrow");
  let directionArrow = 1;
  let animationArrow = bodymovin.loadAnimation({
    container: iconArrow,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "assets/media/icons/arrow-up-circle.json",
  });

  let iconMenu = document.querySelector(".icon-menu");
  directionMenu = 1;
  animationMenu = bodymovin.loadAnimation({
    container: iconMenu,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "assets/media/icons/menu.json",
  });

  let iconSettings = document.querySelector(".icon-settings");
  let directionSettings = 1;
  let animationSettings = bodymovin.loadAnimation({
    container: iconSettings,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "assets/media/icons/settings.json",
  });

  let iconVisibility = document.querySelector(".icon-visibility");
  let directionVisibility = 1;
  let animationVisibility = bodymovin.loadAnimation({
    container: iconVisibility,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "assets/media/icons/visibility.json",
  });

  // Clicks events
  // Menu items animation
  menuLinks.forEach((item) => {
    item.addEventListener("click", () => {
      let target = document.querySelector(
        "[class*='" + item.dataset.target + "']"
      );
      scrollIt(target);
    });
  });

  // Go to top btn's
  document.querySelector(".btn-top").addEventListener("click", () => {
    if (document.documentElement.clientWidth <= 900) {
      if (document.querySelector(".btn-menu").classList.contains("is-active")) {
        animationMenu.setDirection(directionMenu);
        animationMenu.play();
        directionMenu = -directionMenu;
        document.querySelectorAll("body,.btn-menu,.navbar-content").forEach((elem) => {
          elem.classList.remove("is-active");
        });
      }

      if (document.querySelector(".btn-accessibility").classList.contains("is-active")) {
        animationSettings.setDirection(directionSettings);
        animationSettings.play();
        directionSettings = -directionSettings;
        document.querySelectorAll("body,.btn-accessibility,.navbar-accessibility").forEach((elem) => {
          elem.classList.remove("is-active");
        });
      }
    }

    animationArrow.setDirection(directionArrow);
    animationArrow.play();
    directionArrow = -directionArrow;

    let docTop = document.querySelector(".sec-01");
    scrollIt(docTop);
  });

  // Toggle HandTalk
  document.querySelector("#handtalk-btn").addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("is-active");
    unoesteHandTalk.toggleHandTalk();
  });

  // Toggle menu
  document.querySelector(".btn-menu").addEventListener("click", () => {
    if (document.querySelector(".btn-accessibility").classList.contains("is-active")) {
      animationSettings.setDirection(directionSettings);
      animationSettings.play();
      directionSettings = -directionSettings;
      document.querySelectorAll(".btn-accessibility,.navbar-accessibility").forEach((elem) => {
        elem.classList.remove("is-active");
      });
    }

    if (document.querySelector(".btn-problem").classList.contains("is-active")) {
      document.querySelectorAll(".btn-problem,.navbar-problem").forEach((elem) => {
        elem.classList.remove("is-active");
      });
    }

    if (document.querySelector("body").classList.contains("is-active") && document.querySelector(".btn-menu").classList.contains("is-active")) {
      document.querySelector("body").classList.remove("is-active");
    } else {
      document.querySelector("body").classList.add("is-active");
    }

    document.querySelectorAll(".btn-menu,.navbar-content").forEach((elem) => {
      elem.classList.toggle("is-active");
    });

    animationMenu.setDirection(directionMenu);
    animationMenu.setSpeed(1.5);
    animationMenu.play();
    directionMenu = -directionMenu;
  });

  // Toggle accessibility menu
  document.querySelector(".btn-accessibility").addEventListener("click", () => {
    if (document.querySelector(".btn-menu").classList.contains("is-active")) {
      animationMenu.setDirection(directionMenu);
      animationMenu.play();
      directionMenu = -directionMenu;
      document.querySelectorAll(".btn-menu,.navbar-content").forEach((elem) => {
        elem.classList.remove("is-active");
      });
    }

    if (document.querySelector(".btn-problem").classList.contains("is-active")) {
      document.querySelectorAll(".btn-problem,.navbar-problem").forEach((elem) => {
        elem.classList.remove("is-active");
      });
    }

    if (screen.width <= 900) {
      if (document.querySelector("body").classList.contains("is-active") && document.querySelector(".btn-accessibility").classList.contains("is-active")) {
        document.querySelector("body").classList.remove("is-active");
      } else {
        document.querySelector("body").classList.add("is-active");
      }
    }

    document.querySelectorAll(".btn-accessibility,.navbar-accessibility").forEach((elem) => {
      elem.classList.toggle("is-active");
    });

    animationSettings.setDirection(directionSettings);
    animationSettings.play();
    directionSettings = -directionSettings;
  });

  // Toggle problems menu
  document.querySelector('#btn-problem').addEventListener("click", () => {
    if (window.innerWidth > 900) {
      let elem = document.getElementById('btn-problem');
      let option = elem.getAttribute("data-option");
      document.querySelector("body").classList.add("is-active");
      document.querySelector(".navbar-problem").classList.remove("out");
      document.querySelector(".navbar-problem").classList.add("open");
      document.querySelector(".modal-problem [data-content='" + option + "']").classList.add("show");
      setTimeout(() => {
        document.querySelector(".modal-svg-problem").style.zIndex = "-1";
      }, 1000);
    } else {
      if (document.querySelector(".btn-menu").classList.contains("is-active")) {
        animationMenu.setDirection(directionMenu);
        animationMenu.play();
        directionMenu = -directionMenu;
        document.querySelectorAll(".btn-menu,.navbar-content").forEach((e) => {
          e.classList.remove("is-active");
        });
        console.log(directionMenu);
      }

      if (document.querySelector(".btn-accessibility").classList.contains("is-active")) {
        animationSettings.setDirection(directionSettings);
        animationSettings.play();
        directionSettings = -directionSettings;
        document.querySelectorAll(".btn-accessibility,.navbar-accessibility").forEach((e) => {
          e.classList.remove("is-active");
        });
      }

      if (document.querySelector("body").classList.contains("is-active") || document.querySelector(".btn-problem").classList.contains("is-active")) {
        document.querySelector("body").classList.remove("is-active");
        document.querySelectorAll("#layoutProblem,#contentProblem").forEach((elem) => {
          elem.style.display = "none";
        });
        document.querySelector("[data-content='content-problem'] .choose").style.display = "block";
        document.querySelectorAll(".navbar-problem form").forEach((elem) => {
          elem.reset();
        });
      } else {
        document.querySelector("body").classList.add("is-active");
      }

      document.querySelectorAll(".btn-problem,.navbar-problem").forEach((elem) => {
        elem.classList.toggle("is-active");
      });
    }
  });

  // Close modal problems
  document.querySelector('.btn-close').addEventListener("click", () => {
    document.querySelector(".navbar-problem").classList.remove("open");
    document.querySelector(".navbar-problem").classList.add("out");
    if (!document.querySelector(".navbar-content").classList.contains("is-active")) {
      document.querySelector("body").classList.remove("is-active");
    }
    document.querySelectorAll("#layoutProblem,#contentProblem").forEach((elem) => {
      elem.style.display = "none";
    });
    document.querySelector("[data-content='content-problem'] .choose").style.display = "block";
    document.querySelectorAll(".modal-container form").forEach((elem) => {
      elem.reset();
    });
    setTimeout(() => {
      document.querySelector(".modal-svg-problem").style.zIndex = "1";
    }, 1000);
  });

  // Print
  document.querySelector("#download-btn").addEventListener("click", (e) => {
    printElements({
      "targets": [
        "index.html"
      ],
      "tags": [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "ul",
        "small",
        "img.print",
        "svg.print",
        "figcaption"
      ],
      "willNotPrint": ".not-print"
    });
  });

  // Accordion
  document.querySelectorAll(".accordion").forEach((acc) => {
    acc.addEventListener("click", () => {
      acc.classList.toggle("is-active");
      let panel = acc.nextElementSibling;
      panel.style.maxHeight
        ? (panel.style.maxHeight = null)
        : (panel.style.maxHeight = panel.scrollHeight + "px");
    });
  });

  // Modal
  document.querySelectorAll(".btn-open-modal").forEach((elem) => {
    elem.addEventListener("click", () => {
      let option = elem.dataset.contentOption;
      document.querySelector("body").classList.add("is-active");
      document.querySelector(".modal-container").classList.remove("out");
      document.querySelector(".modal-container").classList.add("open");
      document.querySelector(".modal-content [data-content='" + option + "']").classList.add("show");
      setTimeout(() => {
        document.querySelector(".modal-svg").style.zIndex = "-1";
      }, 1000);
    });
  });

  document.querySelector(".btn-close-modal").addEventListener("click", () => {
    document.querySelector(".modal-container").classList.remove("open");
    document.querySelector(".modal-container").classList.add("out");
    if (!document.querySelector(".navbar-content").classList.contains("is-active")) {
      document.querySelector("body").classList.remove("is-active");
    }
    document.querySelectorAll(".content").forEach(elem => elem.classList.remove("show"));
    document.querySelectorAll(".modal-container iframe").forEach((elem) => {
      elem.setAttribute("src", elem.getAttribute("src"));
    });
    setTimeout(() => {
      document.querySelector(".modal-svg").style.zIndex = "1";
    }, 1000);
  });

  document.querySelectorAll("[data-content='content-problem'] .choose button").forEach((elem) => {
    elem.addEventListener("click", () => {
      const form = elem.classList[0];
      document.querySelector("[data-content='content-problem'] .choose").style.display = "none";
      document.querySelector("[data-content='content-problem'] #" + form).style.display = "block";
    });
  });

  document.querySelector("#contentProblem .btnSubmit").addEventListener("click", (event) => {
    event.preventDefault();

    let app = "";
    if (navigator.userAgent.match("Firefox") !== null)
      app = "Firefox";
    else if (navigator.userAgent.match("Seamonkey") !== null)
      app = "Seamonkey";
    else if (navigator.userAgent.match("Chrome") !== null)
      app = "Chrome";
    else if (navigator.userAgent.match("Chromium") !== null)
      app = "Chromium";
    else if (navigator.userAgent.match("OPR") !== null)
      app = "Opera";
    else if (navigator.userAgent.match("Trident") !== null)
      app = "IE";
    else if (navigator.userAgent.match("Edge") !== null)
      app = "Edge";
    else
      app = "Safari";

    const data = {
      accessKey: "496e6030-ff9b-4013-8f3d-7fd7e5041d6f",
      honeypot: document.querySelector("#contentProblem .honeypot").value,
      name: document.querySelector("#contentProblem .name").value,
      email: document.querySelector("#contentProblem .email").value,
      message: document.querySelector("#contentProblem .message").value + " || " + screen.width + "x" + screen.height + " || " + app,
      subject: document.querySelector("#contentProblem .subject").value,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const handle = async (e) => {
      e.preventDefault();
      document.getElementById("layoutProblem").style.display = "none";

      try {
        fetch("https://api.staticforms.xyz/submit", config);
        document.getElementById("successMessage").style.display = "block";
      } catch (e) {
        console.log("An error occurred", e);
        document.getElementById("errorMessage").style.display = "block";
      }
    };

    handle(event);
  });

  document.querySelector("#layoutProblem .btnSubmit").addEventListener("click", (event) => {
    event.preventDefault();

    let app = "";
    if (navigator.userAgent.match("Firefox") !== null)
      app = "Firefox";
    else if (navigator.userAgent.match("Seamonkey") !== null)
      app = "Seamonkey";
    else if (navigator.userAgent.match("Chrome") !== null)
      app = "Chrome";
    else if (navigator.userAgent.match("Chromium") !== null)
      app = "Chromium";
    else if (navigator.userAgent.match("OPR") !== null)
      app = "Opera";
    else if (navigator.userAgent.match("Trident") !== null)
      app = "IE";
    else if (navigator.userAgent.match("Edge") !== null)
      app = "Edge";
    else
      app = "Safari";

    const data = {
      accessKey: "61e93ba2-cf2a-4547-9282-6371ab9337de",
      honeypot: document.querySelector("#layoutProblem .honeypot").value,
      name: document.querySelector("#layoutProblem .name").value,
      email: document.querySelector("#layoutProblem .email").value,
      message: document.querySelector("#layoutProblem .message").value + " || " + screen.width + "x" + screen.height + " || " + app,
      subject: document.querySelector("#layoutProblem .subject").value,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const handle = async (e) => {
      e.preventDefault();
      document.getElementById("layoutProblem").style.display = "none";

      try {
        fetch("https://api.staticforms.xyz/submit", config);
        document.getElementById("successMessage").style.display = "block";
      } catch (e) {
        console.log("An error occurred", e);
        document.getElementById("errorMessage").style.display = "block";
      }
    };

    handle(event);
  });

  // Contraste
  document.querySelector("#contrast-btn").addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("is-active");
    document.querySelector("body").classList.toggle("contr");
    let origin, result;
    if (document.querySelector("body").classList.contains("contr")) {
      document.querySelectorAll(".brand").forEach((elem) => {
        origin = elem.querySelector("img").getAttribute("src");
        result = origin.replace("green", "white");
        elem.querySelector("img").setAttribute("src", result);
      });
    } else {
      document.querySelectorAll(".brand").forEach((elem) => {
        origin = elem.querySelector("img").getAttribute("src");
        result = origin.replace("white", "green");
        elem.querySelector("img").setAttribute("src", result);
      });
    }
  });

  // Font Up - Down
  let letter = 0;

  document.querySelector("#increase-btn").addEventListener("click", (e) => {
    if (letter < 3) {
      let font;
      let classes =
        "main p, main h1, main h2, main h3, main h4, main h5," +
        "main a, header .navbar-content a, footer h1, footer h2, footer h3, footer a";

      e.currentTarget.classList.remove("is-invalid");

      document.querySelectorAll(classes).forEach((elem) => {
        font = getComputedStyle(elem);
        elem.style.fontSize = parseInt(font.fontSize) + 2 + "px";
      });

      letter++;
    } else {
      document.querySelector("#decrease-btn").classList.remove("is-invalid");
      e.currentTarget.classList.add("is-invalid");
    }
  });

  document.querySelector("#decrease-btn").addEventListener("click", (e) => {
    if (letter >= 1) {
      let font;
      let classes = "main p, main h1, main h2, main h3, main h4, main h5, main a, header .navbar-content a, footer h1, footer h2, footer h3, footer a";

      e.currentTarget.classList.remove("is-invalid");

      document.querySelectorAll(classes).forEach((elem) => {
        font = getComputedStyle(elem);
        elem.style.fontSize = parseInt(font.fontSize) - 2 + "px";
      });

      letter--;
    } else {
      document.querySelector("#increase-btn").classList.remove("is-invalid");
      e.currentTarget.classList.add("is-invalid");
    }
  });

  // Problems buttom
  problemTypeModal();

  // Resize
  document.getElementsByTagName("BODY")[0].onresize = function () { problemTypeModal(); };
});

// Functions
function scrollIt(element) {
  document.querySelectorAll("body,.btn-menu,.navbar-content").forEach((elem) => {
    if (elem.classList.contains("is-active")) {
      elem.classList.remove("is-active");
      animationMenu.setDirection(directionMenu);
      animationMenu.play();
      directionMenu = -directionMenu;
    }
  });

  let offset = -60;
  if (window.innerWidth < 1024)
    offset = 0;

  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: element.getBoundingClientRect().top + window.scrollY + offset
  });
}

function problemTypeModal() {
  let elem = document.getElementById('btn-problem');
  let box = document.getElementById('problem');

  // Class
  if (window.innerWidth > 900) {
    elem.classList.add("btn-open");
    box.classList.add("desk");
    box.classList.remove("mob");

  } else {
    elem.classList.remove("btn-open");
    box.classList.add("mob");
    box.classList.remove("desk");
  }
}