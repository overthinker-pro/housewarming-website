// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply animations to sections
document
  .querySelectorAll(
    ".details-section, .map-section, .rsvp-section, .contact-section",
  )
  .forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    observer.observe(section);
  });

// Parallax effect for hero background
let lastScrollY = window.scrollY;
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  if (hero) {
    const translateY = currentScrollY * 0.5;
    hero.style.transform = `translateY(${translateY}px)`;
  }

  lastScrollY = currentScrollY;
});

// Add loading animation for map
const mapContainer = document.querySelector(".map-container");
if (mapContainer) {
  const mapIframe = mapContainer.querySelector("iframe");
  if (mapIframe) {
    mapIframe.addEventListener("load", () => {
      mapContainer.style.opacity = "1";
    });
  }
}

// Button hover effects
document
  .querySelectorAll(".rsvp-btn, .contact-btn, .map-link")
  .forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

// Add click tracking for analytics (optional)
document
  .querySelectorAll('a[href^="tel:"], a[href^="https://wa.me"]')
  .forEach((link) => {
    link.addEventListener("click", function () {
      // You can add analytics tracking here
      console.log("Contact method clicked:", this.href);
    });
  });

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const focusedElement = document.activeElement;
    if (
      focusedElement &&
      focusedElement.matches(".rsvp-btn, .contact-btn, .map-link")
    ) {
      e.preventDefault();
      focusedElement.click();
    }
  }
});

// Performance optimization: Lazy load images if any
const images = document.querySelectorAll("img[data-src]");
if (images.length > 0) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Add scroll progress indicator
const addScrollProgress = () => {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  const updateProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress(); // Initial call
};

// Initialize scroll progress
addScrollProgress();

// Add touch support for mobile
let touchStartY = 0;
document.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener(
  "touchmove",
  (e) => {
    if (!e.target.closest(".map-container")) {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      // Prevent overscroll on iOS
      if (
        (window.scrollY === 0 && deltaY < 0) ||
        (window.innerHeight + window.scrollY >= document.body.offsetHeight &&
          deltaY > 0)
      ) {
        e.preventDefault();
      }
    }
  },
  { passive: false },
);

// Error handling for external links
document
  .querySelectorAll('a[href^="http"], a[target="_blank"]')
  .forEach((link) => {
    link.addEventListener("click", function (e) {
      try {
        // Check if link is valid
        const url = new URL(this.href);
        // Add noopener for security
        this.setAttribute("rel", "noopener noreferrer");
      } catch (error) {
        console.error("Invalid URL:", this.href);
        e.preventDefault();
      }
    });
  });

// Add viewport height fix for mobile browsers
const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);
setVH();

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Housewarming website loaded successfully");

  // Remove loading class for fade-in effect
  document.body.classList.remove("loading");

  // Initialize scroll progress
  addScrollProgress();
});
