"use strict";

(function () {

  var catalog = document.querySelector(".catalog");
  var filterClose = document.querySelector(".catalog__close-filter");
  var filterOpen = document.querySelector("#filter-open");
  var body = document.querySelector("body");
  var form = document.querySelector(".catalog form");

  function closeFilter() {
    catalog.classList.remove("catalog--active-filter");
    filterClose.removeEventListener("click", closeFilter);
    body.style.overflow = "auto";
    body.style.position = "";
    form.style.overflowY = "auto";
    form.style.height = "auto";
  }

  function openFilter() {
    catalog.classList.add("catalog--active-filter");
    filterClose.addEventListener("click", closeFilter);

    if (window.screen.width <= 1023) {
      form.style.overflowY = "scroll";
      form.style.height = "100vh";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
    }
  }

  if (catalog && filterOpen && filterClose && form) {
    filterOpen.addEventListener("click", openFilter);
  }

})();
