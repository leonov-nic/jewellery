"use strict";

(function () {

  var catalog = document.querySelector(".catalog");
  var filterClose = document.querySelector(".catalog__close-filter");
  var filterOpen = document.querySelector("#filter-open");
  var body = document.querySelector("body");

  function closeFilter() {
    catalog.classList.remove("catalog--active-filter");
    filterClose.removeEventListener("click", closeFilter);
    body.style.overflow = "auto";
    body.style.position = "";
  }

  function openFilter() {
    catalog.classList.add("catalog--active-filter");
    filterClose.addEventListener("click", closeFilter);
    body.style.overflow = "hidden";
    body.style.position = "fixed";
  }

  if (catalog && filterOpen && filterClose) {
    filterOpen.addEventListener("click", openFilter);
  }

})();
