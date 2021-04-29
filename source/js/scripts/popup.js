"use strict";

(function () {
  var popupMail = document.querySelector(".popup-log [name=mail]");
  var buttonSubmit = document.querySelector(".popup-log [type=submit]");
  var form = document.querySelector(".popup-log form");
  var storageMail = "";
  var isStorageSupport = "true";
  var body = document.querySelector("body");
  var popupLogin = document.querySelector(".popup-log");
  var popupCard = document.querySelector(".popup-addtocart");
  var popupClose = document.querySelectorAll(".js-close");
  var popupOpenLogButtons = document.querySelectorAll(".page-header__log, .page-header__toggle--input");
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

  if (popupMail) {
    if (popupLogin.classList.contains("popup-log--invalid")) {
      popupLogin.classList.remove("popup-log--invalid");
    }
    popupMail.addEventListener("input", function () {
      if (popupMail.value && popupLogin.classList.contains("popup-log--invalid")) {
        popupLogin.classList.remove("popup-log--invalid");
      }
    });
  }

  if (form && popupMail) {

    form.addEventListener("submit", function (evt) {
      if (popupMail.value) {
        if (isStorageSupport) {
          localStorage.setItem("storageMail", popupMail.value);
        }
      } else {
        evt.preventDefault();
      }
    });
  }

  if (buttonSubmit) {
    buttonSubmit.addEventListener("click", function () {
      if (!popupMail.value) {
        popupLogin.classList.add("popup-log--invalid");
      } else {
        popupLogin.classList.remove("popup-log--invalid");
      }
    });
  }

  function closePopup() {
    var element = document.querySelector(".body-black");
    var popups = document.querySelectorAll(".popup-log, .popup-addtocart");
    element.remove();
    body.style.overflow = "auto";
    body.style.position = "";

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
    body.style.position = "fixed";

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
