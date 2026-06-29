let I18N = {};
async function loadI18N() {
  const entries = await Promise.all(
    ["en", "id"].map(async (code) => {
      const res = await fetch("./" + code + ".json");
      if (!res.ok) throw new Error("Failed to load " + code + ".json");
      return [code, await res.json()];
    }),
  );
  I18N = Object.fromEntries(entries);
}
const CV = {
  en: "./file/cv-en.pdf",
  id: "./file/cv-id.pdf",
};
let lang = (navigator.language || "en").toLowerCase().startsWith("id")
  ? "id"
  : "en";
function applyLang() {
  const d = I18N[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach((el) => {
    const v = d[el.dataset.t];
    if (v != null) el.innerHTML = v;
  });
  ["cvFloat", "cvContactBtn", "cvMobile"].forEach((id) => {
    const a = document.getElementById(id);
    if (a) {
      a.href = CV[lang];
      a.setAttribute(
        "download",
        "Annashrul-Yusuf-CV-" + lang.toUpperCase() + ".pdf",
      );
    }
  });
  document
    .querySelectorAll(".langtog button")
    .forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  if (window.lucide) lucide.createIcons();
}
document.querySelectorAll(".langtog button").forEach((b) =>
  b.addEventListener("click", () => {
    lang = b.dataset.lang;
    applyLang();
    paintRailLabels();
    renderGrid();
    if (lbOpen) render(0);
  }),
);
const PATH_IMG = "./img/",
  W = PATH_IMG + "web/",
  M = PATH_IMG + "mobile/";
const ITEMS = [
  {
    id: "chat-web",
    c: "web",
    t: "Chat Web Realtime",
    l: "https://wachat-web-1018591685581.asia-southeast2.run.app/",
    d: {
      en: "Realtime web chat with instant messaging, deployed on Google Cloud Run.",
      id: "Chat web realtime dengan pesan instan, di-deploy di Google Cloud Run.",
    },
    imgs: [W + "chat-web-1.webp", W + "chat-web-2.webp", W + "chat-web-3.webp"],
  },
  {
    id: "chat-mobile",
    c: "mobile",
    t: "Chat Web Realtime",
    l: "",
    d: {
      en: "Mobile companion for the realtime chat, built for fast on-the-go messaging.",
      id: "Versi mobile buat chat realtime, dibuat biar enak buat chat sambil jalan.",
    },
    imgs: [M + "chat-web-1.webp", M + "chat-web-2.webp", M + "chat-web-3.webp"],
  },
  {
    id: "wa-service",
    c: "web",
    t: "WA Service — WhatsApp Gateway",
    l: "",
    d: {
      en: "WhatsApp service platform: send OTP, run a chatbot, and AI-integrated auto-replies, all from one gateway.",
      id: "Platform layanan WhatsApp: kirim OTP, chatbot, dan balas otomatis yang udah terintegrasi sama AI, semua dari satu gateway.",
    },
    imgs: [
      W + "wa-service-1.webp",
      W + "wa-service-2.webp",
      W + "wa-service-3.webp",
    ],
  },
  {
    id: "mondelez-inventory",
    c: "web",
    t: "Mondelez Inventory",
    l: "",
    d: {
      en: "Inventory search engine you can query by image, voice or text, with live stock monitoring on top.",
      id: "Search engine inventory yang bisa dicari pakai gambar, suara, atau teks, plus monitoring stok secara real time.",
    },
    imgs: [W + "mondelez-inventory.webp"],
  },
  {
    id: "menopos-web",
    c: "web",
    t: "Meno POS — Retail, Bengkel, Resto, Cafe",
    l: "https://menopos.vercel.app",
    d: {
      en: "All-in-one POS for retail, workshops, restaurants and cafes with a cashier flow.",
      id: "POS serbaguna buat retail, bengkel, resto, dan kafe lengkap sama alur kasir.",
    },
    imgs: [
      W + "menopos-landing.webp",
      W + "menopos-dashboard-1.webp",
      W + "menopos-dashboard-2.webp",
      W + "menopos-kasir-1.webp",
      W + "menopos-kasir-2.webp",
      W + "menopos-kasir-3.webp",
    ],
  },
  {
    id: "menopos-mobile",
    c: "mobilr",
    t: "Meno POS — Retail, Bengkel, Resto, Cafe",
    l: "",
    d: {
      en: "All-in-one POS for retail, workshops, restaurants and cafes with a cashier flow.",
      id: "POS serbaguna buat retail, bengkel, resto, dan kafe lengkap sama alur kasir.",
    },
    imgs: [
      M + "menopos-1.webp",
      M + "menopos-2.webp",
      M + "menopos-3.webp",
      M + "menopos-4.webp",
      M + "menopos-5.webp",
      M + "menopos-6.webp",
    ],
  },
  {
    id: "neema",
    c: "web",
    t: "Aplikasi Pelayanan Neema",
    l: "https://neema.asia",
    d: {
      en: "Service management platform handling customer requests and operations.",
      id: "Platform manajemen pelayanan buat nanganin permintaan pelanggan dan operasional.",
    },
    imgs: [W + "neema.webp"],
  },
  {
    id: "presensy",
    c: "web",
    t: "HC Portal Presensy",
    l: "https://admin.development.presensy.site/",
    d: {
      en: "HR portal for attendance, employee data, and workforce administration.",
      id: "Portal HR buat presensi, data karyawan, dan administrasi SDM.",
    },
    imgs: [W + "presensy.webp"],
  },
  {
    id: "tokped",
    c: "web",
    t: "E-Commerce Tokopedia Clone",
    l: "https://tokpedclone.vercel.app",
    d: {
      en: "Marketplace clone exploring product listing, cart and checkout flows.",
      id: "Clone marketplace buat ngulik listing produk, keranjang, dan checkout.",
    },
    imgs: [W + "tokped.webp"],
  },
  {
    id: "resto-ekan",
    c: "web",
    t: "Restaurant Ekan",
    l: "https://resto-ekan.vercel.app",
    d: {
      en: "Restaurant ordering and menu management web app.",
      id: "Aplikasi web buat pesen makanan dan ngatur menu restoran.",
    },
    imgs: [W + "resto-ekan.webp"],
  },
  {
    id: "pos-ekan",
    c: "web",
    t: "Point of Sales Ekan POS",
    l: "https://pos-ekan.vercel.app",
    d: {
      en: "Point of sales system with transactions and stock tracking.",
      id: "Sistem point of sales buat transaksi dan pantau stok.",
    },
    imgs: [W + "pos-ekan.webp"],
  },
  {
    id: "amalku",
    c: "web",
    t: "Galang Donasi Amalku",
    l: "https://amalku.vercel.app",
    d: {
      en: "Crowdfunding platform for charity campaigns and donations.",
      id: "Platform galang dana buat kampanye amal dan donasi.",
    },
    imgs: [W + "amalku.webp"],
  },
  {
    id: "siakad",
    c: "web",
    t: "Sistem Informasi Akademik",
    l: "https://siakad-ekan.vercel.app",
    d: {
      en: "Academic information system for students, courses and grades.",
      id: "Sistem informasi akademik buat mahasiswa, mata kuliah, dan nilai.",
    },
    imgs: [W + "siakadEkan.webp"],
  },
  {
    id: "mlm-matahari",
    c: "web",
    t: "Multi Level Marketing Matahari",
    l: "https://mlm-matahari.vercel.app",
    d: {
      en: "MLM platform with member networks, commissions and bonuses.",
      id: "Platform MLM dengan jaringan member, komisi, dan bonus.",
    },
    imgs: [W + "mlm.webp"],
  },
  {
    id: "toko-ekan",
    c: "web",
    t: "E-Commerce Toko Ekan",
    l: "https://toko-ekan.vercel.app",
    d: {
      en: "Online store with catalog, cart and order management.",
      id: "Toko online sama katalog, keranjang, dan manajemen pesanan.",
    },
    imgs: [W + "tokoEkan.webp"],
  },
  {
    id: "travel-ekan",
    c: "web",
    t: "Wisata Travel Ekan",
    l: "https://travel-ekan.vercel.app",
    d: {
      en: "Travel and tour booking site with packages and itineraries.",
      id: "Situs pesen wisata dan tur sama paket dan itinerary.",
    },
    imgs: [W + "travelEkan.webp"],
  },
  {
    id: "ikopin",
    c: "web",
    t: "Ikopin University Dashboard",
    l: "",
    d: {
      en: "University admin dashboard for managing campus data.",
      id: "Dashboard admin kampus buat ngelola data universitas.",
    },
    imgs: [W + "ikopin-dashboard.webp"],
  },
  {
    id: "sangkanjaya",
    c: "web",
    t: "Sangkan Jaya Portal",
    l: "",
    d: {
      en: "Company portal with secure login and internal tools.",
      id: "Portal perusahaan sama login aman dan tools internal.",
    },
    imgs: [W + "sangkanjaya-login.webp"],
  },
  {
    id: "nams",
    c: "web",
    t: "Nabati Approval Management System",
    l: "https://nams-dev.epc.nabatisnack.co.id",
    d: {
      en: "Enterprise approval workflow system for Nabati's internal processes.",
      id: "Sistem alur persetujuan enterprise buat proses internal Nabati.",
    },
    imgs: [W + "nams.webp"],
  },
  {
    id: "capex",
    c: "web",
    t: "Nabati Asset Capex Management",
    l: "https://capex-dev.epc.nabatisnack.co.id/capex/login",
    d: {
      en: "Capital expenditure and asset management platform.",
      id: "Platform manajemen belanja modal (capex) dan aset.",
    },
    imgs: [W + "capex.webp"],
  },
  {
    id: "hasha",
    c: "web",
    t: "Hasha Medika",
    l: "https://hashamedika.com/",
    d: {
      en: "Healthcare platform with patient-facing site and admin backend.",
      id: "Platform layanan kesehatan sama situs buat pasien dan backend admin.",
    },
    imgs: [W + "hasha-medika-fe.webp", W + "hasha-medika-be.webp"],
  },
  {
    id: "carbon",
    c: "web",
    t: "Carbon Footprint Toyota TMMIN",
    l: "http://tmmin-carbon-footprint.tech/",
    d: {
      en: "Carbon footprint tracking dashboard for Toyota TMMIN.",
      id: "Dashboard buat pantau jejak karbon Toyota TMMIN.",
    },
    imgs: [W + "carbon-footprint.webp"],
  },
  {
    id: "sso-nabati",
    c: "web",
    t: "SSO Kaldu Sari Nabati",
    l: "https://portal.epc.nabatisnack.co.id/",
    d: {
      en: "Single sign-on portal unifying access across Nabati's apps.",
      id: "Portal single sign-on yang nyatuin akses ke semua aplikasi Nabati.",
    },
    imgs: [W + "sso-portal.webp", W + "sso-login.webp"],
  },
  {
    id: "edot",
    c: "web",
    t: "EDOT Distribution ERP",
    l: "https://sso-d.edot.id/oidc/_tldr/iuwh87Lu9p8pU-P6lAoM0",
    d: {
      en: "Distribution ERP covering sales, logistics and marketing modules.",
      id: "ERP distribusi yang nyakup modul penjualan, logistik, dan marketing.",
    },
    imgs: [
      W + "erp-sales.webp",
      W + "erp-logistic.webp",
      W + "erp-marketing.webp",
    ],
  },
  {
    id: "tomaas",
    c: "web",
    t: "TOMAAS Toyota Management",
    l: "https://tomas-testing.online/auth/login",
    d: {
      en: "Management system built for Toyota operational workflows.",
      id: "Sistem manajemen buat alur operasional Toyota.",
    },
    imgs: [W + "tomas.webp"],
  },
  {
    id: "kopkar",
    c: "web",
    t: "Koperasi Karyawan Toyota TMMIN",
    l: "https://kopkar.tmmintam.com/",
    d: {
      en: "Employee cooperative platform for savings, loans and members.",
      id: "Platform koperasi karyawan buat simpan pinjam dan keanggotaan.",
    },
    imgs: [W + "kopkar.webp"],
  },
  {
    id: "evie",
    c: "mobile",
    t: "Aplikasi Mobile Ust. Evie Effendi",
    l: "",
    d: {
      en: "Mobile app for the public figure with content and updates.",
      id: "Aplikasi mobile tokoh publik isinya konten dan update.",
    },
    imgs: [M + "17.webp"],
  },
  {
    id: "aman-mobile",
    c: "mobile",
    t: "Aman Palestine Mobile App",
    l: "",
    d: {
      en: "Mobile donation app for Palestine humanitarian causes.",
      id: "Aplikasi donasi mobile buat misi kemanusiaan Palestina.",
    },
    imgs: [M + "14.webp"],
  },
  {
    id: "aman-web",
    c: "web",
    t: "Aman Palestine Web Donation",
    l: "",
    d: {
      en: "Web donation portal for humanitarian fundraising.",
      id: "Portal donasi web buat penggalangan dana kemanusiaan.",
    },
    imgs: [W + "12.webp"],
  },
  {
    id: "pesanku",
    c: "web",
    t: "Pesanku WhatsApp Automation Bot",
    l: "https://dev.pesanku.id/",
    d: {
      en: "WhatsApp automation platform for broadcasts and auto-replies.",
      id: "Platform otomasi WhatsApp buat broadcast dan balas otomatis.",
    },
    imgs: [W + "pesanku.webp"],
  },
  {
    id: "tripisia",
    c: "web",
    t: "Backoffice KAI Tripisia Admin",
    l: "https://tripisia.id/admin/",
    d: {
      en: "Admin backoffice for KAI train trip management.",
      id: "Backoffice admin buat manajemen perjalanan kereta KAI.",
    },
    imgs: [W + "tripisia.webp"],
  },
  {
    id: "momis",
    c: "web",
    t: "Momis Bakery Order Portal",
    l: "https://momisbakery.id/pages",
    d: {
      en: "Online ordering portal for a bakery business.",
      id: "Portal pesen online buat bisnis bakery.",
    },
    imgs: [W + "momis.webp"],
  },
  {
    id: "indokids-mobile",
    c: "mobile",
    t: "Indokids Member E-Commerce Mobile",
    l: "",
    d: {
      en: "Mobile shopping app for Indokids members.",
      id: "Aplikasi belanja mobile buat member Indokids.",
    },
    imgs: [M + "15.webp"],
  },
  {
    id: "indokids-web",
    c: "web",
    t: "Indokids E-Commerce",
    l: "https://www.indokids.co.id/",
    d: {
      en: "E-commerce site with member storefront and admin dashboard.",
      id: "Situs e-commerce sama storefront member dan dashboard admin.",
    },
    imgs: [W + "3.webp", W + "4.webp"],
  },
  {
    id: "nkey",
    c: "mobile",
    t: "Netindo N-KEY Security Generator",
    l: "",
    d: {
      en: "Security token generator app for Netindo systems.",
      id: "Aplikasi generator token keamanan buat sistem Netindo.",
    },
    imgs: [M + "nkey-generator.webp"],
  },
  {
    id: "nshop",
    c: "mobile",
    t: "Netindo N-Shop Mobile App",
    l: "",
    d: {
      en: "Mobile shopping app within the Netindo ecosystem.",
      id: "Aplikasi belanja mobile di ekosistem Netindo.",
    },
    imgs: [M + "nshop.webp"],
  },
  {
    id: "netindo-pos",
    c: "mobile",
    t: "Netindo POS Mobile",
    l: "",
    d: {
      en: "Mobile point of sales across multiple product iterations.",
      id: "Point of sales mobile dengan beberapa iterasi produk.",
    },
    imgs: [M + "1.webp", M + "5.webp", M + "2.webp"],
  },
  {
    id: "netindo-landing",
    c: "web",
    t: "PT Netindo Corporate Landing Page",
    l: "http://ptnetindo.com/",
    d: {
      en: "Corporate landing page and solutions portal for PT Netindo.",
      id: "Landing page korporat dan portal solusi buat PT Netindo.",
    },
    imgs: [W + "1.webp", W + "2.webp"],
  },
  {
    id: "npos-web",
    c: "web",
    t: "Netindo N-POS Web Terminal",
    l: "http://dev-npos.ptnetindo.com/",
    d: {
      en: "Web-based POS terminal for the N-POS ecosystem.",
      id: "Terminal POS berbasis web buat ekosistem N-POS.",
    },
    imgs: [W + "8.webp"],
  },
  {
    id: "smkn14",
    c: "web",
    t: "SMKN 14 Bandung Official Portal",
    l: "https://smkn14bdg.sch.id/",
    d: {
      en: "Official school portal with news and information.",
      id: "Portal resmi sekolah isinya berita dan informasi.",
    },
    imgs: [W + "11.webp"],
  },
  {
    id: "technopark",
    c: "web",
    t: "Technopark SMKN 14 E-Commerce",
    l: "https://technopark.smkn14bdg.sch.id/",
    d: {
      en: "E-commerce platform for the school's technopark products.",
      id: "Platform e-commerce buat produk technopark sekolah.",
    },
    imgs: [W + "technopark.webp"],
  },
  {
    id: "tedc",
    c: "web",
    t: "Politeknik TEDC Academic System",
    l: "",
    d: {
      en: "Academic system for polytechnic administration.",
      id: "Sistem akademik buat administrasi politeknik.",
    },
    imgs: [W + "6.webp", W + "7.webp"],
  },
  {
    id: "kolabiz",
    c: "web",
    t: "Kolabiz Platform",
    l: "https://dev.kolabiz.id/",
    d: {
      en: "Business collaboration platform with a member workspace.",
      id: "Platform kolaborasi bisnis sama workspace member.",
    },
    imgs: [W + "kolabiz-landing.webp", W + "kolabiz-fo.webp"],
  },
  {
    id: "sales-mon",
    c: "mobile",
    t: "Sales Monitoring Mobile App",
    l: "",
    d: {
      en: "Mobile app for monitoring sales activity in real time.",
      id: "Aplikasi mobile buat mantau aktivitas penjualan real time.",
    },
    imgs: [M + "2.webp"],
  },
  {
    id: "franchise",
    c: "mobile",
    t: "Best Franchise Management App",
    l: "",
    d: {
      en: "Franchise management and monitoring app across versions.",
      id: "Aplikasi manajemen dan monitoring franchise lintas versi.",
    },
    imgs: [M + "4.webp", M + "8.webp", M + "13.webp"],
  },
  {
    id: "miski",
    c: "mobile",
    t: "Miski Store Mobile E-Commerce",
    l: "",
    d: {
      en: "Mobile e-commerce catalog and storefront for Miski Store.",
      id: "Katalog dan storefront e-commerce mobile buat Miski Store.",
    },
    imgs: [M + "9.webp", M + "6.webp"],
  },
  {
    id: "adscoin",
    c: "mobile",
    t: "Ads Coin Crypto & Wallet",
    l: "",
    d: {
      en: "Crypto wallet and transaction app with multiple iterations.",
      id: "Aplikasi dompet kripto dan transaksi dengan beberapa iterasi.",
    },
    imgs: [M + "7.webp", M + "10.webp", M + "11.webp"],
  },
  {
    id: "thaibah-mobile",
    c: "mobile",
    t: "Thaibah MLM Android Application",
    l: "",
    d: {
      en: "Android app for the Thaibah MLM network.",
      id: "Aplikasi Android buat jaringan MLM Thaibah.",
    },
    imgs: [M + "16.webp"],
  },
  {
    id: "thaibah-web",
    c: "web",
    t: "Thaibah Web MLM System",
    l: "",
    d: {
      en: "Web MLM system with member and commission management.",
      id: "Sistem MLM web sama manajemen member dan komisi.",
    },
    imgs: [W + "13.webp"],
  },
  {
    id: "pis",
    c: "web",
    t: "PIS Portal",
    l: "",
    d: {
      en: "Backoffice and member frontend for the PIS platform.",
      id: "Backoffice dan frontend member buat platform PIS.",
    },
    imgs: [W + "pis-bo.webp", W + "pis-fo.webp"],
  },
  {
    id: "prowara",
    c: "web",
    t: "Prowara Enterprise Portal",
    l: "",
    d: {
      en: "Enterprise portal across multiple product versions.",
      id: "Portal enterprise dengan beberapa versi produk.",
    },
    imgs: [W + "9.webp", W + "10.webp"],
  },
  {
    id: "utara",
    c: "web",
    t: "Utara Urban Space Booking System",
    l: "",
    d: {
      en: "Booking system for urban spaces and venues.",
      id: "Sistem pesen buat ruang dan venue urban.",
    },
    imgs: [W + "14.webp"],
  },
  {
    id: "sangqu",
    c: "mobile",
    t: "SangQu Mobile Application",
    l: "",
    d: {
      en: "Mobile application for the SangQu service.",
      id: "Aplikasi mobile buat layanan SangQu.",
    },
    imgs: [W + "sangqu.webp"],
  },
];

const grid = document.getElementById("grid"),
  empty = document.getElementById("empty"),
  moreSpin = document.getElementById("moreSpin"),
  moreSentinel = document.getElementById("moreSentinel");
function host(u) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch (e) {
    return "";
  }
}
function descOf(p) {
  return (p.d && (p.d[lang] || p.d.en)) || "";
}
let shown = [];
/* ===== Image cache: once a src has decoded, never refetch or re-fade it.
On re-render (filter/lang switch) cached images snap straight to visible. ===== */
const IMG_CACHE = new Set();
function card(p, idx) {
  const has = !!p.l;
  const multi = p.imgs.length > 1;
  const el = document.createElement("div");
  el.className = "card " + p.c;
  el.tabIndex = 0;
  el.dataset.idx = idx;
  el.innerHTML = `<div class="thumb"><div class="ph"><i data-lucide="${p.c === "mobile" ? "smartphone" : "monitor"}"></i></div><img loading="lazy" decoding="async" alt="${p.t}" data-src="${p.imgs[0]}"><span class="zoom"><i data-lucide="expand"></i></span><span class="cat">${p.c}</span>${multi ? `<span class="gal"><i data-lucide="images"></i>${p.imgs.length}</span>` : ""}</div><div class="meta2"><h3>${p.t}</h3><div class="desc">${descOf(p)}</div><div class="dom ${has ? "" : "soon"}">${has ? '<i data-lucide="link" style="width:11px;height:11px"></i>' + host(p.l) : lang === "id" ? "studi kasus nyusul" : "case study soon"}</div></div>`;
  el.addEventListener("click", () => openLB(idx, 0));
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLB(idx, 0);
    }
  });
  return el;
}
let curFilter = "all";

