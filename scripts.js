console.log("Script loaded");
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


document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  if (currentPage.includes("about.html")) {
    const header = document.querySelector(".navbar");

    let prevScrollPos = window.pageYOffset;

    window.addEventListener("scroll", () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        header.classList.remove("hidden"); // Muestra el encabezado
      } else {
        header.classList.add("hidden"); // Oculta el encabezado
      }

      prevScrollPos = currentScrollPos;
    });
  }
});
