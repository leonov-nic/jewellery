'use strict';

(function () {
  var KEY_ESCAPE = "Escape";
  var KEY_ENTER = "Enter";
  var html = document.querySelector("html");
  var pageHeader = document.querySelector('.page-header');
  var headerToggle = document.querySelector('.page-header__toggle');
  var navigation = document.querySelector('.page-header__nav');
  var headerForm = pageHeader.querySelector('form');
  var popupLog = document.querySelector(".popup-log");
  var popupClose = popupLog.querySelector(".popup__close");
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

  if (catalog && filterOpen && filterClose) {
    function closeFilter() {
      catalog.classList.remove('active-filter');
      filterClose.removeEventListener("click", closeFilter);
    }

    function openFilter() {
      catalog.classList.add('active-filter');
      filterClose.addEventListener("click", closeFilter);
    }

    filterOpen.addEventListener("click", openFilter);
  }


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


  for(var i = 0; i <= popupOpen.length; i++) {
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
  }

  popupOpenCard.removeEventListener("click", openPopupCard);
  popupOpenCard.addEventListener("click", openPopupCard);
}




  $(document).ready(function() {

    var openItems = function () {
      $(".faq__item").children('p').slideUp(200).removeClass('faq__item--opened');
      $(".faq__item").removeClass('faq__item--opened');
      $(".faq__item").addClass('faq__item--closed');

      $(this).children('p').slideDown(200).removeClass('faq__item--closed');
      $(this).removeClass('faq__item--closed');
      $(this).addClass('faq__item--opened');
    }

    var openFiltertField = function () {
      $("fieldset").children('.catalog__fields-box').slideUp(200).removeClass('catalog__js-opened');
      $("fieldset").removeClass('catalog__js-opened');
      $("fieldset").addClass('catalog__js-closed');

      $(this).next('.catalog__fields-box').slideDown(200).removeClass('catalog__js-closed');
      $(this).parents('fieldset').removeClass('catalog__js-closed');
      $(this).parents('fieldset').addClass('catalog__js-opened');
    }

    $(".faq__item").on("click", openItems);
    $("fieldset h3").on("click", openFiltertField);

  });



  var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 4,
    loopFillGroupWithBlank: true,
    // centeredSlides: true,
    breakpointsInverse: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerView: 2,
        slidesPerGroup: 2,

        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          renderFraction: function (currentClass, totalClass) {
            return '<span className="' + currentClass + '"></span>' +
            ' of ' +
            '<span className="' + totalClass + '"></span>';
          }
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
