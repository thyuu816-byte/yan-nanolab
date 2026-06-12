const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sectionNavigator = document.querySelector(".section-navigator");
const sectionNavToggle = document.querySelector(".section-nav-toggle");
const sectionNavLinks = Array.from(document.querySelectorAll(".section-nav-panel a"));
const sectionCurrent = document.querySelector(".section-current");
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDots = Array.from(document.querySelectorAll("[data-hero-dot]"));
const heroPrev = document.querySelector("[data-hero-prev]");
const heroNext = document.querySelector("[data-hero-next]");
const teamRoot = document.querySelector("[data-team-root]");
const guestbookForm = document.querySelector(".guestbook-form");
let activeHeroSlide = 0;
let heroTimer;

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

const closeSectionNavigator = () => {
  sectionNavigator?.classList.remove("is-open");
  sectionNavToggle?.setAttribute("aria-expanded", "false");
  sectionNavToggle?.setAttribute("aria-label", "展开章节导航");
};

sectionNavToggle?.addEventListener("click", () => {
  const isOpen = sectionNavigator?.classList.toggle("is-open");
  sectionNavToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  sectionNavToggle.setAttribute("aria-label", isOpen ? "收起章节导航" : "展开章节导航");
});

sectionNavLinks.forEach((link) => {
  link.addEventListener("click", closeSectionNavigator);
});

const getMemberInitials = (name) => Array.from(name).slice(-2).join("");

const getMemberTone = (name) =>
  Array.from(name).reduce((total, character) => total + character.charCodeAt(0), 0) % 6;

const createMemberAvatar = (member, large = false) => {
  if (member.photo) {
    const image = document.createElement("img");
    image.className = "member-avatar member-avatar-photo";
    image.src = member.photo;
    image.alt = `${member.name}头像`;
    image.loading = large ? "eager" : "lazy";
    return image;
  }

  const avatar = document.createElement("div");
  avatar.className = `member-avatar tone-${getMemberTone(member.name)}`;
  avatar.textContent = getMemberInitials(member.name);
  avatar.setAttribute("aria-hidden", "true");
  return avatar;
};

const createDetailItem = (label, value, isEmail = false) => {
  const wrapper = document.createElement("div");
  wrapper.className = "member-detail-item";

  const term = document.createElement("dt");
  term.textContent = label;
  wrapper.appendChild(term);

  const description = document.createElement("dd");
  if (isEmail && value) {
    const link = document.createElement("a");
    link.href = `mailto:${value}`;
    link.textContent = value;
    description.appendChild(link);
  } else {
    description.textContent = value || "待补充";
  }
  wrapper.appendChild(description);

  return wrapper;
};

const resetTeamDetail = (panel) => {
  const roster = panel?.querySelector("[data-team-list]");
  const detail = panel?.querySelector("[data-team-detail]");
  if (!roster || !detail) return;
  roster.hidden = false;
  detail.hidden = true;
  panel.classList.remove("is-viewing-member");
};

const activateTeamPanel = (group, resetDetails = true) => {
  if (!teamRoot) return;
  teamRoot.querySelectorAll("[data-team-group]").forEach((panel) => {
    const isActive = panel.dataset.teamGroup === group;
    panel.classList.toggle("is-active", isActive);
    panel.querySelector(".team-panel-header")?.setAttribute("aria-expanded", String(isActive));
    if (resetDetails && !isActive) resetTeamDetail(panel);
  });
};

const showMemberDetail = (group, member) => {
  if (!teamRoot) return;
  activateTeamPanel(group, false);
  const panel = teamRoot.querySelector(`[data-team-group="${group}"]`);
  const roster = panel?.querySelector("[data-team-list]");
  const detail = panel?.querySelector("[data-team-detail]");
  const content = detail?.querySelector("[data-team-detail-content]");
  if (!panel || !roster || !detail || !content) return;

  content.replaceChildren();

  const hero = document.createElement("div");
  hero.className = "member-detail-hero";
  hero.appendChild(createMemberAvatar(member, true));

  const heading = document.createElement("div");
  const name = document.createElement("h3");
  name.textContent = member.name;
  const level = document.createElement("p");
  level.textContent = member.level || "资料待补充";
  heading.append(name, level);
  hero.appendChild(heading);

  const details = document.createElement("dl");
  details.className = "member-detail-grid";
  details.append(
    createDetailItem("研究方向", member.research),
    createDetailItem("兴趣爱好", member.interests),
    createDetailItem(group === "current" ? "当前状态" : "毕业去向", member.destination),
    createDetailItem("联系方式", member.contact, true)
  );

  content.append(hero, details);
  roster.hidden = true;
  detail.hidden = false;
  panel.classList.add("is-viewing-member");
  detail.scrollTop = 0;
  detail.querySelector("[data-team-back]")?.focus();
};

const createMemberCard = (group, member) => {
  const card = document.createElement("button");
  card.className = "member-card";
  card.type = "button";
  card.setAttribute("aria-label", `展开${member.name}的详细信息`);
  card.appendChild(createMemberAvatar(member));

  const copy = document.createElement("span");
  copy.className = "member-card-copy";
  const name = document.createElement("strong");
  name.textContent = member.name;
  const level = document.createElement("span");
  level.textContent = member.level || "资料待补充";
  copy.append(name, level);

  const expandIcon = document.createElement("span");
  expandIcon.className = "member-card-expand";
  expandIcon.setAttribute("aria-hidden", "true");
  expandIcon.textContent = "↗";

  card.append(copy, expandIcon);
  card.addEventListener("click", () => showMemberDetail(group, member));
  return card;
};

