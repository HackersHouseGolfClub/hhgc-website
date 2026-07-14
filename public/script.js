const CONTACT_EMAIL = "hello@hackershousegolf.com"; // Replace with the official launch inbox before public deployment.
const FORM_ENDPOINT = ""; // Optional: add a production form endpoint/webhook. Leave blank for mailto fallback.

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const form = document.getElementById("lead-form");
const status = document.getElementById("form-status");

function encodeFormData(data) {
  return Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      interest: formData.get("interest")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
      source: "HHGC Website v1.1",
      submittedAt: new Date().toISOString()
    };

    if (!payload.name || !payload.email) {
      status.textContent = "Please add your name and email.";
      return;
    }

    status.textContent = "Preparing your request...";

    if (FORM_ENDPOINT) {
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error("Form endpoint returned an error.");
        }

        status.textContent = "Thanks — you’re on the launch interest list.";
        form.reset();
      } catch (error) {
        status.textContent = "Opening your email client so we can receive your launch interest request.";
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("HHGC Launch Interest")}&body=${encodeURIComponent(encodeFormData(payload))}`;
        window.location.href = mailto;
      }

      return;
    }

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("HHGC Launch Interest")}&body=${encodeURIComponent(encodeFormData(payload))}`;
    status.textContent = "Opening your email client so we can receive your launch interest request.";
    window.location.href = mailto;
  });
}