/* ===== Uniform grid + infinite scroll =====
Cards render in source order into a CSS grid with equal row heights. Batches
are appended to the existing grid as you near the bottom, so scroll position
is preserved and the page never jumps back to the top. ===== */
const BATCH = 12;
let rendered = 0,
  cardEls = [];
const workInner = document.querySelector(".pg.work .pg-inner");
function appendBatch() {
  if (rendered >= shown.length) {
    moreSpin.classList.remove("on");
    return;
  }
  const slice = shown.slice(rendered, rendered + BATCH);
  slice.forEach((p, i) => {
    const el = card(p, rendered + i);
    cardEls.push(el);
    grid.appendChild(el);
  });
  rendered += slice.length;
  if (window.lucide) lucide.createIcons();
  observeImgs();
  moreSpin.classList.toggle("on", rendered < shown.length);
}
function maybeFill() {
  if (rendered >= shown.length || !workInner) return;
  if (workInner.scrollHeight <= workInner.clientHeight + 90) {
    appendBatch();
    setTimeout(maybeFill, 150);
  }
}
function renderGrid() {
  shown = ITEMS.filter((p) => curFilter === "all" || p.c === curFilter);
  empty.hidden = shown.length > 0;
  rendered = 0;
  cardEls = [];
  grid.innerHTML = "";
  appendBatch();
  setTimeout(maybeFill, 160);
}
if (workInner) {
  workInner.addEventListener(
    "scroll",
    () => {
      if (rendered >= shown.length) return;
      if (
        workInner.scrollHeight - workInner.clientHeight - workInner.scrollTop <
        700
      )
        appendBatch();
    },
    {
      passive: true,
    },
  );
}
document.getElementById("cAll").textContent = ITEMS.length;
document.getElementById("cWeb").textContent = ITEMS.filter(
  (p) => p.c === "web",
).length;
document.getElementById("cMob").textContent = ITEMS.filter(
  (p) => p.c === "mobile",
).length;
let imgIO;
function observeImgs() {
  if (imgIO) imgIO.disconnect();
  imgIO = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const img = e.target;
        const src = img.dataset.src;
        if (!src) {
          imgIO.unobserve(img);
          return;
        }
        if (IMG_CACHE.has(src)) {
          img.src = src;
          img.classList.add("on");
          img.removeAttribute("data-src");
          imgIO.unobserve(img);
          return;
        }
        img.onload = () => {
          IMG_CACHE.add(src);
          img.classList.add("on");
          img.removeAttribute("data-src");
        };
        img.onerror = () => {
          img.remove();
        };
        img.src = src;
        imgIO.unobserve(img);
      });
    },
    {
      rootMargin: "400px",
    },
  );
  grid.querySelectorAll("img[data-src]").forEach((i) => imgIO.observe(i));
}
let rzT;
addEventListener("resize", () => {
  clearTimeout(rzT);
  rzT = setTimeout(() => {
    maybeFill();
  }, 180);
});
document.querySelectorAll(".filters button").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll(".filters button")
      .forEach((x) => x.setAttribute("aria-pressed", "false"));
    b.setAttribute("aria-pressed", "true");
    curFilter = b.dataset.f;
    if (workInner) workInner.scrollTop = 0;
    renderGrid();
  }),
);
const toast = document.getElementById("toast"),
  toastMsg = document.getElementById("toastMsg");
