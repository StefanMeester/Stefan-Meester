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
// LIGHTBOX (werkt overal)
// ==============================
const images = document.querySelectorAll("img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");

images.forEach(img => {
  img.addEventListener("click", () => {
    if(img.closest(".gear-item")) return;

    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeBtn.onclick = () => lightbox.style.display = "none";

lightbox.onclick = (e) => {
  if(e.target === lightbox){
    lightbox.style.display = "none";
  }
};

// ==============================
// EXPAND GALLERY
// ==============================
const expandBtn = document.getElementById("expandGallery");
const galleryWrapper = document.getElementById("galleryWrapper");

let open = false;

expandBtn.addEventListener("click", () => {
  open = !open;

  if(open){
    galleryWrapper.style.maxHeight = "4000px";
    expandBtn.innerText = "↑ Minder tonen";
  }else{
    galleryWrapper.style.maxHeight = "500px";
    expandBtn.innerText = "↓ Bekijk alle foto's";
  }
});

// ==============================
// BEFORE AFTER DRAG (FIXED)
// ==============================
const container = document.querySelector(".ba-container");
const after = document.querySelector(".ba-after");
const line = document.querySelector(".ba-line");
const handle = document.querySelector(".ba-handle");

let dragging = false;

container.addEventListener("mousedown", () => dragging = true);
window.addEventListener("mouseup", () => dragging = false);

container.addEventListener("mousemove", (e) => {
  if(!dragging) return;

  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left;

  x = Math.max(0, Math.min(x, rect.width));

  const percent = (x / rect.width) * 100;

  after.style.width = percent + "%";
  line.style.left = percent + "%";
  handle.style.left = percent + "%";
});
document.querySelectorAll('.toggle-container').forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    
    // Voorbeeld: Check welke toggle het is
    if (toggle.id === 'themeToggle') {
        const isDark = toggle.classList.contains('active');
        console.log("Dark mode is nu:", isDark);
        // Voeg hier je code toe om body class te veranderen
    }
  });
});
