"use strict";

(function () {

  var headings = document.querySelectorAll("fieldset h3");
  var fields = document.querySelectorAll(".catalog fieldset");
  var catalogPage = document.querySelector(".catalog");
  var items = document.querySelectorAll(".faq__item");
  var faq = document.querySelector(".faq");
  var classClosed = "js-closed";
  var classOpened = "js-opened";
  var KEY_ENTER = "Enter";

  if (faq) {
    faq.classList.remove("faq--nojs");
  }

  if (catalogPage) {
    catalogPage.classList.remove("catalog--nojs");
  }

  function onOpenCloseMenu(list, classclosed, classopened) {
    if (list.classList.contains(classclosed)) {
      list.classList.remove(classclosed);
      list.classList.add(classopened);
    } else {
      list.classList.add(classclosed);
      list.classList.remove(classopened);
    }
  }

  var openCloseItems = function (list, lists, classclosed, classopened) {
    if (list.classList.contains(classopened)) {
      list.classList.add(classclosed);
      list.classList.remove(classopened);
    } else {
      var openedLists = lists;
      for (var i = 0; i < openedLists.length; i++) {
        openedLists[i].classList.add(classclosed);
        openedLists[i].classList.remove(classopened);
      }
      onOpenCloseMenu(list, classclosed, classopened);
    }
  };

  var onOpenCloseLists = function (toggle, list, lists, classclosed, classopened) {
    toggle.addEventListener("click", function () {
      openCloseItems(list, lists, classclosed, classopened);
    });

    toggle.addEventListener("keydown", function (evt) {
      if (evt.key === KEY_ENTER) {
        evt.preventDefault();
        openCloseItems(list, lists, classclosed, classopened);
      }
    });
  };

   var openCloseFiterFields = function (field, classclosed, classopened) {
    if (field.classList.contains(classopened)) {
      field.classList.add(classclosed);
      field.classList.remove(classopened);
    } else {
      onOpenCloseMenu(field, classclosed, classopened);
    }
  };

  var onOpenCloseFiterFields = function (toggle, field, classclosed, classopened) {
    toggle.addEventListener("click", function () {
      openCloseFiterFields(field, classclosed, classopened);
    });

    field.addEventListener("keydown", function (evt) {
      if (evt.key === KEY_ENTER) {
        evt.preventDefault();
        openCloseFiterFields(field, classclosed, classopened);
      }
    });
  };

  if (fields && headings) {
    for (var i = 0; i < fields.length; i++) {
      onOpenCloseFiterFields(headings[i], fields[i], classClosed, classOpened);
    }
  }

  if (items) {
    for (var j = 0; j < items.length; j++) {
      onOpenCloseLists(items[j], items[j], items, classClosed, classOpened);
    }
  }

})();

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
      nav.style.overflowY = "scroll";
      nav.style.height = "100%";
    } else {
      header.classList.add("page-header--closed");
      header.classList.remove("page-header--opened");
      nav.classList.remove("page-header__menu-show");
      headerForm.classList.remove("page-header__menu-search");
      body.style.overflow = "auto";
      body.style.position = "";
      nav.style.overflowY = "auto";
      nav.style.height = "auto";
    }
  }

  function onOpenMenu() {
    openCloseMenu(pageHeader, navigation);
  }

  headerToggle.addEventListener("click", onOpenMenu);

})();

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
    body.style.overflowY = "auto";
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

    body.style.overflowY = "hidden";
    body.style.position = "fixed";

    if (window.screen.width <= 1023 && window.screen.height <= 615) {
      popup.style.overflowY = "scroll";
      popup.style.height = "100%";
      popup.style.top = "0";
    }

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZC5qcyIsImZpbHRlci5qcyIsIm1lbnUuanMiLCJwb3B1cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgaGVhZGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZmllbGRzZXQgaDNcIik7XG4gIHZhciBmaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhdGFsb2cgZmllbGRzZXRcIik7XG4gIHZhciBjYXRhbG9nUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0YWxvZ1wiKTtcbiAgdmFyIGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mYXFfX2l0ZW1cIik7XG4gIHZhciBmYXEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhcVwiKTtcbiAgdmFyIGNsYXNzQ2xvc2VkID0gXCJqcy1jbG9zZWRcIjtcbiAgdmFyIGNsYXNzT3BlbmVkID0gXCJqcy1vcGVuZWRcIjtcbiAgdmFyIEtFWV9FTlRFUiA9IFwiRW50ZXJcIjtcblxuICBpZiAoZmFxKSB7XG4gICAgZmFxLmNsYXNzTGlzdC5yZW1vdmUoXCJmYXEtLW5vanNcIik7XG4gIH1cblxuICBpZiAoY2F0YWxvZ1BhZ2UpIHtcbiAgICBjYXRhbG9nUGFnZS5jbGFzc0xpc3QucmVtb3ZlKFwiY2F0YWxvZy0tbm9qc1wiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uT3BlbkNsb3NlTWVudShsaXN0LCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpIHtcbiAgICBpZiAobGlzdC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NjbG9zZWQpKSB7XG4gICAgICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NjbG9zZWQpO1xuICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKGNsYXNzb3BlbmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKGNsYXNzY2xvc2VkKTtcbiAgICAgIGxpc3QuY2xhc3NMaXN0LnJlbW92ZShjbGFzc29wZW5lZCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG9wZW5DbG9zZUl0ZW1zID0gZnVuY3Rpb24gKGxpc3QsIGxpc3RzLCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpIHtcbiAgICBpZiAobGlzdC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NvcGVuZWQpKSB7XG4gICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoY2xhc3NjbG9zZWQpO1xuICAgICAgbGlzdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzb3BlbmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9wZW5lZExpc3RzID0gbGlzdHM7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wZW5lZExpc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG9wZW5lZExpc3RzW2ldLmNsYXNzTGlzdC5hZGQoY2xhc3NjbG9zZWQpO1xuICAgICAgICBvcGVuZWRMaXN0c1tpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzb3BlbmVkKTtcbiAgICAgIH1cbiAgICAgIG9uT3BlbkNsb3NlTWVudShsaXN0LCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgb25PcGVuQ2xvc2VMaXN0cyA9IGZ1bmN0aW9uICh0b2dnbGUsIGxpc3QsIGxpc3RzLCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpIHtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG9wZW5DbG9zZUl0ZW1zKGxpc3QsIGxpc3RzLCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpO1xuICAgIH0pO1xuXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGlmIChldnQua2V5ID09PSBLRVlfRU5URVIpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9wZW5DbG9zZUl0ZW1zKGxpc3QsIGxpc3RzLCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gICB2YXIgb3BlbkNsb3NlRml0ZXJGaWVsZHMgPSBmdW5jdGlvbiAoZmllbGQsIGNsYXNzY2xvc2VkLCBjbGFzc29wZW5lZCkge1xuICAgIGlmIChmaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NvcGVuZWQpKSB7XG4gICAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKGNsYXNzY2xvc2VkKTtcbiAgICAgIGZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NvcGVuZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbk9wZW5DbG9zZU1lbnUoZmllbGQsIGNsYXNzY2xvc2VkLCBjbGFzc29wZW5lZCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBvbk9wZW5DbG9zZUZpdGVyRmllbGRzID0gZnVuY3Rpb24gKHRvZ2dsZSwgZmllbGQsIGNsYXNzY2xvc2VkLCBjbGFzc29wZW5lZCkge1xuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgb3BlbkNsb3NlRml0ZXJGaWVsZHMoZmllbGQsIGNsYXNzY2xvc2VkLCBjbGFzc29wZW5lZCk7XG4gICAgfSk7XG5cbiAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBpZiAoZXZ0LmtleSA9PT0gS0VZX0VOVEVSKSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvcGVuQ2xvc2VGaXRlckZpZWxkcyhmaWVsZCwgY2xhc3NjbG9zZWQsIGNsYXNzb3BlbmVkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBpZiAoZmllbGRzICYmIGhlYWRpbmdzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9uT3BlbkNsb3NlRml0ZXJGaWVsZHMoaGVhZGluZ3NbaV0sIGZpZWxkc1tpXSwgY2xhc3NDbG9zZWQsIGNsYXNzT3BlbmVkKTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXRlbXMpIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW1zLmxlbmd0aDsgaisrKSB7XG4gICAgICBvbk9wZW5DbG9zZUxpc3RzKGl0ZW1zW2pdLCBpdGVtc1tqXSwgaXRlbXMsIGNsYXNzQ2xvc2VkLCBjbGFzc09wZW5lZCk7XG4gICAgfVxuICB9XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgY2F0YWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0YWxvZ1wiKTtcbiAgdmFyIGZpbHRlckNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXRhbG9nX19jbG9zZS1maWx0ZXJcIik7XG4gIHZhciBmaWx0ZXJPcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaWx0ZXItb3BlblwiKTtcbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdGFsb2cgZm9ybVwiKTtcblxuICBmdW5jdGlvbiBjbG9zZUZpbHRlcigpIHtcbiAgICBjYXRhbG9nLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXRhbG9nLS1hY3RpdmUtZmlsdGVyXCIpO1xuICAgIGZpbHRlckNsb3NlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZUZpbHRlcik7XG4gICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgIGJvZHkuc3R5bGUucG9zaXRpb24gPSBcIlwiO1xuICAgIGZvcm0uc3R5bGUub3ZlcmZsb3dZID0gXCJhdXRvXCI7XG4gICAgZm9ybS5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5GaWx0ZXIoKSB7XG4gICAgY2F0YWxvZy5jbGFzc0xpc3QuYWRkKFwiY2F0YWxvZy0tYWN0aXZlLWZpbHRlclwiKTtcbiAgICBmaWx0ZXJDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VGaWx0ZXIpO1xuXG4gICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gMTAyMykge1xuICAgICAgZm9ybS5zdHlsZS5vdmVyZmxvd1kgPSBcInNjcm9sbFwiO1xuICAgICAgZm9ybS5zdHlsZS5oZWlnaHQgPSBcIjEwMHZoXCI7XG4gICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICAgIGJvZHkuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNhdGFsb2cgJiYgZmlsdGVyT3BlbiAmJiBmaWx0ZXJDbG9zZSAmJiBmb3JtKSB7XG4gICAgZmlsdGVyT3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlbkZpbHRlcik7XG4gIH1cblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgcGFnZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJcIik7XG4gIHZhciBoZWFkZXJGb3JtID0gcGFnZUhlYWRlci5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgdmFyIG5hdmlnYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19uYXZcIik7XG4gIHZhciBoZWFkZXJUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX190b2dnbGVcIik7XG4gIHZhciBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgcGFnZUhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwicGFnZS1oZWFkZXItLW5vanNcIik7XG5cbiAgZnVuY3Rpb24gb3BlbkNsb3NlTWVudShoZWFkZXIsIG5hdikge1xuICAgIGlmIChoZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFnZS1oZWFkZXItLWNsb3NlZFwiKSkge1xuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJwYWdlLWhlYWRlci0tY2xvc2VkXCIpO1xuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwYWdlLWhlYWRlci0tb3BlbmVkXCIpO1xuICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoXCJwYWdlLWhlYWRlcl9fbWVudS1zaG93XCIpO1xuICAgICAgaGVhZGVyRm9ybS5jbGFzc0xpc3QuYWRkKFwicGFnZS1oZWFkZXJfX21lbnUtc2VhcmNoXCIpO1xuICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICBib2R5LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgICAgbmF2LnN0eWxlLm92ZXJmbG93WSA9IFwic2Nyb2xsXCI7XG4gICAgICBuYXYuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwicGFnZS1oZWFkZXItLWNsb3NlZFwiKTtcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwicGFnZS1oZWFkZXItLW9wZW5lZFwiKTtcbiAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwicGFnZS1oZWFkZXJfX21lbnUtc2hvd1wiKTtcbiAgICAgIGhlYWRlckZvcm0uY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyX19tZW51LXNlYXJjaFwiKTtcbiAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICAgIGJvZHkuc3R5bGUucG9zaXRpb24gPSBcIlwiO1xuICAgICAgbmF2LnN0eWxlLm92ZXJmbG93WSA9IFwiYXV0b1wiO1xuICAgICAgbmF2LnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uT3Blbk1lbnUoKSB7XG4gICAgb3BlbkNsb3NlTWVudShwYWdlSGVhZGVyLCBuYXZpZ2F0aW9uKTtcbiAgfVxuXG4gIGhlYWRlclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25PcGVuTWVudSk7XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBvcHVwTWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtbG9nIFtuYW1lPW1haWxdXCIpO1xuICB2YXIgYnV0dG9uU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1sb2cgW3R5cGU9c3VibWl0XVwiKTtcbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWxvZyBmb3JtXCIpO1xuICB2YXIgc3RvcmFnZU1haWwgPSBcIlwiO1xuICB2YXIgaXNTdG9yYWdlU3VwcG9ydCA9IFwidHJ1ZVwiO1xuICB2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICB2YXIgcG9wdXBMb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtbG9nXCIpO1xuICB2YXIgcG9wdXBDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1hZGR0b2NhcnRcIik7XG4gIHZhciBwb3B1cENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1jbG9zZVwiKTtcbiAgdmFyIHBvcHVwT3BlbkxvZ0J1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBhZ2UtaGVhZGVyX19sb2csIC5wYWdlLWhlYWRlcl9fdG9nZ2xlLS1pbnB1dFwiKTtcbiAgdmFyIHBvcHVwT3BlbkNhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi0tanMtY2FyZFwiKTtcbiAgdmFyIEtFWV9FU0NBUEUgPSBcIkVzY2FwZVwiO1xuXG4gIGZ1bmN0aW9uIGlzRXNjUHJlc3MoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IEtFWV9FU0NBUEUpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2xvc2VQb3B1cCgpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzZXRTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlTWFpbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3RvcmFnZU1haWxcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpc1N0b3JhZ2VTdXBwb3J0ID0gXCJmYWxzZVwiO1xuICAgIH1cblxuICAgIGlmIChzdG9yYWdlTWFpbCkge1xuICAgICAgcG9wdXBNYWlsLnZhbHVlID0gc3RvcmFnZU1haWw7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cE1haWwuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cE1haWwuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfTtcblxuICBpZiAocG9wdXBNYWlsKSB7XG4gICAgaWYgKHBvcHVwTG9naW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwicG9wdXAtbG9nLS1pbnZhbGlkXCIpKSB7XG4gICAgICBwb3B1cExvZ2luLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cC1sb2ctLWludmFsaWRcIik7XG4gICAgfVxuICAgIHBvcHVwTWFpbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHBvcHVwTWFpbC52YWx1ZSAmJiBwb3B1cExvZ2luLmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwLWxvZy0taW52YWxpZFwiKSkge1xuICAgICAgICBwb3B1cExvZ2luLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cC1sb2ctLWludmFsaWRcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoZm9ybSAmJiBwb3B1cE1haWwpIHtcblxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBpZiAocG9wdXBNYWlsLnZhbHVlKSB7XG4gICAgICAgIGlmIChpc1N0b3JhZ2VTdXBwb3J0KSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzdG9yYWdlTWFpbFwiLCBwb3B1cE1haWwudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChidXR0b25TdWJtaXQpIHtcbiAgICBidXR0b25TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghcG9wdXBNYWlsLnZhbHVlKSB7XG4gICAgICAgIHBvcHVwTG9naW4uY2xhc3NMaXN0LmFkZChcInBvcHVwLWxvZy0taW52YWxpZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcHVwTG9naW4uY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwLWxvZy0taW52YWxpZFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvZHktYmxhY2tcIik7XG4gICAgdmFyIHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXAtbG9nLCAucG9wdXAtYWRkdG9jYXJ0XCIpO1xuICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgYm9keS5zdHlsZS5vdmVyZmxvd1kgPSBcImF1dG9cIjtcbiAgICBib2R5LnN0eWxlLnBvc2l0aW9uID0gXCJcIjtcblxuICAgIGlmIChwb3B1cExvZ2luIHx8IHBvcHVwQ2FyZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3B1cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9wdXBzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cC1zaG93XCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlUG9wdXApO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcG9wdXBDbG9zZS5sZW5ndGg7IGorKykge1xuICAgICAgcG9wdXBDbG9zZVtqXS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VQb3B1cCk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGlzRXNjUHJlc3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gb3BlblBvcHVwKHBvcHVwKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gXCJib2R5LWJsYWNrXCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgIGlmIChwb3B1cCkge1xuICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwLXNob3dcIik7XG4gICAgfVxuXG4gICAgaWYgKHBvcHVwTWFpbCkge1xuICAgICAgc2V0U3RvcmFnZSgpO1xuICAgIH1cblxuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3dZID0gXCJoaWRkZW5cIjtcbiAgICBib2R5LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuXG4gICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gMTAyMyAmJiB3aW5kb3cuc2NyZWVuLmhlaWdodCA8PSA2MTUpIHtcbiAgICAgIHBvcHVwLnN0eWxlLm92ZXJmbG93WSA9IFwic2Nyb2xsXCI7XG4gICAgICBwb3B1cC5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgIHBvcHVwLnN0eWxlLnRvcCA9IFwiMFwiO1xuICAgIH1cblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlUG9wdXApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9wdXBDbG9zZS5sZW5ndGg7IGkrKykge1xuICAgICAgcG9wdXBDbG9zZVtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VQb3B1cCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGlzRXNjUHJlc3MpO1xuICB9XG5cbiAgdmFyIG9wZW5Qb3B1cExvZ2luID0gZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG9wZW5Qb3B1cChwb3B1cExvZ2luKTtcbiAgfTtcblxuICBpZiAocG9wdXBPcGVuTG9nQnV0dG9ucykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9wdXBPcGVuTG9nQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgcG9wdXBPcGVuTG9nQnV0dG9uc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlblBvcHVwTG9naW4pO1xuICAgICAgcG9wdXBPcGVuTG9nQnV0dG9uc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlblBvcHVwTG9naW4pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvcGVuUG9wdXBDYXJkID0gZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG9wZW5Qb3B1cChwb3B1cENhcmQpO1xuICB9O1xuXG4gIGlmIChwb3B1cE9wZW5DYXJkQnV0dG9uKSB7XG4gICAgcG9wdXBPcGVuQ2FyZEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlblBvcHVwQ2FyZCk7XG4gICAgcG9wdXBPcGVuQ2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlblBvcHVwQ2FyZCk7XG4gIH1cblxufSkoKTtcbiJdfQ==
