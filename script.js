// Navbar toggle
const container = document.querySelector(".container");

document.querySelector(".open-navbar-icon").addEventListener("click", () => {
  container.classList.add("change");
});

document.querySelector(".close-navbar-icon").addEventListener("click", () => {
  container.classList.remove("change");
});

// Close navbar when clicking a nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    container.classList.remove("change");
  });
});

// Card flip (price / back buttons)
document.querySelectorAll(".navigation-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".card").classList.toggle("change");
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Scroll-triggered fade-in for sections
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".card, .story-bg, .contact-form").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  fadeObserver.observe(el);
});

// Add the visible class styles
const style = document.createElement("style");
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// Stagger card animations
const cards = document.querySelectorAll(".card");
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(cards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.15}s`;
        entry.target.classList.add("visible");
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
cards.forEach((card) => cardObserver.observe(card));
