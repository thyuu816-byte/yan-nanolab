const backToTopButton = document.querySelector("[data-back-to-top]");
const credentialCardsV2 = Array.from(document.querySelectorAll(".credential-card"));
const heroElementV2 = document.querySelector(".hero");
const heroParticleCanvas = document.querySelector("[data-hero-particles]");
const heroParticleContext = heroParticleCanvas?.getContext("2d");
const heroMotionViewport = window.matchMedia("(min-width: 1041px) and (pointer: fine)");
const heroReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let pageChromeFrame;
let heroMotionFrame;
let heroParticleFrame;
let heroPointerX = 0;
let heroPointerY = 0;
let heroPreviousParticleX;
let heroPreviousParticleY;
let heroPointerInside = false;
let heroParticles = [];
let credentialsAreSyncing = false;

const updatePageChrome = () => {
  const scrollableHeight = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const progress = Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100));

  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
  backToTopButton?.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.75);
  pageChromeFrame = undefined;
};

window.addEventListener(
  "scroll",
  () => {
    if (pageChromeFrame) return;
    pageChromeFrame = window.requestAnimationFrame(updatePageChrome);
  },
  { passive: true }
);

window.addEventListener("resize", updatePageChrome);

backToTopButton?.addEventListener("click", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

credentialCardsV2.forEach((card) => {
  card.addEventListener("toggle", () => {
    if (credentialsAreSyncing) return;
    credentialsAreSyncing = true;
    credentialCardsV2.forEach((otherCard) => {
      if (otherCard !== card) otherCard.open = card.open;
    });
    window.setTimeout(() => {
      credentialsAreSyncing = false;
    }, 0);
  });
});

const resetHeroMotion = () => {
  if (!heroElementV2) return;
  heroPointerInside = false;
  heroPreviousParticleX = undefined;
  heroPreviousParticleY = undefined;
  heroElementV2.classList.remove("is-pointer-active");
  heroElementV2.style.setProperty("--hero-shift-x", "0px");
  heroElementV2.style.setProperty("--hero-shift-y", "0px");
  heroElementV2.style.setProperty("--hero-grid-x", "0px");
  heroElementV2.style.setProperty("--hero-grid-y", "0px");
  heroElementV2.style.setProperty("--hero-light-opacity", "0");
};

const resizeHeroParticleCanvas = () => {
  if (!heroElementV2 || !heroParticleCanvas || !heroParticleContext) return;
  const rect = heroElementV2.getBoundingClientRect();
  const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
  heroParticleCanvas.width = Math.max(1, Math.round(rect.width * pixelRatio));
  heroParticleCanvas.height = Math.max(1, Math.round(rect.height * pixelRatio));
  heroParticleContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
};

const renderHeroParticles = () => {
  if (!heroParticleCanvas || !heroParticleContext || heroReducedMotion.matches || !heroMotionViewport.matches) {
    heroParticleFrame = undefined;
    return;
  }

  const width = heroParticleCanvas.clientWidth;
  const height = heroParticleCanvas.clientHeight;
  heroParticleContext.clearRect(0, 0, width, height);
  heroParticleContext.globalCompositeOperation = "lighter";

  heroParticles = heroParticles.filter((particle) => particle.life > 0.025);
  heroParticles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= 0.94;
    particle.vy *= 0.94;
    particle.life *= 0.935;

    const alpha = particle.life * particle.life;
    const gradient = heroParticleContext.createRadialGradient(
      particle.x,
      particle.y,
      0,
      particle.x,
      particle.y,
      particle.size * 5
    );
    gradient.addColorStop(0, `rgba(196, 255, 248, ${0.58 * alpha})`);
    gradient.addColorStop(0.24, `rgba(92, 213, 204, ${0.32 * alpha})`);
    gradient.addColorStop(1, "rgba(57, 155, 148, 0)");
    heroParticleContext.fillStyle = gradient;
    heroParticleContext.beginPath();
    heroParticleContext.arc(particle.x, particle.y, particle.size * 5, 0, Math.PI * 2);
    heroParticleContext.fill();
  });

  if (heroParticles.length) {
    heroParticleFrame = window.requestAnimationFrame(renderHeroParticles);
  } else {
    heroParticleFrame = undefined;
  }
};

