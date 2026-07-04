(() => {
  "use strict";

  const body = document.body;
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");

  const closeMenu = (returnFocus = false) => {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    body.classList.remove("menu-open");
    if (returnFocus) menuToggle.focus();
  };

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
      body.classList.toggle("menu-open", !isOpen);
    });

    siteNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!siteNav.classList.contains("is-open")) return;
      if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const copyButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("[data-copy-status]");
  if (copyButton && copyStatus) {
    copyButton.addEventListener("click", async () => {
      const email = copyButton.dataset.copyEmail;
      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = "Correo copiado al portapapeles.";
      } catch {
        const input = document.createElement("input");
        input.value = email;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        copyStatus.textContent = copied ? "Correo copiado al portapapeles." : "No se pudo copiar. Selecciona el correo manualmente.";
      }
      window.setTimeout(() => { copyStatus.textContent = ""; }, 4500);
    });
  }

  const galleryButtons = [...document.querySelectorAll("[data-gallery-item]")];
  const lightbox = document.querySelector("[data-lightbox]");

  if (galleryButtons.length && lightbox) {
    const lightboxImage = lightbox.querySelector("[data-lightbox-image]");
    const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
    const closeButton = lightbox.querySelector("[data-lightbox-close]");
    const previousButton = lightbox.querySelector("[data-lightbox-prev]");
    const nextButton = lightbox.querySelector("[data-lightbox-next]");
    let currentIndex = 0;
    let trigger = null;

    const render = () => {
      const button = galleryButtons[currentIndex];
      const image = button.querySelector("img");
      lightboxImage.src = button.dataset.full || image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = button.dataset.caption || image.alt;
      const multiple = galleryButtons.length > 1;
      previousButton.hidden = !multiple;
      nextButton.hidden = !multiple;
    };

    const openLightbox = (index, sourceButton) => {
      currentIndex = index;
      trigger = sourceButton;
      render();
      lightbox.hidden = false;
      body.classList.add("modal-open");
      closeButton.focus();
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      body.classList.remove("modal-open");
      lightboxImage.removeAttribute("src");
      if (trigger) trigger.focus();
    };

    const step = (direction) => {
      currentIndex = (currentIndex + direction + galleryButtons.length) % galleryButtons.length;
      render();
    };

    galleryButtons.forEach((button, index) => {
      button.addEventListener("click", () => openLightbox(index, button));
    });

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", () => step(-1));
    nextButton.addEventListener("click", () => step(1));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "Tab") {
        const focusable = [...lightbox.querySelectorAll("button:not([hidden])")];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav?.classList.contains("is-open")) closeMenu(true);
  });
})();
