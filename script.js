document.addEventListener('DOMContentLoaded', () => {
    /* -----------------------------
       SINOPSIS: Ver más / Ver menos
    ------------------------------*/
    const text = document.getElementById("sinopsis-text");
    const link = document.getElementById("toggle-link");

    link.addEventListener("click", (e) => {
      e.preventDefault();
      const collapsed = text.classList.contains("sinopsis-collapsed");

      if (collapsed) {
        text.classList.remove("sinopsis-collapsed");
        link.textContent = "Ver menos";
      } else {
        text.classList.add("sinopsis-collapsed");
        link.textContent = "Ver más";
      }
    });

    /* -------------------------------------------
       NAVBAR: Cerrar menú colapsado al hacer click
    --------------------------------------------*/
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarCollapse = document.getElementById("navbarNav");

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        const collapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        collapse.hide();
      });
    });
});
