"use strict";

(function () {
  var swiperContainer = document.querySelector(".swiper-container");

  // $(document).ready(function() {

  //   var openItems = function () {
  //     $(".faq__item").children('p').slideUp(200).removeClass('faq__item--opened');
  //     $(".faq__item").removeClass('faq__item--opened');
  //     $(".faq__item").addClass('faq__item--closed');

  //     $(this).children('p').slideDown(200).removeClass('faq__item--closed');
  //     $(this).removeClass('faq__item--closed');
  //     $(this).addClass('faq__item--opened');
  //   }

  //   $(".faq__item").on("click", openItems);

  // });

  if (swiperContainer) {

    var swiper = new Swiper(".swiper-container", {
      spaceBetween: 30,
      slidesPerView: 4,
      slidesPerGroup: 4,
      loopFillGroupWithBlank: true,
      breakpointsInverse: true,
      breakpoints: {
        320: {
          spaceBetween: 30,
          slidesPerView: 2,
          slidesPerGroup: 2,

          pagination: {
            el: ".swiper-pagination",
            type: "custom",
            renderCustom: function (swiper, current, total) {
              return (current) + " of " + (total);
            }
          },
        },
        768: {
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
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      navigation: {
        nextEl: ".swiper-button-nex",
        prevEl: ".swiper-button-pre",
      },
    });

  }

})();
