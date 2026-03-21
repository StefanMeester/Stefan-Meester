// ==============================
// DARK / LIGHT TOGGLE
// ==============================
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.classList.toggle("active");
});

// ==============================
// LANGUAGE TOGGLE
// ==============================
let currentLang = "nl";
const langToggle = document.getElementById("langToggle");

async function loadLanguage(lang) {
  const response = await fetch(`assets/data/${lang}.json`);
  const translations = await response.json();
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[key];
  });
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "nl" ? "en" : "nl";
  loadLanguage(currentLang);
  langToggle.classList.toggle("active");
});

loadLanguage(currentLang);

// ==============================
// LIGHTBOX (CLEAN VERSION)
// ==============================

const images = document.querySelectorAll(".masonry img, .best-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// klik buiten afbeelding sluit ook
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
// ==============================
// BEFORE AFTER SLIDER (DRAG)
// ==============================

const container = document.querySelector(".ba-container");
const afterImg = document.querySelector(".ba-after");
const line = document.querySelector(".ba-line");
const handle = document.querySelector(".ba-handle");

let isDragging = false;

container.addEventListener("mousedown", () => isDragging = true);
window.addEventListener("mouseup", () => isDragging = false);

container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left;

  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  const percent = (x / rect.width) * 100;

  afterImg.style.width = percent + "%";
  line.style.left = percent + "%";
  handle.style.left = percent + "%";
});
const toggle = document.querySelector(".gallery-toggle");
const gallery = document.querySelector(".masonry");

toggle.addEventListener("click", () => {
  gallery.classList.toggle("show");
  gallery.classList.toggle("hidden");
});
const slider = document.querySelector(".ba-slider");
const after = document.querySelector(".after");

slider.addEventListener("input", (e) => {
  const value = e.target.value;
  after.style.width = value + "%";

  document.querySelector(".ba-container").style.setProperty("--pos", value + "%");
});
const expandBtn = document.getElementById("expandGallery");
const galleryWrapper = document.getElementById("galleryWrapper");

let expanded = false;

expandBtn.addEventListener("click", () => {
  expanded = !expanded;

  if (expanded) {
    galleryWrapper.style.maxHeight = "3000px";
    expandBtn.textContent = "↑ Minder tonen";
  } else {
    galleryWrapper.style.maxHeight = "500px";
    expandBtn.textContent = "↓ Bekijk alle foto's";
  }
});
