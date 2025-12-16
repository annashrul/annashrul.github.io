const pathImg = "./img/";

const imgWeb = `${pathImg}web/`;
const imgMobile = `${pathImg}mobile/`;

const CACHE_NAME = "cache-v6";

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
  `${pathImg}me.webp`,
  `${imgWeb}1.webp`,
  `${imgWeb}2.webp`,
  `${imgWeb}3.webp`,
  `${imgWeb}4.webp`,
  `${imgWeb}5.webp`,
  `${imgWeb}6.webp`,
  `${imgWeb}7.webp`,
  `${imgWeb}8.webp`,
  `${imgWeb}9.webp`,
  `${imgWeb}10.webp`,
  `${imgWeb}11.webp`,
  `${imgWeb}12.webp`,
  `${imgWeb}13.webp`,
  `${imgWeb}14.webp`,
  `${imgWeb}amalku.webp`,
  `${imgWeb}capex.webp`,
  `${imgWeb}carbon-footprint.webp`,
  `${imgWeb}erp-logistic.webp`,
  `${imgWeb}erp-marketing.webp`,
  `${imgWeb}erp-sales.webp`,
  `${imgWeb}hasha-medika-be.webp`,
  `${imgWeb}hasha-medika-fe.webp`,
  `${imgWeb}ikopin-dashboard.webp`,
  `${imgWeb}ikopin-login.webp`,
  `${imgWeb}kolabiz-bo.webp`,
  `${imgWeb}kolabiz-fo.webp`,
  `${imgWeb}kolabiz-landing.webp`,
  `${imgWeb}kopkar.webp`,
  `${imgWeb}mlm.webp`,
  `${imgWeb}momis.webp`,
  `${imgWeb}nams.webp`,
  `${imgWeb}pesanku.webp`,
  `${imgWeb}pis-bo.webp`,
  `${imgWeb}pis-fo.webp`,
  `${imgWeb}pos-ekan.webp`,
  `${imgWeb}resto-ekan.webp`,
  `${imgWeb}sangkanjaya-login.webp`,
  `${imgWeb}sangqu.webp`,
  `${imgWeb}siakadEkan.webp`,
  `${imgWeb}sso-login.webp`,
  `${imgWeb}sso-portal.webp`,
  `${imgWeb}technopark.webp`,
  `${imgWeb}tokoEkan.webp`,
  `${imgWeb}tokped.webp`,
  `${imgWeb}tomas.webp`,
  `${imgWeb}travelEkan.webp`,
  `${imgWeb}tripisia.webp`,
  `${imgWeb}neema.webp`,
  `${imgWeb}presensy.webp`,

  `${imgMobile}1.webp`,
  `${imgMobile}2.webp`,
  `${imgMobile}4.webp`,
  `${imgMobile}5.webp`,
  `${imgMobile}6.webp`,
  `${imgMobile}7.webp`,
  `${imgMobile}8.webp`,
  `${imgMobile}9.webp`,
  `${imgMobile}10.webp`,
  `${imgMobile}11.webp`,
  `${imgMobile}13.webp`,
  `${imgMobile}14.webp`,
  `${imgMobile}15.webp`,
  `${imgMobile}16.webp`,
  `${imgMobile}17.webp`,
  `${imgMobile}nkey-generator.webp`,
  `${imgMobile}nshop.webp`,
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

  const url = new URL(event.request.url);
  if (url.pathname === "/sitemap.xml" || url.pathname === "/robots.txt") {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
    return;
  }

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
