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
// SIMPLE LIGHTBOX
// ==============================
const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach(item => {
  item.addEventListener("click", () => {
    const src = item.style.backgroundImage.replace(/url\(["']?/, '').replace(/["']?\)/,'');
    openLightbox(src);
  });
});

function openLightbox(src) {
  let lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <span class="close">&times;</span>
    <img src="${src}" class="lightbox-img">
  `;
  document.body.appendChild(lb);

  lb.querySelector(".close").addEventListener("click", () => {
    document.body.removeChild(lb);
  });
}
