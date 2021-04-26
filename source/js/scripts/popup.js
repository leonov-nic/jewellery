"use strict";

(function () {
  var popupMail = document.querySelector(".popup-log [name=mail]");
  var form = document.querySelector(".popup-log form");
  var storageMail = "";
  var isStorageSupport = "true";
  var body = document.querySelector("body");
  var popupLogin = document.querySelector(".popup-log");
  var popupCard = document.querySelector(".popup-addtocart");
  var popupClose = document.querySelectorAll(".js-close");
  var popupOpenLogButtons = document.querySelectorAll(".page-header__log");
  var popupOpenCardButton = document.querySelector(".button--js-card");
  var KEY_ESCAPE = "Escape";

  function isEscPress(evt) {
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      closePopup();
    }
  }

  var setStorage = function () {
    try {
      storageMail = localStorage.getItem("storageMail");
    } catch (err) {
      isStorageSupport = "false";
    }

    if (storageMail) {
      popupMail.value = storageMail;

      setTimeout(function () {
        popupMail.focus();
      }, 0);

    } else {
      setTimeout(function () {
        popupMail.focus();
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

  function closePopup() {
    var element = document.querySelector(".body-black");
    var popups = document.querySelectorAll(".popup-log, .popup-addtocart");
    element.remove();
    body.style.overflow = "auto";

    if (popupLogin || popupCard) {
      for (var i = 0; i < popups.length; i++) {
        popups[i].classList.remove("popup-show");
      }
    }

    element.removeEventListener("click", closePopup);
    for (var j = 0; j < popupClose.length; j++) {
      popupClose[j].removeEventListener("click", closePopup);
    }
    document.removeEventListener("keydown", isEscPress);
  }

  function openPopup(popup) {
    var element = document.createElement("div");
    element.className = "body-black";
    document.body.appendChild(element);

    if (popup) {
      popup.classList.add("popup-show");
    }

    if (popupMail) {
      setStorage();
    }

    body.style.overflow = "hidden";

    element.addEventListener("click", closePopup);
    for (var i = 0; i < popupClose.length; i++) {
      popupClose[i].addEventListener("click", closePopup);
    }
    document.addEventListener("keydown", isEscPress);
  }

  var openPopupLogin = function (evt) {
    evt.preventDefault();
    openPopup(popupLogin);
  };

  if (popupOpenLogButtons) {
    for (var i = 0; i < popupOpenLogButtons.length; i++) {
      popupOpenLogButtons[i].removeEventListener("click", openPopupLogin);
      popupOpenLogButtons[i].addEventListener("click", openPopupLogin);
    }
  }

  var openPopupCard = function (evt) {
    evt.preventDefault();
    openPopup(popupCard);
  };

  if (popupOpenCardButton) {
    popupOpenCardButton.removeEventListener("click", openPopupCard);
    popupOpenCardButton.addEventListener("click", openPopupCard);
  }

})();
