const pathImg = "./img/";

const imgWeb = `${pathImg}web/`;
const imgMobile = `${pathImg}mobile/`;

const CACHE_NAME = "cache-v4";

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
  `${pathImg}logo.jpg`,
  `${pathImg}me.PNG`,
  `${imgWeb}1.png`,
  `${imgWeb}2.png`,
  `${imgWeb}3.png`,
  `${imgWeb}4.png`,
  `${imgWeb}5.png`,
  `${imgWeb}6.png`,
  `${imgWeb}7.png`,
  `${imgWeb}8.png`,
  `${imgWeb}9.png`,
  `${imgWeb}10.png`,
  `${imgWeb}11.png`,
  `${imgWeb}12.png`,
  `${imgWeb}13.png`,
  `${imgWeb}14.png`,
  `${imgWeb}amalku.png`,
  `${imgWeb}capex.png`,
  `${imgWeb}carbon-footprint.png`,
  `${imgWeb}erp-logistic.png`,
  `${imgWeb}erp-marketing.png`,
  `${imgWeb}erp-sales.png`,
  `${imgWeb}hasha-medika-be.png`,
  `${imgWeb}hasha-medika-fe.png`,
  `${imgWeb}ikopin-dashboard.png`,
  `${imgWeb}ikopin-login.PNG`,
  `${imgWeb}kolabiz-bo.png`,
  `${imgWeb}kolabiz-fo.png`,
  `${imgWeb}kolabiz-landing.png`,
  `${imgWeb}kopkar.png`,
  `${imgWeb}mlm.PNG`,
  `${imgWeb}momis.png`,
  `${imgWeb}nams.png`,
  `${imgWeb}pesanku.PNG`,
  `${imgWeb}pis-bo.PNG`,
  `${imgWeb}pis-fo.PNG`,
  `${imgWeb}pos-ekan.png`,
  `${imgWeb}resto-ekan.png`,
  `${imgWeb}sangkanjaya-login.png`,
  `${imgWeb}sangqu.jpeg`,
  `${imgWeb}siakadEkan.png`,
  `${imgWeb}sso-login.PNG`,
  `${imgWeb}sso-portal.PNG`,
  `${imgWeb}technopark.png`,
  `${imgWeb}tokoEkan.png`,
  `${imgWeb}tokped.png`,
  `${imgWeb}tomas.png`,
  `${imgWeb}travelEkan.png`,
  `${imgWeb}tripisia.png`,
  `${imgWeb}neema.png`,
  `${imgWeb}presensy.png`,

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
  `${imgMobile}nkey-generator.jpeg`,
  `${imgMobile}nshop.jpeg`,
];

// Instalasi service worker: cache semua file awal
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // aktifkan SW segera tanpa menunggu reload
});

// Aktivasi service worker: hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
  );
  self.clients.claim(); // aktifkan kontrol untuk semua tab
});

// Fetch: cache-first, jika tidak ada baru ambil dari network dan cache
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const isHTML =
    event.request.mode === "navigate" ||
    event.request.destination === "document";
  if (isHTML) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put("./index.html", clone);
          });
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  const isStatic = ["script", "style", "image", "font"].includes(
    event.request.destination
  );
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((network) => {
            if (
              network &&
              network.status === 200 &&
              event.request.url.startsWith("http")
            ) {
              cache.put(event.request, network.clone());
            }
            return network;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
});
