'use strict';

(function () {
  var KEY_ESCAPE = "Escape";
  var KEY_ENTER = "Enter";
  var html = document.querySelector("html");
  var pageHeader = document.querySelector('.page-header');
  var headerToggle = document.querySelector('.page-header__toggle');
  var navigation = document.querySelector('.page-header__nav');
  var headerForm = pageHeader.querySelector('form');

  var popup = document.querySelector(".popup-log");
  var popupClose = popup.querySelector(".popup__close");
  var popupMail = popup.querySelector("[name=mail]");
  var popupOpen = document.querySelectorAll("#log");
  var form = popup.querySelector("form");
  var storageMail = "";
  var isStorageSupport = "true";

  pageHeader.classList.remove('page-header--nojs');

  function openCloseMenu(header, nav) {
    if (header.classList.contains('page-header--closed')) {
      header.classList.remove('page-header--closed');
      header.classList.add('page-header--opened');
      nav.classList.add('page-header__menu-show');
      headerForm.classList.add('page-header__menu-search');

    } else {
      header.classList.add('page-header--closed');
      header.classList.remove('page-header--opened');
      nav.classList.remove('page-header__menu-show');
      headerForm.classList.remove('page-header__menu-search');
    }
  }

  function onOpenMenu() {
    openCloseMenu(pageHeader, navigation);
  }

  headerToggle.addEventListener('click', onOpenMenu);

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
        popup.querySelector("[name=mail]").focus();
      }, 0);

    } else {
      popupMail.focus();
    }
  }

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

  var isEscPress = function (evt) {
    if (evt.key === KEY_ESCAPE) {
      evt.preventDefault();
      closePopup();
    }
  };

  var isEnterPress = function (evt) {
    if (evt.key === KEY_ENTER) {
      closePopup();
    }
  };

  var openPopup = function (evt) {
    evt.preventDefault();
    setStorage();
    var element = document.createElement("div");
    element.className = "body-white";
    document.body.appendChild(element);
    if (popup) {
      popup.classList.add("popup-show");
    }
    html.style.overflow = "hidden";

    element.addEventListener("click", closePopup);
    popupClose.addEventListener("click", closePopup);
    popupClose.addEventListener("keydown", isEnterPress);
    document.addEventListener("keydown", isEscPress);
  };

  var closePopup = function () {
    var element = document.querySelector(".body-white");
    element.remove();
    if (popup) {
      popup.classList.remove("popup-show");
    }
    html.style.overflow = "auto";

    element.addEventListener("click", closePopup);
    popupClose.removeEventListener("keydown", isEnterPress);
    popupClose.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", isEscPress);
  };

  for(var i = 0; i <= popupOpen.length; i++) {
    if (popupOpen[i]) {
      popupOpen[i].removeEventListener("click", openPopup);
      popupOpen[i].addEventListener("click", openPopup);
    }
  }



  var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 4,
    loopFillGroupWithBlank: true,
    // centeredSlides: true,

    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          type: 'fraction'
        },

        renderCustom: function (swiper, current, total) {
          return current + ' 55 ' + total;
        },

      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.swiper-button-nex',
      prevEl: '.swiper-button-pre',
    },
  });


})();

// swiper.update();
