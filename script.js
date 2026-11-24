document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Reveal Animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  const revealElements = document.querySelectorAll(".timeline-item, .skill-panel");
  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

  // 2. Crisp Pop-to-Front Folder Interaction
  const questGrid = document.getElementById("quest-grid");
  const folders = document.querySelectorAll(".quest-folder");

  function bringFolderFront(folder) {
    folders.forEach((f) => f.classList.remove("is-front"));
    folder.classList.add("is-front");
    questGrid.classList.add("has-active-folder");
  }

  function resetFolders() {
    folders.forEach((f) => f.classList.remove("is-front"));
    questGrid.classList.remove("has-active-folder");
  }

  folders.forEach((folder) => {
    folder.addEventListener("mouseenter", () => bringFolderFront(folder));
    folder.addEventListener("mouseleave", () => resetFolders());
    folder.addEventListener("focusin", () => bringFolderFront(folder));
    folder.addEventListener("focusout", () => resetFolders());

    folder.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const alreadyFront = folder.classList.contains("is-front");
      resetFolders();
      if (!alreadyFront) {
        bringFolderFront(folder);
      }
    });
  });

  // 3. Quest Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      resetFolders();

      folders.forEach((folder) => {
        const category = folder.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          folder.style.display = "flex";
        } else {
          folder.style.display = "none";
        }
      });
    });
  });

  // 4. Option 1 Direct Transmission Form (opens pre-filled mailto)
  const commsForm = document.getElementById("comms-form");
  if (commsForm) {
    commsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("sender-name").value.trim();
      const email = document.getElementById("sender-email").value.trim();
      const msg = document.getElementById("sender-msg").value.trim();
      const subject = encodeURIComponent(`[Portfolio Inquiry] from ${name}`);
      const body = encodeURIComponent(`From: ${name} (${email})\n\n${msg}`);
      document.getElementById("form-feedback").textContent = "SYSTEM: Opening your email client to dispatch transmission...";
      window.location.href = `mailto:keshavnest@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // 5. Option 2 Copy Email Button
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("keshavnest@gmail.com").then(() => {
        copyBtn.textContent = "COPIED: keshavnest@gmail.com";
        setTimeout(() => {
          copyBtn.textContent = "COPY EMAIL ADDRESS";
        }, 2500);
      });
    });
  }
});