const addHeroParticleTrail = (x, y) => {
  if (!heroParticleContext || heroReducedMotion.matches || !heroMotionViewport.matches) return;
  if (heroPreviousParticleX === undefined || heroPreviousParticleY === undefined) {
    heroPreviousParticleX = x;
    heroPreviousParticleY = y;
    return;
  }

  const deltaX = x - heroPreviousParticleX;
  const deltaY = y - heroPreviousParticleY;
  const distance = Math.hypot(deltaX, deltaY);
  if (distance < 5) return;

  const particleCount = Math.min(3, Math.max(1, Math.floor(distance / 22)));
  for (let index = 0; index < particleCount; index += 1) {
    const progress = (index + 1) / (particleCount + 1);
    heroParticles.push({
      x: heroPreviousParticleX + deltaX * progress + (Math.random() - 0.5) * 3,
      y: heroPreviousParticleY + deltaY * progress + (Math.random() - 0.5) * 3,
      vx: -deltaX * 0.018 + (Math.random() - 0.5) * 0.38,
      vy: -deltaY * 0.018 + (Math.random() - 0.5) * 0.38,
      life: 0.82 + Math.random() * 0.18,
      size: 0.75 + Math.random() * 0.65,
    });
  }

  heroParticles = heroParticles.slice(-26);
  heroPreviousParticleX = x;
  heroPreviousParticleY = y;
  if (!heroParticleFrame) heroParticleFrame = window.requestAnimationFrame(renderHeroParticles);
};

const renderHeroMotion = () => {
  if (!heroElementV2 || heroReducedMotion.matches || !heroMotionViewport.matches) {
    resetHeroMotion();
    heroMotionFrame = undefined;
    return;
  }

  const rect = heroElementV2.getBoundingClientRect();
  const normalizedX = Math.max(-1, Math.min(1, ((heroPointerX - rect.left) / rect.width - 0.5) * 2));
  const normalizedY = Math.max(-1, Math.min(1, ((heroPointerY - rect.top) / rect.height - 0.5) * 2));
  const lightX = Math.max(0, Math.min(rect.width, heroPointerX - rect.left));
  const lightY = Math.max(0, Math.min(rect.height, heroPointerY - rect.top));

  addHeroParticleTrail(lightX, lightY);
  heroElementV2.classList.add("is-pointer-active");
  heroElementV2.style.setProperty("--hero-shift-x", `${(-normalizedX * 7).toFixed(2)}px`);
  heroElementV2.style.setProperty("--hero-shift-y", `${(-normalizedY * 5).toFixed(2)}px`);
  heroElementV2.style.setProperty("--hero-grid-x", `${(normalizedX * 3).toFixed(2)}px`);
  heroElementV2.style.setProperty("--hero-grid-y", `${(normalizedY * 2).toFixed(2)}px`);
  heroElementV2.style.setProperty("--hero-light-x", `${lightX.toFixed(1)}px`);
  heroElementV2.style.setProperty("--hero-light-y", `${lightY.toFixed(1)}px`);
  heroElementV2.style.setProperty("--hero-light-opacity", "1");
  heroMotionFrame = undefined;
};

heroElementV2?.addEventListener(
  "pointermove",
  (event) => {
    heroPointerInside = true;
    heroPointerX = event.clientX;
    heroPointerY = event.clientY;
    if (heroMotionFrame) return;
    heroMotionFrame = window.requestAnimationFrame(renderHeroMotion);
  },
  { passive: true }
);

heroElementV2?.addEventListener("pointerleave", resetHeroMotion);
heroMotionViewport.addEventListener?.("change", resetHeroMotion);
heroReducedMotion.addEventListener?.("change", resetHeroMotion);
window.addEventListener("resize", resizeHeroParticleCanvas);

if (heroElementV2 && heroParticleCanvas) {
  resizeHeroParticleCanvas();
  new ResizeObserver(resizeHeroParticleCanvas).observe(heroElementV2);
}

updatePageChrome();
