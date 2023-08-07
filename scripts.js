// Script para manejar cookies de consentimiento
const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");

cookieButton.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("cookieConsent", "true");
});

setTimeout(() => {
  if (!localStorage.getItem("cookieConsent")) {
    cookieContainer.classList.add("active");
  }
}, 2000);
