const pathImg =
  "https://raw.githubusercontent.com/annashrul/img-personal/main/";

const imgWeb = `${pathImg}web/`;
const imgMobile = `${pathImg}mobile/`;

const CACHE_NAME = "cache-v2";

const urlsToCache = [
  "./index.html", // HTML
  "./css/reset.css", // CSS
  "./css/bootstrap-grid.min.css", // CSS
  "./css/animations.css", // CSS
  "./css/perfect-scrollbar.css", // CSS
  "./css/owl.carousel.css", // CSS
  "./css/magnific-popup.css", // CSS
  "./css/main.css", // CSS
  "./js/modernizr.custom.js", // JS
  "./js/animating.js", // JS
  "./js/imagesloaded.pkgd.min.js", // JS
  "./js/perfect-scrollbar.min.js", // JS
  "./js/jquery.shuffle.min.js", // JS "./js/animating.js", // JS
  "./js/masonry.pkgd.min.js", // JS
  "./js/owl.carousel.min.js", // JS
  "./js/jquery.magnific-popup.min.js", // JS
  "./js/validator.js", // JS
  "./js/main.js", // JS
  `${pathImg}favicon.ico`,
  `${imgWeb}me.PNG`,
  `${imgWeb}nams.png`,
  `${imgWeb}capex.png`,
  `${imgWeb}hasha-medika-fe.png`,
  `${imgWeb}hasha-medika-be.png`,
  `${imgWeb}carbon-footprint.png`,
  `${imgWeb}sso-portal.PNG`,
  `${imgWeb}sso-login.PNG`,
  `${imgWeb}erp-sales.png`,
  `${imgWeb}erp-logistic.png`,
  `${imgWeb}erp-marketing.png`,
  `${imgWeb}tomas.png`,
  `${imgWeb}kopkar.png`,
  `${imgWeb}12.png`,
  `${imgWeb}pesanku.PNG`,
  `${imgWeb}tripisia.png`,
  `${imgWeb}momis.png`,
  `${imgWeb}3.png`,
  `${imgWeb}4.png`,
  `${imgWeb}nkey-generator.jpeg`,
  `${imgWeb}nshop.jpeg`,
  `${imgWeb}1.png`,
  `${imgWeb}2.png`,
  `${imgWeb}8.png`,
  `${imgWeb}11.png`,
  `${imgWeb}technopark.png`,
  `${imgWeb}6.png`,
  `${imgWeb}7.png`,
  `${imgWeb}kolabiz-landing.png`,
  `${imgWeb}kolabiz-fo.png`,
  `${imgWeb}13.png`,
  `${imgWeb}pis-bo.PNG`,
  `${imgWeb}pis-fo.PNG`,
  `${imgWeb}9.png`,
  `${imgWeb}10.png`,
  `${imgWeb}14.png`,
  `${imgWeb}sangqu.jpeg`,
  `${imgMobile}1.jpeg`,
  `${imgMobile}2.jpeg`,
  `${imgMobile}4.jpeg`,
  `${imgMobile}5.jpeg`,
  `${imgMobile}6.jpeg`,
  `${imgMobile}7.jpeg`,
  `${imgMobile}8.jpeg`,
  `${imgMobile}9.jpeg`,
  `${imgMobile}10.jpeg`,
  `${imgMobile}11.jpeg`,
  `${imgMobile}13.jpeg`,
  `${imgMobile}14.png`,
  `${imgMobile}15.png`,
  `${imgMobile}16.png`,
  `${imgMobile}17.png`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
