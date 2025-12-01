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

fetch('./elenco.json')
    .then(res => res.json())
    .then(elenco => {
      const profesorContainer = document.getElementById('profesor');
      const elencoContainer = document.getElementById('elenco-list');

      const profesor = elenco.find(p => p.rol.toLowerCase() === "profesor");
      const otros = elenco.filter(p => p.rol.toLowerCase() !== "profesor");

      // Render profesor (solo uno)
      if (profesor) {
        const col = document.createElement('div');
        col.className = 'col-8 col-sm-4 col-md-3 col-lg-2 mb-5';

        col.innerHTML = `
          <div class="alumno-item">
            <img src="${profesor.foto}" alt="${profesor.nombre}" class="alumno-foto">
            <h6 class="mt-3 mb-0 fw-bold">${profesor.nombre}</h6>
            <p class="small text-accent">${profesor.rol}</p>
          </div>
        `;

        profesorContainer.appendChild(col);
      }

      // Render el resto
      otros.forEach(persona => {
        const col = document.createElement('div');
        col.className = 'col-6 col-sm-4 col-md-3 col-lg-2 mb-5';

        col.innerHTML = `
          <div class="alumno-item">
            <img src="${persona.foto}" alt="${persona.nombre}" class="alumno-foto">
            <h6 class="mt-3 mb-0 fw-bold">${persona.nombre}</h6>
            <p class="small text-accent">${persona.rol}</p>
          </div>
        `;

        elencoContainer.appendChild(col);
      });

    })
    .catch(err => console.error('Error cargando elenco:', err));