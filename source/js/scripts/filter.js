"use strict";

(function () {

  var catalog = document.querySelector(".catalog");
  var filterClose = document.querySelector(".catalog__close-filter");
  var filterOpen = document.querySelector("#filter-open");

  function closeFilter() {
    catalog.classList.remove("catalog--active-filter");
    filterClose.removeEventListener("click", closeFilter);
  }

  function openFilter() {
    catalog.classList.add("catalog--active-filter");
    filterClose.addEventListener("click", closeFilter);
  }

  if (catalog && filterOpen && filterClose) {
    filterOpen.addEventListener("click", openFilter);
  }

})();
