/* =========================================================
   MERIDIAN — interactions
   ========================================================= */
(function(){
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Build the 12 hour indices on both watch faces ---------- */
  function buildIndices(container){
    if (!container) return;
    container.innerHTML = "";
    for (var i = 0; i < 12; i++){
      var tick = document.createElement("div");
      tick.className = "tick" + (i % 3 === 0 ? " tick--major" : "");
      tick.style.transform = "rotate(" + (i * 30) + "deg)";
      container.appendChild(tick);
    }
  }
  buildIndices(document.getElementById("heroIndices"));
  buildIndices(document.getElementById("asmIndices"));

  /* ---------- Real-time clock hands: the watches show the actual time ---------- */
  var hourHands   = document.querySelectorAll(".watch__hand--hour");
  var minuteHands = document.querySelectorAll(".watch__hand--minute");
  var secondHands = document.querySelectorAll(".watch__hand--second");

  function updateClock(){
    var now = new Date();
    var h = now.getHours() % 12;
    var m = now.getMinutes();
    var s = now.getSeconds();

    var hourDeg   = (h * 30) + (m * 0.5);
    var minuteDeg = (m * 6) + (s * 0.1);
    var secondDeg = s * 6;

    for (var i = 0; i < hourHands.length; i++)   hourHands[i].style.transform   = "rotate(" + hourDeg + "deg)";
    for (var j = 0; j < minuteHands.length; j++) minuteHands[j].style.transform = "rotate(" + minuteDeg + "deg)";
    for (var k = 0; k < secondHands.length; k++) secondHands[k].style.transform = "rotate(" + secondDeg + "deg)";
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ---------- Nav: solid background once scrolled, mobile toggle ---------- */
  var nav = document.getElementById("siteNav");
  var navToggle = document.getElementById("navToggle");
  var progressFill = document.getElementById("progressFill");

  function onScroll(){
    nav.classList.toggle("is-scrolled", window.scrollY > 40);

    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressFill.style.width = pct + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener("click", function(){
    var isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  document.getElementById("navLinks").addEventListener("click", function(e){
    if (e.target.tagName === "A") nav.classList.remove("is-open");
  });

  /* ---------- Hero watch: gentle tilt that follows the pointer ---------- */
  var heroStage = document.getElementById("heroStage");
  var heroWatch = document.getElementById("heroWatch");
  if (heroStage && !reducedMotion){
    heroStage.addEventListener("mousemove", function(e){
      var rect = heroStage.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      heroWatch.style.transform =
        "rotateX(" + (8 - py * 16) + "deg) rotateY(" + (-18 + px * 26) + "deg)";
    });
    heroStage.addEventListener("mouseleave", function(){
      heroWatch.style.transform = "rotateX(8deg) rotateY(-18deg)";
    });
  }

  /* ---------- Assembly: pinned scroll story ----------
     As the user scrolls through the tall .assembly section, we compute a
     0→1 progress value and use it to (a) rotate the watch in 3D and
     (b) step through four "stages" that each highlight one physical part
     and swap in a matching callout of copy.                                */
  var assemblySection = document.getElementById("assembly");
  var asmWatch    = document.getElementById("asmWatch");
  var asmCase     = document.getElementById("asmCase");
  var asmMovement = document.getElementById("asmMovement");
  var asmGrooves  = document.getElementById("asmGrooves");
  var asmCrystal  = document.getElementById("asmCrystal");
  var callouts    = document.querySelectorAll(".callout");
  var STAGE_COUNT = 4;
  var currentStage = -1;

  function setStage(stage){
    if (stage === currentStage) return;
    currentStage = stage;
    asmCase.classList.toggle("is-focused", stage === 0);
    asmMovement.classList.toggle("is-active", stage === 1);
    asmGrooves.classList.toggle("is-active", stage === 2);
    asmCrystal.style.opacity = stage === 3 ? "1" : (stage >= 3 ? "1" : "");
    callouts.forEach(function(c){
      c.classList.toggle("is-active", Number(c.dataset.stage) === stage);
    });
  }

  function updateAssembly(){
    var rect = assemblySection.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height - vh;
    if (total <= 0) return;

    // progress: 0 when section top reaches viewport top, 1 when it stops being pinned
    var progress = (-rect.top) / total;
    progress = Math.max(0, Math.min(1, progress));

    if (!reducedMotion){
      var rotateY = -40 + progress * 300;
      var rotateX = 8 + Math.sin(progress * Math.PI) * 6;
      asmWatch.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    }

    var stage = Math.min(STAGE_COUNT - 1, Math.floor(progress * STAGE_COUNT));
    if (progress <= 0) stage = -1; // nothing active until the section actually engages
    setStage(stage);
  }

  var ticking = false;
  window.addEventListener("scroll", function(){
    if (!ticking){
      window.requestAnimationFrame(function(){ updateAssembly(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", updateAssembly);
  updateAssembly();

  /* ---------- Generic reveal-on-scroll for the calmer sections ---------- */
  var revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealTargets.forEach(function(t){ io.observe(t); });
  } else {
    revealTargets.forEach(function(t){ t.classList.add("is-visible"); });
  }

  /* ---------- Materials: 3D tilt that tracks the pointer ---------- */
  var materialCards = document.querySelectorAll("[data-tilt]");
  materialCards.forEach(function(card){
    if (reducedMotion) return;
    card.addEventListener("mousemove", function(e){
      var rect = card.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        "rotateX(" + (-py * 10) + "deg) rotateY(" + (px * 12) + "deg) translateY(-4px)";
    });
    card.addEventListener("mouseleave", function(){
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  /* ---------- Reserve form ---------- */
  var form = document.getElementById("reserveForm");
  var note = document.getElementById("formNote");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var email = document.getElementById("email").value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid){
      note.textContent = "That doesn't look like a valid email — try again.";
      return;
    }
    note.textContent = "You're on the list for the next batch. We'll be in touch.";
    form.reset();
  });

})();
