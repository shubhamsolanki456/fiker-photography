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

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  }
});

// ==================== WEB3FORMS ====================
// ⚠️ REPLACE with your Web3Forms access key:
// Get it free at https://web3forms.com — just enter the client's email, they verify it, you get a key.
const WEB3FORMS_KEY = "09fac936-77d6-41f3-b8d4-c2e539bbcac8";

// ==================== BACK TO TOP ====================
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==================== TOAST ====================
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

function showToast(message, duration = 3500) {
  if (!toast || !toastMessage) return;
  toastMessage.textContent = message;
  toast.classList.add("active");
  setTimeout(() => toast.classList.remove("active"), duration);
}

// ==================== PORTFOLIO PAGE: FILTER & LIGHTBOX ====================
const filterBtns = document.querySelectorAll(".filter__btn");
const portfolioItems = document.querySelectorAll(".portfolio__item");

if (filterBtns.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      portfolioItems.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "";
          item.style.animation = "fadeInUp 0.5s ease forwards";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Portfolio Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxCounter = document.getElementById("lightbox-counter");

let lightboxImages = [];
let currentIndex = 0;

function openLightbox(images, index) {
  lightboxImages = images;
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLightbox() {
  lightboxImg.style.opacity = 0;
  setTimeout(() => {
    lightboxImg.src = lightboxImages[currentIndex];
    lightboxImg.onload = () => (lightboxImg.style.opacity = 1);
    if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${lightboxImages.length}`;
  }, 150);
}

if (lightbox) {
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % lightboxImages.length;
    updateLightbox();
  });
  lightboxPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % lightboxImages.length; updateLightbox(); }
    if (e.key === "ArrowLeft") { currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length; updateLightbox(); }
  });
}

if (portfolioItems.length && lightbox) {
  portfolioItems.forEach((item, idx) => {
    item.addEventListener("click", () => {
      const visibleItems = Array.from(portfolioItems).filter(i => i.style.display !== "none");
      const srcs = visibleItems.map(i => i.querySelector("img").src);
      const clickedIdx = visibleItems.indexOf(item);
      openLightbox(srcs, clickedIdx >= 0 ? clickedIdx : 0);
    });
  });
}

// ==================== ABOUT PAGE: STAT COUNTER ====================
const statNumbers = document.querySelectorAll(".stat__number");

if (statNumbers.length) {
  const animateStats = () => {
    statNumbers.forEach((stat) => {
      const target = +stat.dataset.target;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target + "+";
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(current) + "+";
        }
      }, 16);
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector(".about__stats");
  if (statsSection) statsObserver.observe(statsSection);
}

// ==================== BOOKING PAGE: PRICING & FORM ====================
const pricingBtns = document.querySelectorAll(".pricing__btn");
const bookingForm = document.getElementById("booking-form");

if (pricingBtns.length) {
  pricingBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pkg = btn.dataset.package;
      const formSection = document.getElementById("booking-form-section");
      if (formSection) formSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        const pkgSelect = document.getElementById("book-package");
        if (pkgSelect) {
          for (let opt of pkgSelect.options) {
            if (opt.textContent.includes(pkg.split(" - ")[0])) {
              pkgSelect.value = opt.value;
              break;
            }
          }
        }
      }, 600);
    });
  });
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("book-name").value.trim();
    const email = document.getElementById("book-email").value.trim();
    const phone = document.getElementById("book-phone")?.value.trim() || "Not provided";
    const date = document.getElementById("book-date")?.value || "Not selected";
    const serviceEl = document.getElementById("book-service");
    const serviceVal = serviceEl ? serviceEl.options[serviceEl.selectedIndex]?.text || "Not selected" : "Not selected";
    const packageEl = document.getElementById("book-package");
    const packageVal = packageEl ? packageEl.options[packageEl.selectedIndex]?.text || "Not selected" : "Not selected";
    const message = document.getElementById("book-message")?.value.trim() || "No message";

    if (!name || !email) {
      showToast("Please fill in all required fields");
      return;
    }

    const submitBtn = bookingForm.querySelector(".contact__submit__btn");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    if (WEB3FORMS_KEY !== "YOUR_ACCESS_KEY") {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Booking from ${name} — Fiker Photography`,
          from_name: "Fiker Photography Website",
          name: name,
          email: email,
          phone: phone,
          preferred_date: date,
          service: serviceVal,
          package: packageVal,
          message: message,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            showToast(`Thank you, ${name}! Your booking request has been submitted. We'll contact you within 24 hours to confirm.`);
            bookingForm.reset();
          } else {
            showToast("Oops! Something went wrong. Please try again or email us directly.");
          }
        })
        .catch(() => {
          showToast("Oops! Something went wrong. Please try again or email us directly.");
        })
        .finally(() => {
          submitBtn.textContent = "Book My Session";
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
        });
    } else {
      console.warn("Web3Forms not configured — using simulated send.");
      setTimeout(() => {
        showToast(`Thank you, ${name}! Your booking request has been submitted. We'll contact you within 24 hours to confirm.`);
        bookingForm.reset();
        submitBtn.textContent = "Book My Session";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }, 1500);
    }
  });
}

// ==================== BLOG PAGE: READ MORE EXPAND ====================
const blogReadBtns = document.querySelectorAll(".blog__read__btn");

blogReadBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const postId = btn.dataset.post;
    const fullContent = document.getElementById(`${postId}-full`);

    if (fullContent) {
      const isHidden = fullContent.style.display === "none";
      fullContent.style.display = isHidden ? "block" : "none";
      btn.textContent = isHidden ? "Show Less" : "Read More";

      if (isHidden) {
        fullContent.style.animation = "fadeInUp 0.5s ease forwards";
      }
    }
  });
});

// ==================== TRANSPARENT NAV ON SCROLL ====================
const navElement = document.querySelector('nav');
if (navElement) {
  function updateNavScroll() {
    if (window.scrollY > 50) {
      navElement.classList.add('nav--scrolled');
    } else {
      navElement.classList.remove('nav--scrolled');
    }
  }
  window.addEventListener('scroll', updateNavScroll);
  updateNavScroll();
}

console.log("✨ Fiker Photography page loaded!");