const createDegreeColumn = (group, title, members) => {
  const column = document.createElement("section");
  column.className = "degree-column";

  const heading = document.createElement("div");
  heading.className = "degree-column-heading";
  const name = document.createElement("h3");
  name.textContent = title;
  const count = document.createElement("span");
  count.textContent = `${members.length} 位`;
  heading.append(name, count);

  const cards = document.createElement("div");
  cards.className = "degree-member-list";
  members.forEach((member) => cards.appendChild(createMemberCard(group, member)));

  column.append(heading, cards);
  return column;
};

const renderTeam = () => {
  if (!teamRoot || !window.teamMembers) return;

  Object.entries(window.teamMembers).forEach(([group, members]) => {
    const panel = teamRoot.querySelector(`[data-team-group="${group}"]`);
    const list = panel?.querySelector(`[data-team-list="${group}"]`);
    const count = teamRoot.querySelector(`[data-team-count="${group}"]`);
    if (!panel || !list) return;

    if (count) count.textContent = `${members.length} 位成员`;
    list.replaceChildren();

    if (group === "current") {
      const doctoralMembers = members.filter((member) => member.degree === "doctoral");
      const masterMembers = members.filter((member) => member.degree === "master");
      list.classList.add("is-degree-columns");
      list.append(
        createDegreeColumn(group, "博士 / 硕博研究生", doctoralMembers),
        createDegreeColumn(group, "硕士研究生", masterMembers)
      );
    } else {
      list.classList.remove("is-degree-columns");
      members.forEach((member) => list.appendChild(createMemberCard(group, member)));
    }

    panel.querySelector(".team-panel-header")?.addEventListener("click", () => {
      activateTeamPanel(group);
      resetTeamDetail(panel);
    });

    panel.querySelector("[data-team-back]")?.addEventListener("click", () => {
      resetTeamDetail(panel);
      list.querySelector(".member-card")?.focus();
    });
  });
};

renderTeam();

guestbookForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = guestbookForm.querySelector(".guestbook-submit");
  const status = guestbookForm.querySelector("[data-form-status]");
  const formData = new FormData(guestbookForm);
  const payload = Object.fromEntries(formData.entries());

  submitButton.disabled = true;
  submitButton.textContent = "正在提交";
  guestbookForm.classList.remove("is-success", "is-error");
  if (status) status.textContent = "正在发送留言，请稍候。";

  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || `Form submission failed: ${response.status}`);

    guestbookForm.reset();
    guestbookForm.classList.add("is-success");
    if (status) status.textContent = "留言已收到，感谢您的来访。";
    submitButton.textContent = "提交成功";
  } catch (error) {
    guestbookForm.classList.add("is-error");
    if (status) {
      status.textContent =
        error.message === "MESSAGE_STORAGE_NOT_CONFIGURED"
          ? "留言后台正在配置，请稍后再试。"
          : "暂时未能提交，请检查网络后重试。";
    }
    submitButton.disabled = false;
    submitButton.textContent = "重新提交";
  }
});

document.addEventListener("click", (event) => {
  if (sectionNavigator?.classList.contains("is-open") && !sectionNavigator.contains(event.target)) {
    closeSectionNavigator();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSectionNavigator();
  if (event.key === "Escape") {
    teamRoot?.querySelectorAll(".team-panel.is-viewing-member").forEach(resetTeamDetail);
  }
});

const showHeroSlide = (index) => {
  if (!heroSlides.length) return;
  activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeHeroSlide);
  });
  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeHeroSlide);
  });
};

const startHeroTimer = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || heroSlides.length < 2) return;
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => showHeroSlide(activeHeroSlide + 1), 5000);
};

const moveHeroSlide = (index) => {
  showHeroSlide(index);
  startHeroTimer();
};

heroPrev?.addEventListener("click", () => moveHeroSlide(activeHeroSlide - 1));
heroNext?.addEventListener("click", () => moveHeroSlide(activeHeroSlide + 1));
heroDots.forEach((dot) => {
  dot.addEventListener("click", () => moveHeroSlide(Number(dot.dataset.heroDot)));
});

startHeroTimer();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = sectionNavLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveSection = (sectionId) => {
  const targetHref = `#${sectionId}`;
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === targetHref);
  });
  sectionNavLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === targetHref;
    link.classList.toggle("active", isActive);
    if (isActive && sectionCurrent) {
      sectionCurrent.textContent = link.dataset.sectionLabel || link.textContent.trim();
    }
  });
};

let sectionScrollFrame;
const updateActiveSection = () => {
  const marker = window.innerHeight * 0.38;
  let activeSection = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= marker) {
      activeSection = section;
    }
  });

  if (activeSection) setActiveSection(activeSection.id);
  sectionScrollFrame = undefined;
};

window.addEventListener(
  "scroll",
  () => {
    if (sectionScrollFrame) return;
    sectionScrollFrame = window.requestAnimationFrame(updateActiveSection);
  },
  { passive: true }
);

window.addEventListener("resize", updateActiveSection);
updateActiveSection();
