// Purpose: Main JavaScript file for the project
'use strict';

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Select all navigation buttons
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  if (navigationLinks.length === 0) {
      console.error("No navigation links found. Check your HTML.");
      return;
  }

  if (pages.length === 0) {
      console.error("No content sections found. Check your HTML.");
      return;
  }

  // Ensure the first section is active by default
  document.querySelector("[data-page='about']").classList.add("active");

  // Add click event to each navigation button
  navigationLinks.forEach(link => {
    // Remove the second instance of navigationLinks reference
    console.log(`Clicked on: ${link.getAttribute("data-nav-link")}`); // Debugging log
      link.addEventListener("click", function () {
          const targetPage = this.getAttribute("data-nav-link");

          console.log(`Clicked on: ${targetPage}`); // Debugging log

          // Remove 'active' class from all navigation buttons
          navigationLinks.forEach(nav => nav.classList.remove("active"));
          this.classList.add("active");

          // Hide all sections first
          pages.forEach(page => {
              page.classList.remove("active");
              console.log(`Hiding section: ${page.getAttribute("data-page")}`); // Debugging log
          });

          // Show the selected section
          const targetSection = document.querySelector(`[data-page="${targetPage}"]`);
          console.log(`Showing section: ${targetPage}`); // Debugging log
          console.log(`Showing section: ${targetPage}`); // Debugging log
    console.log(`Activating section: ${targetPage}`); // Debugging log

          if (targetSection) {
              console.log(`Activating section: ${targetPage}`);
              targetSection.classList.add("active");
          } else {
              console.error(`Section [data-page="${targetPage}"] not found!`);
          }

          window.scrollTo(0, 0);
      });
  });
});



// Ensure DOM is fully loaded before executing script
document.addEventListener("DOMContentLoaded", function () {

  // Element toggle function
  const elementToggleFunc = function (elem) {
    if (elem) {
      elem.classList.toggle("active");
    }
  };

  // Sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // Sidebar toggle functionality for mobile
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  }

  // Testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // Modal variables
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // Modal toggle function
  const testimonialsModalFunc = function () {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  };

  // Add click event to all modal items
  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      if (modalImg && modalTitle && modalText) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      }
      testimonialsModalFunc();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }

  if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
  }

  // Form validation
  const form = document.querySelector("[data-form]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form && formBtn) {
    form.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fullname = form.fullname.value;
      const email = form.email.value;
      const message = form.message.value;

      fetch('https://aditya-new-portfolio.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, message })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Message sent!');
          form.reset();
        } else {
          alert('Error: ' + (data.error || 'Unknown error'));
        }
      })
      .catch(() => alert('Failed to send message. Please try again later.'));
    });
  }
});
