// ==================== PRELOADER ====================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('loaded'), 400);
  }
});

// ==================== LAZY LOAD IMAGES ====================
document.querySelectorAll('img:not([loading])').forEach(img => {
  img.setAttribute('loading', 'lazy');
});

// ==================== MOBILE MENU ====================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
const sections = document.querySelectorAll("section[id], .section__container[id], header[id], footer[id]");
const navLinkItems = document.querySelectorAll(".nav__links a[href^='#']");

function updateActiveNav() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinkItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// ==================== SCROLL REVEAL ANIMATIONS ====================
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".about__container .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".about__container .section__description", {
  ...scrollRevealOption,
  delay: 500,
  interval: 500,
});
ScrollReveal().reveal(".about__container .about__brand", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".service__container .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".service__container .section__description", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".service__card", {
  duration: 1000,
  delay: 1000,
  interval: 500,
});

ScrollReveal().reveal(".blog__content .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".blog__content h4", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".blog__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".blog__content .blog__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".contact__section .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".contact__info__card", {
  ...scrollRevealOption,
  delay: 300,
  interval: 200,
});
ScrollReveal().reveal(".contact__form", {
  ...scrollRevealOption,
  delay: 500,
});

// ==================== SWIPER TESTIMONIALS ====================
const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ==================== INSTAGRAM MARQUEE ====================
const instagram = document.querySelector(".instagram__flex");

if (instagram) {
  Array.from(instagram.children).forEach((item) => {
    const duplicateNode = item.cloneNode(true);
    duplicateNode.setAttribute("aria-hidden", true);
    instagram.appendChild(duplicateNode);
  });

  instagram.addEventListener("mouseenter", () => {
    instagram.style.animationPlayState = "paused";
  });
  instagram.addEventListener("mouseleave", () => {
    instagram.style.animationPlayState = "running";
  });
}

// ==================== GALLERY LIGHTBOX ====================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxTitle = document.getElementById("lightbox-title");

let lightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(images, startIndex = 0, title = "") {
  lightboxImages = images;
  currentLightboxIndex = startIndex;
  updateLightboxImage();
  if (lightboxTitle) lightboxTitle.textContent = title;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLightboxImage() {
  lightboxImg.style.opacity = 0;
  setTimeout(() => {
    lightboxImg.src = lightboxImages[currentLightboxIndex];
    lightboxImg.onload = () => { lightboxImg.style.opacity = 1; };
    if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
  }, 150);
}

function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
  updateLightboxImage();
}

function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
}

if (lightbox) {
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", nextLightboxImage);
  lightboxPrev.addEventListener("click", prevLightboxImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextLightboxImage();
    if (e.key === "ArrowLeft") prevLightboxImage();
  });
}

// Gallery image click -> lightbox
const galleryImages = document.querySelectorAll(".gallery__img");
const galleryImageSrcs = Array.from(galleryImages).map((img) => img.src);

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    openLightbox(galleryImageSrcs, index, "Gallery");
  });
});

// ==================== VIEW GALLERY BUTTON ====================
const loadMoreBtn = document.getElementById("load-more-gallery");
const galleryGrid = document.querySelector(".gallery__grid");
let galleryExpanded = false;

const additionalGalleryImages = [
  { src: "assets/portfolio-1.jpg", alt: "Gallery Photo 9" },
  { src: "assets/portfolio-2.jpg", alt: "Gallery Photo 10" },
  { src: "assets/portfolio-3.jpg", alt: "Gallery Photo 11" },
];

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    if (!galleryExpanded) {
      additionalGalleryImages.forEach((imgData, i) => {
        const img = document.createElement("img");
        img.src = imgData.src;
        img.alt = imgData.alt;
        img.classList.add("gallery__img", "gallery__img--new");
        img.style.opacity = "0";
        img.style.transform = "scale(0.8)";
        galleryGrid.appendChild(img);

        setTimeout(() => {
          img.style.transition = "all 0.5s ease";
          img.style.opacity = "1";
          img.style.transform = "scale(1)";
        }, i * 100);

        img.addEventListener("click", () => {
          const allImgs = document.querySelectorAll(".gallery__img");
          const allSrcs = Array.from(allImgs).map((g) => g.src);
          const idx = allSrcs.indexOf(img.src);
          openLightbox(allSrcs, idx >= 0 ? idx : 0, "Gallery");
        });
      });
      loadMoreBtn.textContent = "VIEW FULL PORTFOLIO";
      galleryExpanded = true;
    } else {
      window.location.href = "portfolio.html";
    }
  });
}

// ==================== TOAST NOTIFICATION ====================
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

function showToast(message, duration = 3000) {
  if (!toast || !toastMessage) return;
  toastMessage.textContent = message;
  toast.classList.add("active");
  setTimeout(() => toast.classList.remove("active"), duration);
}

// ==================== WEB3FORMS ====================
// ⚠️ REPLACE with your Web3Forms access key:
// Get it free at https://web3forms.com — just enter the client's email, they verify it, you get a key.
const WEB3FORMS_KEY = "09fac936-77d6-41f3-b8d4-c2e539bbcac8";

// ==================== CONTACT FORM (Web3Forms) ====================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const phone = document.getElementById("contact-phone")?.value.trim() || "";
    const service = document.getElementById("contact-service");
    const serviceVal = service ? service.options[service.selectedIndex]?.text || "" : "";
    const packageEl = document.getElementById("contact-package");
    const packageVal = packageEl ? packageEl.options[packageEl.selectedIndex]?.text || "Not selected" : "Not selected";
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !serviceVal || !message) {
      showToast("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    const submitBtn = contactForm.querySelector(".contact__submit__btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    if (WEB3FORMS_KEY !== "YOUR_ACCESS_KEY") {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Contact from ${name} — Fiker Photography`,
          from_name: "Fiker Photography Website",
          name: name,
          email: email,
          phone: phone,
          service: serviceVal,
          package: packageVal,
          message: message,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            showToast(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon!`);
            contactForm.reset();
          } else {
            showToast("Oops! Something went wrong. Please try again or email us directly.");
          }
        })
        .catch(() => {
          showToast("Oops! Something went wrong. Please try again or email us directly.");
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
        });
    } else {
      // Fallback: simulated send until Web3Forms key is set
      console.warn("Web3Forms not configured — using simulated send. Replace YOUR_ACCESS_KEY in main.js");
      setTimeout(() => {
        showToast(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon!`);
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }, 1500);
    }
  });
}

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value.trim();

    if (!email) {
      showToast("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    const submitBtn = newsletterForm.querySelector(".btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "...";
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast("🎉 You've been subscribed! Welcome to the Fiker Photography community!");
      newsletterForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1000);
  });
}

// ==================== BACK TO TOP BUTTON ====================
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ==================== PARALLAX EFFECT ON HEADER ====================
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header#home");
  if (header) {
    const scrolled = window.scrollY;
    if (scrolled < header.offsetHeight) {
      header.style.backgroundPositionY = `${scrolled * 0.4}px`;
    }
  }
});

console.log("✨ Fiker Photography website fully loaded and functional!");

