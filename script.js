const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".intro-grid, .story-quote, .value-card, .program-card, .event-slider, .demo-card");
revealItems.forEach((item) => item.classList.add("reveal"));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("visible");
      requestAnimationFrame(() => requestAnimationFrame(() => entry.target.classList.add("visible")));
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

const eventData = [
  { image: "assets/events/WhatsApp Image 2026-09-14 at 8.04.25 PM.jpeg", alt: "Children arriving on the first day of school", tag: "A brand new beginning", title: "First day of school", description: "New bags, bright smiles, and a classroom waiting to be filled with stories." },
  { image: "assets/events/WhatsApp Image 2026-09-03 at 12.34.37 PM.jpeg", alt: "Children celebrating Krishna Jayanthi", tag: "Culture & celebration", title: "Krishna Jayanthi", description: "Little feet, big traditions, and a day of music, colour, and togetherness." },
  { image: "assets/events/Vinayagar Chaturti.jpeg", alt: "Vinayagar Chaturthi celebration", tag: "Joy in every tradition", title: "Vinayagar Chaturthi", description: "Making memories together and learning that every celebration is better shared." },
];
const eventRange = document.querySelector("#event-range");
const eventImage = document.querySelector("#event-image");
const eventTag = document.querySelector("#event-tag");
const eventTitle = document.querySelector("#event-title");
const eventDescription = document.querySelector("#event-description");
const eventCount = document.querySelector("#event-count");
function showEvent(index) {
  const event = eventData[index];
  const progress = (index / (eventData.length - 1)) * 100;
  eventRange.style.background = `linear-gradient(90deg, var(--orange) 0%, var(--orange) ${progress}%, #e3d8c8 ${progress}%, #e3d8c8 100%)`;
  eventImage.classList.add("changing");
  window.setTimeout(() => {
    eventImage.src = event.image;
    eventImage.alt = event.alt;
    eventTag.textContent = event.tag;
    eventTitle.textContent = event.title;
    eventDescription.textContent = event.description;
    eventCount.innerHTML = `0${index + 1} <small>/ 03</small>`;
    eventImage.classList.remove("changing");
  }, 180);
}
eventRange?.addEventListener("input", (event) => showEvent(Number(event.target.value)));

const quotes = [
  ["Every child is a different kind of flower, and all together they make this garden beautiful.", "— Shree Pamban philosophy"],
  ["The beautiful thing about learning is that nobody can take it away from you.", "— B. B. King"],
  ["Children are not things to be moulded, but people to be unfolded.", "— Jess Lair"],
];
const quoteText = document.querySelector("#story-quote-text");
const quoteCredit = document.querySelector("#story-quote-credit");
document.querySelectorAll(".quote-dot").forEach((dot, index) => dot.addEventListener("click", () => {
  quoteText.classList.add("quote-changing");
  window.setTimeout(() => {
    quoteText.textContent = quotes[index][0];
    quoteCredit.textContent = quotes[index][1];
    quoteText.classList.remove("quote-changing");
  }, 150);
  document.querySelectorAll(".quote-dot").forEach((item) => item.classList.remove("active"));
  dot.classList.add("active");
}));

const makeWebhookUrl = "https://hook.eu1.make.com/8lu2vpt4ljvipfttvactphvu6ocfky0c";
document.querySelector("#demo-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const errorMessage = document.querySelector("#booking-error");
  const message = [
    "School visit request",
    `Child's age: ${values.get("age")}`,
    `Preferred date: ${values.get("date")}`,
    `Convenient timing: ${values.get("time")}`,
  ].join("\n");
  submitButton.disabled = true;
  submitButton.setAttribute("aria-busy", "true");
  errorMessage.hidden = true;
  try {
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.get("name"),
        email: values.get("email"),
        phone: values.get("phone"),
        message,
      }),
    });
    if (!response.ok) {
      throw new Error(`Make webhook returned ${response.status}`);
    }
    document.querySelector("#booking-fields").hidden = true;
    document.querySelector("#booking-success").hidden = false;
  } catch (error) {
    console.error("Booking request failed:", error);
    errorMessage.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-busy");
  }
});

document.querySelector("#book-another").addEventListener("click", () => {
  document.querySelector("#demo-form").reset();
  document.querySelector("#booking-fields").hidden = false;
  document.querySelector("#booking-success").hidden = true;
  document.querySelector("#booking-error").hidden = true;
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll(".faq-list details").forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});
