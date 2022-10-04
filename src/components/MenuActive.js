import { useEffect } from "react";

function MenuActive(page) {
  useEffect(() => {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((box) => {
      box.classList.remove("active-item");
    });

    if (page.page === undefined) {
      if (window.location.href.includes("restricted")) {
        document.getElementById("menu-restricted").classList.add("active-item");
      }
    } else {
      document.getElementById(`${page.page}`).classList.add("active-item");
    }
  }, []);
}

export { MenuActive };
