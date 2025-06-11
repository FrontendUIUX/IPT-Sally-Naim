document.addEventListener("DOMContentLoaded", function () {
  const imageChangeTime = 5;
  let time = 0;
  let currentSlider;

  const progressIndicator = document.getElementById("progress-indicator");
  const totalSlides = 3;

  function renderProgress(index) {
    progressIndicator.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const number = document.createElement("div");
      number.textContent = String(i + 1).padStart(2, "0");
      number.classList.add("progress-number", "slide-number");
      number.style.fontWeight = "normal";
      number.style.fontSize = "18px";
      if (i <= index) number.classList.add("active");

      progressIndicator.appendChild(number);

      if (i === index) {
        const sliderWrapper = document.createElement("div");
        sliderWrapper.classList.add("slider-wrapper");

        const slider = document.createElement("input");
        slider.type = "range";
        slider.className = "slider";
        slider.value = 0;
        slider.max = imageChangeTime;
        slider.step = 0.01;

        sliderWrapper.appendChild(slider);
        progressIndicator.appendChild(sliderWrapper);

        currentSlider = slider;
        slider.addEventListener("input", updateSliderBackground);
      }
    }
  }

  function updateSliderBackground() {
    if (!currentSlider) return;
    const value = (currentSlider.value / currentSlider.max) * 100;
    currentSlider.style.backgroundImage = `linear-gradient(to right, white ${value}%, grey ${value}%)`;
  }

  function resetRangeSlider() {
    time = 0;
    if (currentSlider) {
      currentSlider.value = 0;
    }
  }

  setInterval(() => {
    time += 0.01;
    if (currentSlider) {
      currentSlider.value = time;
      updateSliderBackground();
    }
  }, 10);

  const swiper = new Swiper(".hero-slider", {
    loop: true,
    autoplay: {
      delay: imageChangeTime * 1000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 1,
    centeredSlides: false,
    on: {
      slideChange: function () {
        const counter = document.getElementById("counter");
        if (counter) {
          counter.textContent = `${this.realIndex + 1}/${totalSlides}`;
        }
        renderProgress(this.realIndex);
        resetRangeSlider();
      },
    },
  });

  renderProgress(0);

  // Employee slider logic
  let currentIndex = 0;
  const employees = document.querySelectorAll(".employee");
  const totalEmployees = employees.length;
  const dots = document.querySelectorAll(".dot");

  employees.forEach((employee, index) => {
    if (index !== currentIndex) {
      employee.style.display = "none";
    }
  });

  function showNextEmployee() {
    employees[currentIndex].style.display = "none";
    dots[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % totalEmployees;
    employees[currentIndex].style.display = "flex";
    dots[currentIndex].classList.add("active");
  }

  setInterval(showNextEmployee, 3000);

  // Directory panel GSAP (Left to Right)
  const directoryPanel = document.getElementById("directoryPanel");
  gsap.set(directoryPanel, { x: -350, opacity: 0, display: "none" });

  document.querySelector(".first-link").addEventListener("click", function (e) {
    e.preventDefault();
    const isHidden = directoryPanel.classList.contains("hidden");

    if (isHidden) {
      directoryPanel.classList.remove("hidden");
      directoryPanel.classList.add("visible");
      gsap.set(directoryPanel, { display: "block" });
      gsap.to(directoryPanel, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(directoryPanel, {
        x: -350,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          directoryPanel.classList.remove("visible");
          directoryPanel.classList.add("hidden");
          gsap.set(directoryPanel, { display: "none" });
        },
      });
    }
  });

  // UpcomingPannel GSAP (Left to Right)
  const upcomingPanel = document.getElementById("UpcomingPannel");
  gsap.set(upcomingPanel, { x: -350, opacity: 0, display: "none" });

  document.querySelector(".second-link").addEventListener("click", function (e) {
    e.preventDefault();
    const isHidden = upcomingPanel.classList.contains("hidden");

    if (isHidden) {
      upcomingPanel.classList.remove("hidden");
      upcomingPanel.classList.add("visible");
      gsap.set(upcomingPanel, { display: "block" });
      gsap.to(upcomingPanel, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(upcomingPanel, {
        x: -350,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          upcomingPanel.classList.remove("visible");
          upcomingPanel.classList.add("hidden");
          gsap.set(upcomingPanel, { display: "none" });
        },
      });
    }
  });

  // Close panel buttons
  document.querySelectorAll(".close-panel").forEach((button) => {
    button.addEventListener("click", function () {
      const panel = this.closest(".Upcoming-Pannel, .directory-panel");
      if (panel) {
        gsap.to(panel, {
          x: -350,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            panel.classList.remove("visible");
            panel.classList.add("hidden");
            gsap.set(panel, { display: "none" });
          },
        });
      }
    });
  });

  // User search filter
  document.getElementById("userSearch").addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    const users = document.querySelectorAll(".user-list .user-card");

    users.forEach(function (user) {
      user.style.display = user.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
  });

  // Toggle user details
  document.querySelectorAll(".chevron-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const wrapper = this.closest(".user-wrapper");
      const detailsPanel = wrapper.querySelector(".details-panel");
      if (detailsPanel) {
        detailsPanel.classList.toggle("hidden");
      }
    });
  });

  // Active link highlight
  const links = document.querySelectorAll(".dashboard-line a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
