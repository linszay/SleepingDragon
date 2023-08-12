const cookieButton = document.querySelector(".cookie-btn");
const cookiePopup = document.querySelector(".cookie-popup");

cookieButton.addEventListener("click", () => {
  cookiePopup.style.display = "none";
  localStorage.setItem("cookieConsent", "true");
});

window.addEventListener("load", () => {
  setTimeout(() => {
    if (!localStorage.getItem("cookieConsent")) {
      cookiePopup.style.display = "block";
    }
  }, 2000);
});
