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
