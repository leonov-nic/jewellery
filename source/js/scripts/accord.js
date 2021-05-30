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
