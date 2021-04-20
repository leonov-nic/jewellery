"use strict";

(function () {
  var KEY_ESCAPE = "Escape";
  var html = document.querySelector("html");
  var pageHeader = document.querySelector(".page-header");
  var headerToggle = document.querySelector(".page-header__toggle");
  var navigation = document.querySelector(".page-header__nav");
  var headerForm = pageHeader.querySelector("form");
  var popupLog = document.querySelector(".popup-log");
  var popupClose = popupLog.querySelector(".popup-log__close");
  var popupMail = popupLog.querySelector("[name=mail]");
  var popupOpen = document.querySelectorAll(".page-header__log");
  var form = popupLog.querySelector("form");
  var catalog = document.querySelector(".catalog");
  var filterOpen = document.querySelector("#filter-open");
  var filterClose = document.querySelector(".catalog__close-filter");
  var popupCard = document.querySelector(".popup-addtocart");
  var popupCloseCard = document.querySelector(".popup-addtocart__close");
  var popupOpenCard = document.querySelector(".button--js-card");

  var bgWhite = "body-white";
  var bgBlack = "body-black";
  var activeLog = "popup-show";
  var activeCard = "activecard";

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

  var storageMail = "";
  var isStorageSupport = "true";

  pageHeader.classList.remove("page-header--nojs");

  function openCloseMenu(header, nav) {
    if (header.classList.contains("page-header--closed")) {
      header.classList.remove("page-header--closed");
      header.classList.add("page-header--opened");
      nav.classList.add("page-header__menu-show");
      headerForm.classList.add("page-header__menu-search");

    } else {
      header.classList.add("page-header--closed");
      header.classList.remove("page-header--opened");
      nav.classList.remove("page-header__menu-show");
      headerForm.classList.remove("page-header__menu-search");
    }
  }

  function onOpenMenu() {
    openCloseMenu(pageHeader, navigation);
  }

  headerToggle.addEventListener("click", onOpenMenu);

  var setStorage = function () {
    try {
      storageMail = localStorage.getItem("storageMail");
    }
    catch (err) {
      isStorageSupport = "false";
    }

    if (storageMail) {
      popupMail.value = storageMail;

      setTimeout(function() {
        popupLog.querySelector("[name=mail]").focus();
      }, 0);

    } else {
      setTimeout(function() {
        popupLog.querySelector("[name=mail]").focus();
      }, 0);
    }
  };

  if (form) {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      if (popupMail.value) {
        if (isStorageSupport) {
          localStorage.setItem("storageMail", popupMail.value);
        }
      }
    });
  }

  var openPopup = function (popup, bgcolor, active, closepopup) {
    var element = document.createElement("div");
    element.className = bgcolor;
    document.body.appendChild(element);

    popup.classList.add(active);
    html.style.overflow = "hidden";

    element.addEventListener("click", closepopup);
  };

if (popupLog && popupClose) {

  var isEscPressLog = function (evt) {
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      closePopupLog();
    }
  };

  var closePopupLog = function () {
    var element = document.querySelector(".body-white");
    element.remove();
    if (popupLog) {
      popupLog.classList.remove(activeLog);
    }
    html.style.overflow = "auto";

    element.removeEventListener("click", closePopupLog);
    popupClose.removeEventListener("click", closePopupLog);
    document.removeEventListener("keydown", isEscPressLog);
  };

  var openPopupLog = function (evt) {
    evt.preventDefault();
    setStorage();
    openPopup(popupLog, bgWhite, activeLog, closePopupLog);

    popupClose.addEventListener("click", closePopupLog);
    document.addEventListener("keydown", isEscPressLog);
  };

  for (var i = 0; i <= popupOpen.length; i++) {
    if (popupOpen[i]) {
      popupOpen[i].removeEventListener("click", openPopupLog);
      popupOpen[i].addEventListener("click", openPopupLog);
    }
  }
}

if (popupCard && popupCloseCard && popupOpenCard) {

  var isEscPressCard = function (evt) {
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      closePopupCard();
    }
  };

  var closePopupCard = function () {
    var element = document.querySelector(".body-black");
    element.remove();
    if (popupCard) {
      popupCard.classList.remove(activeCard);
    }
    html.style.overflow = "auto";

    element.removeEventListener("click", closePopupCard);
    popupCloseCard.removeEventListener("click", closePopupCard);
    document.removeEventListener("keydown", isEscPressCard);
  };

  var openPopupCard = function (evt) {
    evt.preventDefault();
    openPopup(popupCard, bgBlack, activeCard, closePopupCard);

    popupCloseCard.addEventListener("click", closePopupCard);
    document.addEventListener("keydown", isEscPressCard);
  };

  popupOpenCard.removeEventListener("click", openPopupCard);
  popupOpenCard.addEventListener("click", openPopupCard);
}

})();