let toastT;
function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => toast.classList.remove("show"), 2200);
}
const lb = document.getElementById("lb"),
  lbImg = document.getElementById("lbImg"),
  lbLoad = document.getElementById("lbLoad"),
  lbTitle = document.getElementById("lbTitle"),
  lbDesc = document.getElementById("lbDesc"),
  lbPos = document.getElementById("lbPos"),
  lbCat = document.getElementById("lbCat"),
  lbVisit = document.getElementById("lbVisit"),
  lbShare = document.getElementById("lbShare"),
  lbPrev = document.getElementById("lbPrev"),
  lbNext = document.getElementById("lbNext"),
  lbThumbs = document.getElementById("lbThumbs");
let pjIdx = 0,
  imgIndex = 0,
  lbOpen = false;
function curProj() {
  return shown[pjIdx];
}
function previewURL() {
  const p = curProj();
  return (
    location.origin +
    location.pathname +
    "?project=" +
    encodeURIComponent(p.id) +
    "&img=" +
    (imgIndex + 1) +
    "#work"
  );
}
function syncPreviewURL() {
  history.replaceState(null, "", previewURL());
}
function buildThumbs() {
  const p = curProj();
  lbThumbs.innerHTML = "";
  const multi = p.imgs.length > 1;
  lbThumbs.hidden = !multi;
  if (!multi) return;
  p.imgs.forEach((src, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Image " + (i + 1));
    b.innerHTML = `<img src="${src}" alt="">`;
    b.addEventListener("click", () => {
      imgIndex = i;
      render(0);
    });
    lbThumbs.appendChild(b);
  });
}
function render(dir) {
  const p = curProj();
  const imgs = p.imgs;
  lbImg.classList.remove("on");
  lbLoad.style.display = "grid";
  lbImg.style.setProperty(
    "--enter",
    dir > 0 ? "24px" : dir < 0 ? "-24px" : "0",
  );
  const src = imgs[imgIndex];
  const im = new Image();
  im.onload = () => {
    IMG_CACHE.add(src);
    lbImg.src = im.src;
    lbImg.alt = p.t;
    lbLoad.style.display = "none";
    requestAnimationFrame(() => lbImg.classList.add("on"));
  };
  im.onerror = () => {
    lbLoad.style.display = "none";
    lbImg.removeAttribute("src");
  };
  im.src = src;
  lbTitle.textContent = p.t;
  lbDesc.textContent = descOf(p);
  lbPos.innerHTML =
    '<i data-lucide="images"></i> ' + (imgIndex + 1) + " / " + imgs.length;
  lbCat.textContent = "· " + p.c;
  if (p.l) {
    lbVisit.hidden = false;
    lbVisit.href = p.l;
  } else {
    lbVisit.hidden = true;
  }
  lbShare.classList.remove("copied");
  lbShare.querySelector(".lbl").textContent = I18N[lang].lb_share;
  [...lbThumbs.children].forEach((b, bi) =>
    b.setAttribute("aria-current", bi === imgIndex),
  );
  if (window.lucide) lucide.createIcons();
  syncPreviewURL();
}
function lbNextStep() {
  const p = curProj();
  if (imgIndex < p.imgs.length - 1) {
    imgIndex++;
    render(1);
  } else {
    pjIdx = (pjIdx + 1) % shown.length;
    imgIndex = 0;
    buildThumbs();
    render(1);
  }
}
function lbPrevStep() {
  if (imgIndex > 0) {
    imgIndex--;
    render(-1);
  } else {
    pjIdx = (pjIdx - 1 + shown.length) % shown.length;
    imgIndex = curProj().imgs.length - 1;
    buildThumbs();
    render(-1);
  }
}
function openLB(projIdx, imgI) {
  pjIdx = projIdx;
  imgIndex = imgI || 0;
  lbOpen = true;
  lb.classList.add("open");
  buildThumbs();
  render(0);
}
function closeLB() {
  lbOpen = false;
  lb.classList.remove("open");
  history.replaceState(null, "", location.pathname + "#work");
}
document.getElementById("lbClose").addEventListener("click", closeLB);
lbPrev.addEventListener("click", lbPrevStep);
lbNext.addEventListener("click", lbNextStep);
lb.addEventListener("click", (e) => {
  if (e.target === lb) closeLB();
});
lbShare.addEventListener("click", async () => {
  const p = curProj();
  const url = previewURL();
  const data = {
    title: "Annashrul Yusuf — " + p.t,
    text: descOf(p),
    url,
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
  } catch (e) {}
  try {
    await navigator.clipboard.writeText(url);
    lbShare.classList.add("copied");
    lbShare.querySelector(".lbl").textContent =
      lang === "id" ? "Tersalin" : "Copied";
    showToast(I18N[lang].share_copied);
  } catch (e) {
    showToast(url);
  }
});
let lx = 0,
  ltrack = false;
