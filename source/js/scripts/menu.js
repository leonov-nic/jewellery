"use strict";

(function () {
  var pageHeader = document.querySelector(".page-header");
  var headerForm = pageHeader.querySelector("form");
  var navigation = document.querySelector(".page-header__nav");
  var headerToggle = document.querySelector(".page-header__toggle");
  var body = document.querySelector("body");

  pageHeader.classList.remove("page-header--nojs");

  function openCloseMenu(header, nav) {
    if (header.classList.contains("page-header--closed")) {
      header.classList.remove("page-header--closed");
      header.classList.add("page-header--opened");
      nav.classList.add("page-header__menu-show");
      headerForm.classList.add("page-header__menu-search");
      body.style.overflow = "hidden";
      body.style.position = "fixed";
    } else {
      header.classList.add("page-header--closed");
      header.classList.remove("page-header--opened");
      nav.classList.remove("page-header__menu-show");
      headerForm.classList.remove("page-header__menu-search");
      body.style.overflow = "auto";
      body.style.position = "";
    }
  }

  function onOpenMenu() {
    openCloseMenu(pageHeader, navigation);
  }

  headerToggle.addEventListener("click", onOpenMenu);

})();
