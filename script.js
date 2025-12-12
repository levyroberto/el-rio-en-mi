document.addEventListener('DOMContentLoaded', () => {
  
  function setupToggle(buttonId, containerId) {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(containerId);
  
    if (!button || !container) return;
  
    button.addEventListener("click", (e) => {
      e.preventDefault();
  
      const isCollapsed = container.classList.contains("collapsed");
  
      container.classList.toggle("collapsed");
      container.classList.toggle("expanded");
  
      button.textContent = isCollapsed ? "Ver menos" : "Ver más";
    });
  }
  
  setupToggle("toggle-sinopsis", "sinopsis-text");
  setupToggle("toggle-letras", "letras-wrapper");
  /* ==========================================
     NAVBAR: cerrar menú colapsado al hacer click
  =========================================== */
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.getElementById("navbarNav");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse) {
        const collapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        collapse.hide();
      }
    });
  });

  /* =============================
     FOTOS: grilla dinámica
  ============================== */
  const fotosGrid = document.getElementById("fotos-grid");
  if (fotosGrid) {
    const totalFotos = 12;

    for (let i = 1; i <= totalFotos; i++) {
      const col = document.createElement("div");
      col.className = "col-12 col-lg-5";

      col.innerHTML = `
        <div class="foto-box">
          <img src="./assets/foto${i}.jpg" alt="Foto ${i}" class="foto-img">
        </div>
      `;

      fotosGrid.appendChild(col);
    }
  }

});

/* =============================
   ELENCO: carga independiente
============================= */
fetch('./elenco.json')
  .then(res => {
    if (!res.ok) throw new Error("No se pudo cargar elenco.json");
    return res.json();
  })
  .then(elenco => {
    const profesorContainer = document.getElementById('profesor');
    const elencoContainer = document.getElementById('elenco-list');

    if (!profesorContainer || !elencoContainer) return;

    const profesor = elenco.find(p => p.rol.toLowerCase() === "profesor");
    const otros = elenco.filter(p => p.rol.toLowerCase() !== "profesor");

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
  .catch(err => console.error("Error cargando elenco:", err));

  fetch('./letras/letras.json')
  .then(res => {
    if (!res.ok) throw new Error("No se pudo cargar letras.json");
    return res.json();
  })
  .then(letras => {
    const container = document.getElementById("letras-container");
    if (!container) return;

    letras.forEach(letra => {
      const col = document.createElement("div");
      col.className = "col-12 col-lg-6 text-center";

      col.innerHTML = `
        <h3 class="mb-3">${letra.titulo}</h3>
        <p class="lyrics">${letra.texto}</p>
      `;

      container.appendChild(col);
    });
  })
  .catch(err => console.error("Error cargando letras:", err));