lb.addEventListener(
  "touchstart",
  (e) => {
    lx = e.touches[0].clientX;
    ltrack = true;
  },
  {
    passive: true,
  },
);
lb.addEventListener(
  "touchend",
  (e) => {
    if (!ltrack) return;
    ltrack = false;
    const dx = e.changedTouches[0].clientX - lx;
    if (Math.abs(dx) < 45) return;
    if (dx < 0) lbNextStep();
    else lbPrevStep();
  },
  {
    passive: true,
  },
);
function loadImg(el) {
  if (!el) return;
  const src = el.dataset.src;
  el.onload = () => {
    IMG_CACHE.add(src);
    el.classList.add("on");
  };
  el.onerror = () => el.remove();
  el.src = src;
}
loadImg(document.querySelector(".cover-photo img"));
loadImg(document.querySelector(".mnav-ph img"));
if (window.lucide) lucide.createIcons();
const pages = [...document.querySelectorAll(".pg")],
  total = pages.length;
const SLUGS = [
  "home",
  "about",
  "experience",
  "background",
  "skills",
  "work",
  "contact",
];
function indexFromHash() {
  const h = (location.hash || "").replace(/^#\/?/, "").toLowerCase();
  const i = SLUGS.indexOf(h);
  return i >= 0 ? i : 0;
}
let cur = indexFromHash(),
  lock = false;
pages.forEach((p, i) => {
  p.style.zIndex = total - i;
});
const edge = document.querySelector(".stack-edge");
for (let i = 0; i < total; i++) {
  const s = document.createElement("i");
  s.style.right = i * 2.4 + "px";
  edge.appendChild(s);
}
const rail = document.querySelector(".rail");
for (let i = 0; i < total; i++) {
  const b = document.createElement("button");
  b.innerHTML = `<span class="n">0${i + 1}</span><span class="bar"></span><span class="t"></span>`;
  b.addEventListener("click", () => go(i));
  rail.appendChild(b);
}
const dots = document.querySelector(".dots");
for (let i = 0; i < total; i++) {
  const b = document.createElement("button");
  b.addEventListener("click", () => go(i));
  dots.appendChild(b);
}
function paintRailLabels() {
  const ts = I18N[lang].nav_titles;
  [...rail.children].forEach((b, i) => {
    b.querySelector(".t").textContent = ts[i];
    b.setAttribute("aria-current", i === cur);
  });
}
const dkCur = document.getElementById("dkCur");
document.getElementById("dkTot").textContent = String(total).padStart(2, "0");
const dkPrev = document.getElementById("dkPrev"),
  dkNext = document.getElementById("dkNext"),
  prog = document.querySelector(".dock .prog"),
  mnav = document.querySelector(".mnav");
function syncHash() {
  if (lbOpen) return;
  const want = "#" + SLUGS[cur];
  if (location.hash !== want) {
    history.replaceState(
      null,
      "",
      cur === 0 ? location.pathname + location.search : want,
    );
  }
}
function paint() {
  pages.forEach((p, i) => {
    p.dataset.state = i < cur ? "folded" : "flat";
  });
  paintRailLabels();
  [...dots.children].forEach((b, i) =>
    b.setAttribute("aria-current", i === cur),
  );
  dkCur.textContent = String(cur + 1).padStart(2, "0");
  prog.style.width = (cur / (total - 1)) * 100 + "%";
  dkPrev.disabled = cur === 0;
  dkNext.disabled = cur === total - 1;
  const show = cur > 0;
  mnav.classList.toggle("show", show);
  document.body.classList.toggle("mnav-on", show);
  const inner = pages[cur].querySelector(".pg-inner");
  if (inner) inner.scrollTop = 0;
  syncHash();
  document.title =
    cur === 0
      ? "Annashrul Yusuf — Fullstack Developer Portfolio"
      : I18N[lang].nav_titles[cur] + " · Annashrul Yusuf";
  if (cur === SLUGS.indexOf("work")) setTimeout(maybeFill, 120);
}
function go(n) {
  n = Math.max(0, Math.min(total - 1, n));
  if (n === cur) return;
  cur = n;
  paint();
}
addEventListener("hashchange", () => {
  if (lbOpen) return;
  const i = indexFromHash();
  if (i !== cur) {
    cur = i;
    paint();
  }
});
let acc = 0,
  accTimer;
document.getElementById("stage").addEventListener(
  "wheel",
  (e) => {
    if (lbOpen) return;
    const inner = pages[cur].querySelector(".pg-inner");
    const down = e.deltaY > 0,
      atTop = inner.scrollTop <= 0,
      atBot = inner.scrollHeight - inner.clientHeight - inner.scrollTop <= 1;
    /* On the work page, keep scrolling while there are still more cards to load — don't flip. */
    if (
      pages[cur].classList.contains("work") &&
      down &&
      rendered < shown.length
    )
      return;
    if ((down && !atBot) || (!down && !atTop)) return;
    e.preventDefault();
    if (lock) return;
    acc += e.deltaY;
    clearTimeout(accTimer);
    accTimer = setTimeout(() => (acc = 0), 160);
    if (Math.abs(acc) < 24) return;
    lock = true;
    acc = 0;
    go(cur + (down ? 1 : -1));
    setTimeout(() => (lock = false), 940);
  },
  {
    passive: false,
  },
);
addEventListener("keydown", (e) => {
  if (lbOpen) {
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") lbPrevStep();
    if (e.key === "ArrowRight") lbNextStep();
    return;
  }
  if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) {
    e.preventDefault();
    go(cur + 1);
  }
  if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
    e.preventDefault();
    go(cur - 1);
  }
});
let ty = 0,
  tracking = false;
