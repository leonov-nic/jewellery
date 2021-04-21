'use strict';

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
  var html = document.querySelector("html");
  var popupLogin = document.querySelector(".popup-log");
  var popupCard = document.querySelector(".popup-addtocart");
  var popupClose = document.querySelectorAll(".js-close");
  var popupOpenLogButtons = document.querySelectorAll(".page-header__log");
  var popupOpenCardButton = document.querySelector(".button--js-card");
  var KEY_ESCAPE = "Escape";

  function isEscPress (evt) {
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      closePopup();
    }
  }

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
        popupMail.focus();
      }, 0);

    } else {
      setTimeout(function() {
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

  function closePopup () {
    var element = document.querySelector(".body-black");
    let popups = document.querySelectorAll(".popup-log, .popup-addtocart");
    element.remove();
    html.style.overflow = "auto";

    if (popupLogin || popupCard) {
      for (var i = 0; i < popups.length; i++) {
        popups[i].classList.remove("popup-show");
      }
    }

    element.removeEventListener("click", closePopup);
    for (var i = 0; i < popupClose.length; i++) {
      popupClose[i].removeEventListener("click", closePopup);
    }
    document.removeEventListener("keydown", isEscPress);
  }

  function openPopup (popup) {
    var element = document.createElement("div");
    element.className = "body-black";
    document.body.appendChild(element);

    if (popup) {
      popup.classList.add("popup-show");
    }

    if (popupMail) {
      setStorage();
    }

    html.style.overflow = "hidden";

    element.addEventListener("click", closePopup);
    for (var i = 0; i < popupClose.length; i++) {
      popupClose[i].addEventListener("click", closePopup);
    }
    document.addEventListener("keydown", isEscPress);
  }

  var openPopupLogin = function (evt) {
    evt.preventDefault();
    openPopup(popupLogin);
  }

  if (popupOpenLogButtons) {
    for (var i = 0; i < popupOpenLogButtons.length; i++) {
      popupOpenLogButtons[i].removeEventListener("click", openPopupLogin);
      popupOpenLogButtons[i].addEventListener("click", openPopupLogin);
    }
  }

  var openPopupCard = function (evt) {
    evt.preventDefault();
    openPopup(popupCard);
  }

  if (popupOpenCardButton) {
    popupOpenCardButton.removeEventListener("click", openPopupCard);
    popupOpenCardButton.addEventListener("click", openPopupCard);
  }

})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlci5qcyIsIm1lbnUuanMiLCJwb3B1cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXG4gIHZhciBjYXRhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXRhbG9nXCIpO1xuICB2YXIgZmlsdGVyQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdGFsb2dfX2Nsb3NlLWZpbHRlclwiKTtcbiAgdmFyIGZpbHRlck9wZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpbHRlci1vcGVuXCIpO1xuXG4gIGZ1bmN0aW9uIGNsb3NlRmlsdGVyKCkge1xuICAgIGNhdGFsb2cuY2xhc3NMaXN0LnJlbW92ZShcImNhdGFsb2ctLWFjdGl2ZS1maWx0ZXJcIik7XG4gICAgZmlsdGVyQ2xvc2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlRmlsdGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5GaWx0ZXIoKSB7XG4gICAgY2F0YWxvZy5jbGFzc0xpc3QuYWRkKFwiY2F0YWxvZy0tYWN0aXZlLWZpbHRlclwiKTtcbiAgICBmaWx0ZXJDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VGaWx0ZXIpO1xuICB9XG5cbiAgaWYgKGNhdGFsb2cgJiYgZmlsdGVyT3BlbiAmJiBmaWx0ZXJDbG9zZSkge1xuICAgIGZpbHRlck9wZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5GaWx0ZXIpO1xuICB9XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBhZ2VIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyXCIpO1xuICB2YXIgaGVhZGVyRm9ybSA9IHBhZ2VIZWFkZXIucXVlcnlTZWxlY3RvcihcImZvcm1cIik7XG4gIHZhciBuYXZpZ2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWhlYWRlcl9fbmF2XCIpO1xuICB2YXIgaGVhZGVyVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWhlYWRlcl9fdG9nZ2xlXCIpO1xuXG4gIHBhZ2VIZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyLS1ub2pzXCIpO1xuXG4gIGZ1bmN0aW9uIG9wZW5DbG9zZU1lbnUoaGVhZGVyLCBuYXYpIHtcbiAgICBpZiAoaGVhZGVyLmNsYXNzTGlzdC5jb250YWlucyhcInBhZ2UtaGVhZGVyLS1jbG9zZWRcIikpIHtcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwicGFnZS1oZWFkZXItLWNsb3NlZFwiKTtcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwicGFnZS1oZWFkZXItLW9wZW5lZFwiKTtcbiAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKFwicGFnZS1oZWFkZXJfX21lbnUtc2hvd1wiKTtcbiAgICAgIGhlYWRlckZvcm0uY2xhc3NMaXN0LmFkZChcInBhZ2UtaGVhZGVyX19tZW51LXNlYXJjaFwiKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcInBhZ2UtaGVhZGVyLS1jbG9zZWRcIik7XG4gICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyLS1vcGVuZWRcIik7XG4gICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyX19tZW51LXNob3dcIik7XG4gICAgICBoZWFkZXJGb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJwYWdlLWhlYWRlcl9fbWVudS1zZWFyY2hcIik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25PcGVuTWVudSgpIHtcbiAgICBvcGVuQ2xvc2VNZW51KHBhZ2VIZWFkZXIsIG5hdmlnYXRpb24pO1xuICB9XG5cbiAgaGVhZGVyVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbk9wZW5NZW51KTtcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgcG9wdXBNYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1sb2cgW25hbWU9bWFpbF1cIik7XG4gIHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1sb2cgZm9ybVwiKTtcbiAgdmFyIHN0b3JhZ2VNYWlsID0gXCJcIjtcbiAgdmFyIGlzU3RvcmFnZVN1cHBvcnQgPSBcInRydWVcIjtcbiAgdmFyIGh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKTtcbiAgdmFyIHBvcHVwTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWxvZ1wiKTtcbiAgdmFyIHBvcHVwQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtYWRkdG9jYXJ0XCIpO1xuICB2YXIgcG9wdXBDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtY2xvc2VcIik7XG4gIHZhciBwb3B1cE9wZW5Mb2dCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYWdlLWhlYWRlcl9fbG9nXCIpO1xuICB2YXIgcG9wdXBPcGVuQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLS1qcy1jYXJkXCIpO1xuICB2YXIgS0VZX0VTQ0FQRSA9IFwiRXNjYXBlXCI7XG5cbiAgZnVuY3Rpb24gaXNFc2NQcmVzcyAoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IEtFWV9FU0NBUEUpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2xvc2VQb3B1cCgpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzZXRTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICBzdG9yYWdlTWFpbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3RvcmFnZU1haWxcIik7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGlzU3RvcmFnZVN1cHBvcnQgPSBcImZhbHNlXCI7XG4gICAgfVxuXG4gICAgaWYgKHN0b3JhZ2VNYWlsKSB7XG4gICAgICBwb3B1cE1haWwudmFsdWUgPSBzdG9yYWdlTWFpbDtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcG9wdXBNYWlsLmZvY3VzKCk7XG4gICAgICB9LCAwKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwb3B1cE1haWwuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfTtcblxuICBpZiAoZm9ybSkge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChwb3B1cE1haWwudmFsdWUpIHtcbiAgICAgICAgaWYgKGlzU3RvcmFnZVN1cHBvcnQpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInN0b3JhZ2VNYWlsXCIsIHBvcHVwTWFpbC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlUG9wdXAgKCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2R5LWJsYWNrXCIpO1xuICAgIGxldCBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcHVwLWxvZywgLnBvcHVwLWFkZHRvY2FydFwiKTtcbiAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIGh0bWwuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcblxuICAgIGlmIChwb3B1cExvZ2luIHx8IHBvcHVwQ2FyZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3B1cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9wdXBzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cC1zaG93XCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlUG9wdXApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9wdXBDbG9zZS5sZW5ndGg7IGkrKykge1xuICAgICAgcG9wdXBDbG9zZVtpXS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VQb3B1cCk7XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGlzRXNjUHJlc3MpO1xuICB9XG5cbiAgZnVuY3Rpb24gb3BlblBvcHVwIChwb3B1cCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IFwiYm9keS1ibGFja1wiO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICBpZiAocG9wdXApIHtcbiAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cC1zaG93XCIpO1xuICAgIH1cblxuICAgIGlmIChwb3B1cE1haWwpIHtcbiAgICAgIHNldFN0b3JhZ2UoKTtcbiAgICB9XG5cbiAgICBodG1sLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlUG9wdXApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9wdXBDbG9zZS5sZW5ndGg7IGkrKykge1xuICAgICAgcG9wdXBDbG9zZVtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VQb3B1cCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGlzRXNjUHJlc3MpO1xuICB9XG5cbiAgdmFyIG9wZW5Qb3B1cExvZ2luID0gZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG9wZW5Qb3B1cChwb3B1cExvZ2luKTtcbiAgfVxuXG4gIGlmIChwb3B1cE9wZW5Mb2dCdXR0b25zKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3B1cE9wZW5Mb2dCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwb3B1cE9wZW5Mb2dCdXR0b25zW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuUG9wdXBMb2dpbik7XG4gICAgICBwb3B1cE9wZW5Mb2dCdXR0b25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuUG9wdXBMb2dpbik7XG4gICAgfVxuICB9XG5cbiAgdmFyIG9wZW5Qb3B1cENhcmQgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgb3BlblBvcHVwKHBvcHVwQ2FyZCk7XG4gIH1cblxuICBpZiAocG9wdXBPcGVuQ2FyZEJ1dHRvbikge1xuICAgIHBvcHVwT3BlbkNhcmRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cENhcmQpO1xuICAgIHBvcHVwT3BlbkNhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qb3B1cENhcmQpO1xuICB9XG5cbn0pKCk7XG4iXX0=
