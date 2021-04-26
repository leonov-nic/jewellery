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
