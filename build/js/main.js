"use strict";

(function () {

  var headings = document.querySelectorAll("fieldset h3");
  var fields = document.querySelectorAll(".catalog fieldset");
  var catalogPage = document.querySelector(".catalog");
  var items = document.querySelectorAll(".faq__item");
  var faq = document.querySelector(".faq");
  var classClosed = "js-closed";
  var classOpened = "js-opened";

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

  var openCloseLists = function (toggle, list, lists, classclosed, classopened) {

    toggle.addEventListener("click", function () {

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
    });
  };

  var openCloseFlterFields = function (toggle, list, classclosed, classopened) {

    toggle.addEventListener("click", function () {

      if (list.classList.contains(classopened)) {
        list.classList.add(classclosed);
        list.classList.remove(classopened);
      } else {
        onOpenCloseMenu(list, classclosed, classopened);
      }
    });
  };

  if (fields && headings) {
    for (var i = 0; i < fields.length; i++) {
      openCloseFlterFields(headings[i], fields[i], classClosed, classOpened);
    }
  }

  if (items) {
    for (var j = 0; j < items.length; j++) {
      openCloseLists(items[j], items[j], items, classClosed, classOpened);
    }
  }

})();

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
    buttonSubmit.addEventListener("click", function (evt) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZC5qcyIsImZpbHRlci5qcyIsIm1lbnUuanMiLCJwb3B1cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImZpZWxkc2V0IGgzXCIpO1xuICB2YXIgZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXRhbG9nIGZpZWxkc2V0XCIpO1xuICB2YXIgY2F0YWxvZ1BhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdGFsb2dcIik7XG4gIHZhciBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmFxX19pdGVtXCIpO1xuICB2YXIgZmFxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXFcIik7XG4gIHZhciBjbGFzc0Nsb3NlZCA9IFwianMtY2xvc2VkXCI7XG4gIHZhciBjbGFzc09wZW5lZCA9IFwianMtb3BlbmVkXCI7XG5cbiAgaWYgKGZhcSkge1xuICAgIGZhcS5jbGFzc0xpc3QucmVtb3ZlKFwiZmFxLS1ub2pzXCIpO1xuICB9XG5cbiAgaWYgKGNhdGFsb2dQYWdlKSB7XG4gICAgY2F0YWxvZ1BhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImNhdGFsb2ctLW5vanNcIik7XG4gIH1cblxuICBmdW5jdGlvbiBvbk9wZW5DbG9zZU1lbnUobGlzdCwgY2xhc3NjbG9zZWQsIGNsYXNzb3BlbmVkKSB7XG4gICAgaWYgKGxpc3QuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzY2xvc2VkKSkge1xuICAgICAgbGlzdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzY2xvc2VkKTtcbiAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZChjbGFzc29wZW5lZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZChjbGFzc2Nsb3NlZCk7XG4gICAgICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NvcGVuZWQpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvcGVuQ2xvc2VMaXN0cyA9IGZ1bmN0aW9uICh0b2dnbGUsIGxpc3QsIGxpc3RzLCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpIHtcblxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgICBpZiAobGlzdC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NvcGVuZWQpKSB7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZChjbGFzc2Nsb3NlZCk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnJlbW92ZShjbGFzc29wZW5lZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgb3BlbmVkTGlzdHMgPSBsaXN0cztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcGVuZWRMaXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG9wZW5lZExpc3RzW2ldLmNsYXNzTGlzdC5hZGQoY2xhc3NjbG9zZWQpO1xuICAgICAgICAgIG9wZW5lZExpc3RzW2ldLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NvcGVuZWQpO1xuICAgICAgICB9XG4gICAgICAgIG9uT3BlbkNsb3NlTWVudShsaXN0LCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHZhciBvcGVuQ2xvc2VGbHRlckZpZWxkcyA9IGZ1bmN0aW9uICh0b2dnbGUsIGxpc3QsIGNsYXNzY2xvc2VkLCBjbGFzc29wZW5lZCkge1xuXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGlmIChsaXN0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc29wZW5lZCkpIHtcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKGNsYXNzY2xvc2VkKTtcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzb3BlbmVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uT3BlbkNsb3NlTWVudShsaXN0LCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGlmIChmaWVsZHMgJiYgaGVhZGluZ3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgb3BlbkNsb3NlRmx0ZXJGaWVsZHMoaGVhZGluZ3NbaV0sIGZpZWxkc1tpXSwgY2xhc3NDbG9zZWQsIGNsYXNzT3BlbmVkKTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXRlbXMpIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW1zLmxlbmd0aDsgaisrKSB7XG4gICAgICBvcGVuQ2xvc2VMaXN0cyhpdGVtc1tqXSwgaXRlbXNbal0sIGl0ZW1zLCBjbGFzc0Nsb3NlZCwgY2xhc3NPcGVuZWQpO1xuICAgIH1cbiAgfVxuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGNhdGFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdGFsb2dcIik7XG4gIHZhciBmaWx0ZXJDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0YWxvZ19fY2xvc2UtZmlsdGVyXCIpO1xuICB2YXIgZmlsdGVyT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlsdGVyLW9wZW5cIik7XG4gIHZhciBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgZnVuY3Rpb24gY2xvc2VGaWx0ZXIoKSB7XG4gICAgY2F0YWxvZy5jbGFzc0xpc3QucmVtb3ZlKFwiY2F0YWxvZy0tYWN0aXZlLWZpbHRlclwiKTtcbiAgICBmaWx0ZXJDbG9zZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VGaWx0ZXIpO1xuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICBib2R5LnN0eWxlLnBvc2l0aW9uID0gXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5GaWx0ZXIoKSB7XG4gICAgY2F0YWxvZy5jbGFzc0xpc3QuYWRkKFwiY2F0YWxvZy0tYWN0aXZlLWZpbHRlclwiKTtcbiAgICBmaWx0ZXJDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VGaWx0ZXIpO1xuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgIGJvZHkuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gIH1cblxuICBpZiAoY2F0YWxvZyAmJiBmaWx0ZXJPcGVuICYmIGZpbHRlckNsb3NlKSB7XG4gICAgZmlsdGVyT3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlbkZpbHRlcik7XG4gIH1cblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgcGFnZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJcIik7XG4gIHZhciBoZWFkZXJGb3JtID0gcGFnZUhlYWRlci5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgdmFyIG5hdmlnYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19uYXZcIik7XG4gIHZhciBoZWFkZXJUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX190b2dnbGVcIik7XG4gIHZhciBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgcGFnZUhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwicGFnZS1oZWFkZXItLW5vanNcIik7XG5cbiAgZnVuY3Rpb24gb3BlbkNsb3NlTWVudShoZWFkZXIsIG5hdikge1xuICAgIGlmIChoZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFnZS1oZWFkZXItLWNsb3NlZFwiKSkge1xuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJwYWdlLWhlYWRlci0tY2xvc2VkXCIpO1xuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwYWdlLWhlYWRlci0tb3BlbmVkXCIpO1xuICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoXCJwYWdlLWhlYWRlcl9fbWVudS1zaG93XCIpO1xuICAgICAgaGVhZGVyRm9ybS5jbGFzc0xpc3QuYWRkKFwicGFnZS1oZWFkZXJfX21lbnUtc2VhcmNoXCIpO1xuICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICBib2R5LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcInBhZ2UtaGVhZGVyLS1jbG9zZWRcIik7XG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyLS1vcGVuZWRcIik7XG4gICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyX19tZW51LXNob3dcIik7XG4gICAgICBoZWFkZXJGb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJwYWdlLWhlYWRlcl9fbWVudS1zZWFyY2hcIik7XG4gICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgICBib2R5LnN0eWxlLnBvc2l0aW9uID0gXCJcIjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbk9wZW5NZW51KCkge1xuICAgIG9wZW5DbG9zZU1lbnUocGFnZUhlYWRlciwgbmF2aWdhdGlvbik7XG4gIH1cblxuICBoZWFkZXJUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uT3Blbk1lbnUpO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBwb3B1cE1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWxvZyBbbmFtZT1tYWlsXVwiKTtcbiAgdmFyIGJ1dHRvblN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtbG9nIFt0eXBlPXN1Ym1pdF1cIik7XG4gIHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1sb2cgZm9ybVwiKTtcbiAgdmFyIHN0b3JhZ2VNYWlsID0gXCJcIjtcbiAgdmFyIGlzU3RvcmFnZVN1cHBvcnQgPSBcInRydWVcIjtcbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgdmFyIHBvcHVwTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWxvZ1wiKTtcbiAgdmFyIHBvcHVwQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtYWRkdG9jYXJ0XCIpO1xuICB2YXIgcG9wdXBDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtY2xvc2VcIik7XG4gIHZhciBwb3B1cE9wZW5Mb2dCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYWdlLWhlYWRlcl9fbG9nLCAucGFnZS1oZWFkZXJfX3RvZ2dsZS0taW5wdXRcIik7XG4gIHZhciBwb3B1cE9wZW5DYXJkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tLWpzLWNhcmRcIik7XG4gIHZhciBLRVlfRVNDQVBFID0gXCJFc2NhcGVcIjtcblxuICBmdW5jdGlvbiBpc0VzY1ByZXNzKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBLRVlfRVNDQVBFKSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICB9XG4gIH1cblxuICB2YXIgc2V0U3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgc3RvcmFnZU1haWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN0b3JhZ2VNYWlsXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaXNTdG9yYWdlU3VwcG9ydCA9IFwiZmFsc2VcIjtcbiAgICB9XG5cbiAgICBpZiAoc3RvcmFnZU1haWwpIHtcbiAgICAgIHBvcHVwTWFpbC52YWx1ZSA9IHN0b3JhZ2VNYWlsO1xuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9wdXBNYWlsLmZvY3VzKCk7XG4gICAgICB9LCAwKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcG9wdXBNYWlsLmZvY3VzKCk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKHBvcHVwTWFpbCkge1xuICAgIGlmIChwb3B1cExvZ2luLmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwLWxvZy0taW52YWxpZFwiKSkge1xuICAgICAgcG9wdXBMb2dpbi5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXAtbG9nLS1pbnZhbGlkXCIpO1xuICAgIH1cbiAgICBwb3B1cE1haWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChwb3B1cE1haWwudmFsdWUgJiYgcG9wdXBMb2dpbi5jbGFzc0xpc3QuY29udGFpbnMoXCJwb3B1cC1sb2ctLWludmFsaWRcIikpIHtcbiAgICAgICAgcG9wdXBMb2dpbi5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXAtbG9nLS1pbnZhbGlkXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGZvcm0gJiYgcG9wdXBNYWlsKSB7XG5cbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgaWYgKHBvcHVwTWFpbC52YWx1ZSkge1xuICAgICAgICBpZiAoaXNTdG9yYWdlU3VwcG9ydCkge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RvcmFnZU1haWxcIiwgcG9wdXBNYWlsLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoYnV0dG9uU3VibWl0KSB7XG4gICAgYnV0dG9uU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBpZiAoIXBvcHVwTWFpbC52YWx1ZSkge1xuICAgICAgICBwb3B1cExvZ2luLmNsYXNzTGlzdC5hZGQoXCJwb3B1cC1sb2ctLWludmFsaWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3B1cExvZ2luLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cC1sb2ctLWludmFsaWRcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2R5LWJsYWNrXCIpO1xuICAgIHZhciBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwLWxvZywgLnBvcHVwLWFkZHRvY2FydFwiKTtcbiAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICBib2R5LnN0eWxlLnBvc2l0aW9uID0gXCJcIjtcblxuICAgIGlmIChwb3B1cExvZ2luIHx8IHBvcHVwQ2FyZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3B1cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9wdXBzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cC1zaG93XCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlUG9wdXApO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcG9wdXBDbG9zZS5sZW5ndGg7IGorKykge1xuICAgICAgcG9wdXBDbG9zZVtqXS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VQb3B1cCk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGlzRXNjUHJlc3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gb3BlblBvcHVwKHBvcHVwKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gXCJib2R5LWJsYWNrXCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgIGlmIChwb3B1cCkge1xuICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwLXNob3dcIik7XG4gICAgfVxuXG4gICAgaWYgKHBvcHVwTWFpbCkge1xuICAgICAgc2V0U3RvcmFnZSgpO1xuICAgIH1cblxuICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgIGJvZHkuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZVBvcHVwKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvcHVwQ2xvc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvcHVwQ2xvc2VbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlUG9wdXApO1xuICAgIH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBpc0VzY1ByZXNzKTtcbiAgfVxuXG4gIHZhciBvcGVuUG9wdXBMb2dpbiA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBvcGVuUG9wdXAocG9wdXBMb2dpbik7XG4gIH07XG5cbiAgaWYgKHBvcHVwT3BlbkxvZ0J1dHRvbnMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvcHVwT3BlbkxvZ0J1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvcHVwT3BlbkxvZ0J1dHRvbnNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cExvZ2luKTtcbiAgICAgIHBvcHVwT3BlbkxvZ0J1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cExvZ2luKTtcbiAgICB9XG4gIH1cblxuICB2YXIgb3BlblBvcHVwQ2FyZCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBvcGVuUG9wdXAocG9wdXBDYXJkKTtcbiAgfTtcblxuICBpZiAocG9wdXBPcGVuQ2FyZEJ1dHRvbikge1xuICAgIHBvcHVwT3BlbkNhcmRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cENhcmQpO1xuICAgIHBvcHVwT3BlbkNhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cENhcmQpO1xuICB9XG5cbn0pKCk7XG4iXX0=
