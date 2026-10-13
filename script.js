// ========== MOBILE MENU ==========

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");


if (hamburger && menu) {

  hamburger.addEventListener("click", () => {

    const isOpen = hamburger.classList.toggle("active");

    menu.classList.toggle("active");

    hamburger.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    hamburger.setAttribute(
      "aria-label",
      isOpen ? "Close Menu" : "Open Menu"
    );

  });

}


// Close menu when clicking a link

document
  .querySelectorAll(".navbar-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      if (hamburger && menu) {

        hamburger.classList.remove("active");

        menu.classList.remove("active");

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

        hamburger.setAttribute(
          "aria-label",
          "Open Menu"
        );

      }

    });

  });


// ========== ACTIVE NAVIGATION ON SCROLL ==========

const sections = document.querySelectorAll(
  "section[id]"
);

const navLinks = document.querySelectorAll(
  ".navbar-links a"
);


window.addEventListener(
  "scroll",
  () => {

    let current = "";


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 120;

      const sectionHeight =
        section.clientHeight;


      if (
        window.scrollY >= sectionTop &&
        window.scrollY <
          sectionTop + sectionHeight
      ) {

        current =
          section.getAttribute("id");

      }

    });


    navLinks.forEach(link => {

      const isActive =
        link.getAttribute("href") ===
        `#${current}`;


      link.classList.toggle(
        "active",
        isActive
      );


      if (isActive) {

        link.setAttribute(
          "aria-current",
          "page"
        );

      } else {

        link.removeAttribute(
          "aria-current"
        );

      }

    });

  },
  {
    passive: true
  }
);


// ========== CONTACT FORM HANDLING ==========

const contactForm =
  document.getElementById("contactForm");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();


      const name =
        document
          .getElementById("name")
          .value
          .trim();


      const email =
        document
          .getElementById("email")
          .value
          .trim();


      const message =
        document
          .getElementById("message")
          .value
          .trim();


      const status =
        document.getElementById(
          "formStatus"
        );


      // Basic validation

      if (!name || !email || !message) {

        status.textContent =
          "Please complete all fields before sending.";

        status.style.color = "red";

        return;

      }


      status.textContent =
        "Sending...";

      status.style.color =
        "#2B4C7E";


      // Replace YOUR_ENDPOINT with your
      // actual Formspree endpoint.

      try {

        const response =
          await fetch(
            "https://formspree.io/f/YOUR_ENDPOINT",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                "Accept":
                  "application/json"
              },

              body: JSON.stringify({
                name,
                email,
                message
              })
            }
          );


        if (response.ok) {

          status.textContent =
            "Message sent successfully! I'll get back to you soon.";

          status.style.color =
            "green";

          contactForm.reset();

        } else {

          throw new Error(
            "Failed to send"
          );

        }

      } catch (error) {

        status.innerHTML =
          'The online form is not connected yet. Please email me directly at <a href="mailto:mabundamatimu11@gmail.com">mabundamatimu11@gmail.com</a>.';

        status.style.color =
          "red";

      }

    }
  );

}


// ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener(
      "click",
      function (e) {

        const targetId =
          this.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetId
          );


        if (target) {

          e.preventDefault();


          const reduceMotion =
            window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches;


          target.scrollIntoView({

            behavior:
              reduceMotion
                ? "auto"
                : "smooth",

            block: "start"

          });

        }

      }
    );

  });


// ========== YEAR AUTO-UPDATE IN FOOTER ==========

const footerYear =
  document.querySelector(
    ".footer-bottom p"
  );


if (footerYear) {

  const currentYear =
    new Date().getFullYear();


  footerYear.textContent =
    `© ${currentYear} Matimu Mabunda. All Rights Reserved.`;

}