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

  if (fields && headings) {
    for (var i = 0; i < fields.length; i++) {
      openCloseLists(headings[i], fields[i], fields, classClosed, classOpened);
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

"use strict";

(function () {
  var pageHeader = document.querySelector(".page-header");
  var headerForm = pageHeader.querySelector("form");
  var navigation = document.querySelector(".page-header__nav");
  var headerToggle = document.querySelector(".page-header__toggle");

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

})();

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZC5qcyIsImZpbHRlci5qcyIsIm1lbnUuanMiLCJwb3B1cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImZpZWxkc2V0IGgzXCIpO1xuICB2YXIgZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXRhbG9nIGZpZWxkc2V0XCIpO1xuICB2YXIgY2F0YWxvZ1BhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdGFsb2dcIik7XG4gIHZhciBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmFxX19pdGVtXCIpO1xuICB2YXIgZmFxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXFcIik7XG4gIHZhciBjbGFzc0Nsb3NlZCA9IFwianMtY2xvc2VkXCI7XG4gIHZhciBjbGFzc09wZW5lZCA9IFwianMtb3BlbmVkXCI7XG5cbiAgaWYgKGZhcSkge1xuICAgIGZhcS5jbGFzc0xpc3QucmVtb3ZlKFwiZmFxLS1ub2pzXCIpO1xuICB9XG5cbiAgaWYgKGNhdGFsb2dQYWdlKSB7XG4gICAgY2F0YWxvZ1BhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImNhdGFsb2ctLW5vanNcIik7XG4gIH1cblxuICBmdW5jdGlvbiBvbk9wZW5DbG9zZU1lbnUobGlzdCwgY2xhc3NjbG9zZWQsIGNsYXNzb3BlbmVkKSB7XG4gICAgaWYgKGxpc3QuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzY2xvc2VkKSkge1xuICAgICAgbGlzdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzY2xvc2VkKTtcbiAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZChjbGFzc29wZW5lZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZChjbGFzc2Nsb3NlZCk7XG4gICAgICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NvcGVuZWQpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvcGVuQ2xvc2VMaXN0cyA9IGZ1bmN0aW9uICh0b2dnbGUsIGxpc3QsIGxpc3RzLCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpIHtcblxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgICBpZiAobGlzdC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NvcGVuZWQpKSB7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZChjbGFzc2Nsb3NlZCk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnJlbW92ZShjbGFzc29wZW5lZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgb3BlbmVkTGlzdHMgPSBsaXN0cztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcGVuZWRMaXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG9wZW5lZExpc3RzW2ldLmNsYXNzTGlzdC5hZGQoY2xhc3NjbG9zZWQpO1xuICAgICAgICAgIG9wZW5lZExpc3RzW2ldLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NvcGVuZWQpO1xuICAgICAgICB9XG4gICAgICAgIG9uT3BlbkNsb3NlTWVudShsaXN0LCBjbGFzc2Nsb3NlZCwgY2xhc3NvcGVuZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGlmIChmaWVsZHMgJiYgaGVhZGluZ3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgb3BlbkNsb3NlTGlzdHMoaGVhZGluZ3NbaV0sIGZpZWxkc1tpXSwgZmllbGRzLCBjbGFzc0Nsb3NlZCwgY2xhc3NPcGVuZWQpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpdGVtcykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIG9wZW5DbG9zZUxpc3RzKGl0ZW1zW2pdLCBpdGVtc1tqXSwgaXRlbXMsIGNsYXNzQ2xvc2VkLCBjbGFzc09wZW5lZCk7XG4gICAgfVxuICB9XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgY2F0YWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0YWxvZ1wiKTtcbiAgdmFyIGZpbHRlckNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXRhbG9nX19jbG9zZS1maWx0ZXJcIik7XG4gIHZhciBmaWx0ZXJPcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaWx0ZXItb3BlblwiKTtcblxuICBmdW5jdGlvbiBjbG9zZUZpbHRlcigpIHtcbiAgICBjYXRhbG9nLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXRhbG9nLS1hY3RpdmUtZmlsdGVyXCIpO1xuICAgIGZpbHRlckNsb3NlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZUZpbHRlcik7XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuRmlsdGVyKCkge1xuICAgIGNhdGFsb2cuY2xhc3NMaXN0LmFkZChcImNhdGFsb2ctLWFjdGl2ZS1maWx0ZXJcIik7XG4gICAgZmlsdGVyQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlRmlsdGVyKTtcbiAgfVxuXG4gIGlmIChjYXRhbG9nICYmIGZpbHRlck9wZW4gJiYgZmlsdGVyQ2xvc2UpIHtcbiAgICBmaWx0ZXJPcGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuRmlsdGVyKTtcbiAgfVxuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBwYWdlSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWhlYWRlclwiKTtcbiAgdmFyIGhlYWRlckZvcm0gPSBwYWdlSGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICB2YXIgbmF2aWdhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX25hdlwiKTtcbiAgdmFyIGhlYWRlclRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX3RvZ2dsZVwiKTtcblxuICBwYWdlSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJwYWdlLWhlYWRlci0tbm9qc1wiKTtcblxuICBmdW5jdGlvbiBvcGVuQ2xvc2VNZW51KGhlYWRlciwgbmF2KSB7XG4gICAgaWYgKGhlYWRlci5jbGFzc0xpc3QuY29udGFpbnMoXCJwYWdlLWhlYWRlci0tY2xvc2VkXCIpKSB7XG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyLS1jbG9zZWRcIik7XG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcInBhZ2UtaGVhZGVyLS1vcGVuZWRcIik7XG4gICAgICBuYXYuY2xhc3NMaXN0LmFkZChcInBhZ2UtaGVhZGVyX19tZW51LXNob3dcIik7XG4gICAgICBoZWFkZXJGb3JtLmNsYXNzTGlzdC5hZGQoXCJwYWdlLWhlYWRlcl9fbWVudS1zZWFyY2hcIik7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwYWdlLWhlYWRlci0tY2xvc2VkXCIpO1xuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJwYWdlLWhlYWRlci0tb3BlbmVkXCIpO1xuICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoXCJwYWdlLWhlYWRlcl9fbWVudS1zaG93XCIpO1xuICAgICAgaGVhZGVyRm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwicGFnZS1oZWFkZXJfX21lbnUtc2VhcmNoXCIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uT3Blbk1lbnUoKSB7XG4gICAgb3BlbkNsb3NlTWVudShwYWdlSGVhZGVyLCBuYXZpZ2F0aW9uKTtcbiAgfVxuXG4gIGhlYWRlclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25PcGVuTWVudSk7XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBvcHVwTWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtbG9nIFtuYW1lPW1haWxdXCIpO1xuICB2YXIgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtbG9nIGZvcm1cIik7XG4gIHZhciBzdG9yYWdlTWFpbCA9IFwiXCI7XG4gIHZhciBpc1N0b3JhZ2VTdXBwb3J0ID0gXCJ0cnVlXCI7XG4gIHZhciBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIHZhciBwb3B1cExvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1sb2dcIik7XG4gIHZhciBwb3B1cENhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWFkZHRvY2FydFwiKTtcbiAgdmFyIHBvcHVwQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWNsb3NlXCIpO1xuICB2YXIgcG9wdXBPcGVuTG9nQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGFnZS1oZWFkZXJfX2xvZ1wiKTtcbiAgdmFyIHBvcHVwT3BlbkNhcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi0tanMtY2FyZFwiKTtcbiAgdmFyIEtFWV9FU0NBUEUgPSBcIkVzY2FwZVwiO1xuXG4gIGZ1bmN0aW9uIGlzRXNjUHJlc3MoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IEtFWV9FU0NBUEUpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2xvc2VQb3B1cCgpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzZXRTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlTWFpbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3RvcmFnZU1haWxcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpc1N0b3JhZ2VTdXBwb3J0ID0gXCJmYWxzZVwiO1xuICAgIH1cblxuICAgIGlmIChzdG9yYWdlTWFpbCkge1xuICAgICAgcG9wdXBNYWlsLnZhbHVlID0gc3RvcmFnZU1haWw7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cE1haWwuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cE1haWwuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfTtcblxuICBpZiAoZm9ybSkge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChwb3B1cE1haWwudmFsdWUpIHtcbiAgICAgICAgaWYgKGlzU3RvcmFnZVN1cHBvcnQpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInN0b3JhZ2VNYWlsXCIsIHBvcHVwTWFpbC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvZHktYmxhY2tcIik7XG4gICAgdmFyIHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wdXAtbG9nLCAucG9wdXAtYWRkdG9jYXJ0XCIpO1xuICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuXG4gICAgaWYgKHBvcHVwTG9naW4gfHwgcG9wdXBDYXJkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvcHVwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwb3B1cHNbaV0uY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwLXNob3dcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VQb3B1cCk7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBwb3B1cENsb3NlLmxlbmd0aDsgaisrKSB7XG4gICAgICBwb3B1cENsb3NlW2pdLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZVBvcHVwKTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaXNFc2NQcmVzcyk7XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuUG9wdXAocG9wdXApIHtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSBcImJvZHktYmxhY2tcIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgaWYgKHBvcHVwKSB7XG4gICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwicG9wdXAtc2hvd1wiKTtcbiAgICB9XG5cbiAgICBpZiAocG9wdXBNYWlsKSB7XG4gICAgICBzZXRTdG9yYWdlKCk7XG4gICAgfVxuXG4gICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZVBvcHVwKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvcHVwQ2xvc2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvcHVwQ2xvc2VbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlUG9wdXApO1xuICAgIH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBpc0VzY1ByZXNzKTtcbiAgfVxuXG4gIHZhciBvcGVuUG9wdXBMb2dpbiA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBvcGVuUG9wdXAocG9wdXBMb2dpbik7XG4gIH07XG5cbiAgaWYgKHBvcHVwT3BlbkxvZ0J1dHRvbnMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvcHVwT3BlbkxvZ0J1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvcHVwT3BlbkxvZ0J1dHRvbnNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cExvZ2luKTtcbiAgICAgIHBvcHVwT3BlbkxvZ0J1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cExvZ2luKTtcbiAgICB9XG4gIH1cblxuICB2YXIgb3BlblBvcHVwQ2FyZCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBvcGVuUG9wdXAocG9wdXBDYXJkKTtcbiAgfTtcblxuICBpZiAocG9wdXBPcGVuQ2FyZEJ1dHRvbikge1xuICAgIHBvcHVwT3BlbkNhcmRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cENhcmQpO1xuICAgIHBvcHVwT3BlbkNhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cENhcmQpO1xuICB9XG5cbn0pKCk7XG4iXX0=