const stage = document.getElementById("stage");
stage.addEventListener(
  "touchstart",
  (e) => {
    if (lbOpen) return;
    ty = e.touches[0].clientY;
    tracking = true;
  },
  {
    passive: true,
  },
);
stage.addEventListener(
  "touchend",
  (e) => {
    if (lbOpen || !tracking) return;
    tracking = false;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dy) < 55) return;
    const inner = pages[cur].querySelector(".pg-inner");
    const atTop = inner.scrollTop <= 0,
      atBot = inner.scrollHeight - inner.clientHeight - inner.scrollTop <= 1;
    /* On the work page, swiping up while more cards remain should scroll, not flip. */
    if (
      pages[cur].classList.contains("work") &&
      dy < 0 &&
      rendered < shown.length
    )
      return;
    if (dy < 0 && atBot) go(cur + 1);
    else if (dy > 0 && atTop) go(cur - 1);
  },
  {
    passive: true,
  },
);
dkPrev.addEventListener("click", () => go(cur - 1));
dkNext.addEventListener("click", () => go(cur + 1));
function openProjectFromQuery() {
  const params = new URLSearchParams(location.search);
  const pj = params.get("project");
  if (!pj) return;
  const idx = shown.findIndex((p) => p.id === pj);
  if (idx < 0) return;
  const im = Math.max(0, (parseInt(params.get("img"), 10) || 1) - 1);
  cur = SLUGS.indexOf("work");
  paint();
  setTimeout(() => openLB(idx, im), 320);
}
function startLoader() {
  const loader = document.getElementById("loader"),
    bar = document.getElementById("bar"),
    pctEl = document.getElementById("pct"),
    word = document.getElementById("loadword");
  word.textContent = I18N[lang].load;
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let p = 0;
  const minTime = reduce ? 300 : 1500;
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const target = Math.min(100, (elapsed / minTime) * 100);
    p += (target - p) * 0.15;
    const sh = Math.round(p);
    pctEl.textContent = sh + "%";
    bar.style.width = p + "%";
    if (sh >= 100 || elapsed > minTime + 400) {
      pctEl.textContent = "100%";
      bar.style.width = "100%";
      loader.classList.add("done");
      requestAnimationFrame(() =>
        document.querySelector(".cover").classList.add("live"),
      );
      return;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
loadI18N()
  .then(() => {
    applyLang();
    renderGrid();
    paint();
    openProjectFromQuery();
    startLoader();
  })
  .catch((error) => {
    console.error("Failed to initialize translations", error);
  });
