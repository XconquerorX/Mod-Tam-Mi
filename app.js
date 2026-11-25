const STORAGE_KEY = "thai_mod_hub_state_v6";
const SESSION_ROLE_KEY = "thai_mod_hub_role";
const SESSION_USER_KEY = "thai_mod_hub_username";
const CATEGORIES = ["ทั้งหมด", "RPG", "Simulation", "Survival", "UI & QoL"];

const RANK_LEVELS = [
  { level: 1, name: "มือใหม่หัดลงมอด", minExp: 0 },
  { level: 2, name: "นักสำรวจมอด", minExp: 100 },
  { level: 3, name: "นักล่าแพ็กแปล", minExp: 250 },
  { level: 4, name: "ผู้ชำนาญการมอด", minExp: 500 },
  { level: 5, name: "ผู้พิทักษ์คลังมอด", minExp: 900 },
  { level: 6, name: "จ้าวแห่งมอดแปลไทย", minExp: 1500 },
  { level: 7, name: "ตำนานผู้สนับสนุน", minExp: 2500 }
];

function makeSvgAvatar(bg, fg, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="${bg}"/><circle cx="48" cy="38" r="16" fill="${fg}"/><path d="M22 80c2-15 14-24 26-24s24 9 26 24" fill="${fg}"/><text x="48" y="90" font-size="11" text-anchor="middle" fill="${fg}" font-family="sans-serif">${label}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

const AVATAR_PRESETS = [
  { id: "av-default", label: "ผู้เล่นพื้นฐาน", src: makeSvgAvatar("#e2e8f0", "#334155", "USER"), costPts: 0, reqExp: 0 },
  { id: "av-sprout", label: "ชาวไร่มือใหม่", src: makeSvgAvatar("#dcfce7", "#15803d", "FARM"), costPts: 20, reqExp: 50 },
  { id: "av-knight", label: "อัศวินสายมอด", src: makeSvgAvatar("#fef3c7", "#b45309", "KNIGHT"), costPts: 60, reqExp: 250 },
  { id: "av-mage", label: "จอมเวทย์แปลภาษา", src: makeSvgAvatar("#ede9fe", "#6d28d9", "MAGE"), costPts: 120, reqExp: 900 }
];

const FRAME_PRESETS = [
  { id: "frame-none", cssClass: "frame-none", label: "กรอบเรียบ", costPts: 0, reqExp: 0 },
  { id: "frame-emerald", cssClass: "frame-emerald", label: "กรอบเขียวมรกต", costPts: 30, reqExp: 100 },
  { id: "frame-amethyst", cssClass: "frame-amethyst", label: "กรอบอเมทิสต์", costPts: 80, reqExp: 500 },
  { id: "frame-gold", cssClass: "frame-gold", label: "กรอบทองคำ VIP", costPts: 150, reqExp: 1500 },
  { id: "frame-crimson", cssClass: "frame-crimson", label: "กรอบชาดตำนาน", costPts: 250, reqExp: 2500 }
];

const TITLE_PRESETS = [
  { id: "t-newbie", label: "นักผจญภัยหน้าใหม่", costPts: 0, reqExp: 0 },
  { id: "t-reader", label: "หนอนหนังสือแปลไทย", costPts: 25, reqExp: 100 },
  { id: "t-hunter", label: "นักล่ามอดหายาก", costPts: 70, reqExp: 500 },
  { id: "t-patron", label: "ผู้สนับสนุนหลัก", costPts: 140, reqExp: 1500 },
  { id: "t-legend", label: "ราชันแห่งคลังมอด", costPts: 250, reqExp: 2500 }
];

const DEFAULT_STATE = {
  settings: {
    title: "Thai Mod Hub",
    subtitle: "รวมมอดเกมแปลไทย อ่านง่าย ใช้งานสะดวก",
    announcement: "เริ่มต้น 0 คะแนน & 0 EXP ทุกคน — โหลดมอด/เกม ทำกิจกรรม หรือโดเนท เพื่ออัปยศ 7 ระดับและปลดล็อกของตกแต่ง!",
    accent: "#0d9488",
    adminUser: "admin",
    adminPass: "1234",
    pointsPerDownload: 10,
    expPerDownload: 25,
    vipThreshold: 100,
    requestCost: 50
  },
  users: [
    {
      username: "player01",
      displayName: "player01",
      password: "123",
      points: 0,
      exp: 0,
      isVip: false,
      avatarSrc: AVATAR_PRESETS[0].src,
      frameId: "frame-none",
      titleLabel: "นักผจญภัยหน้าใหม่",
      unlockedAvatars: ["av-default"],
      unlockedFrames: ["frame-none"],
      unlockedTitles: ["t-newbie"]
    }
  ],
  requests: [],
  mods: [
    {
      id: "mod-1",
      name: "แพ็กแปลไทยเควสต์และคำอธิบายไอเทม (v1.2)",
      game: "Otherworld [Dungeons & Dragons]",
      category: "RPG",
      desc: "แปลคำอธิบายไอเทมหลัก เควสต์เริ่มต้น และข้อความเมนูสำคัญ โดยคงชื่อไอเทมภาษาอังกฤษเดิมไว้เพื่อให้ค้นหาง่าย",
      install: "1. แตกไฟล์ ZIP\n2. นำโฟลเดอร์ไปวางในโฟลเดอร์ resourcepacks ของเกม\n3. เปิดเกมและเลือกแพ็กภาษาไทย",
      url: "https://example.com/mod-rpg-th",
      downloads: 342,
      createdAt: 1732000000000
    },
    {
      id: "mod-2",
      name: "แปลไทยบทสนทนาชาวบ้านและป้ายฟาร์ม",
      game: "Stardew Valley",
      category: "Simulation",
      desc: "แปลบทสนทนาตัวละคร ชื่อฤดูกาล และคำแนะนำการปลูกพืชให้เข้าใจง่ายในสไตล์เกมทำฟาร์ม",
      install: "1. สำรองไฟล์ภาษาเดิมไว้ก่อน\n2. วางไฟล์แปลไทยทับในโฟลเดอร์ Content ของตัวเกม",
      url: "https://example.com/mod-farm-th",
      downloads: 289,
      createdAt: 1732086400000
    },
    {
      id: "mod-3",
      name: "แปลไทยเมนูเอาชีวิตรอดและระบบคราฟต์",
      game: "Project Zomboid",
      category: "Survival",
      desc: "แปลรายละเอียดสูตรคราฟต์ อาชีพเริ่มต้น และคำอธิบายสถานะตัวละครให้เข้าใจง่าย",
      install: "1. นำโฟลเดอร์มอดไปวางใน Zomboid/mods\n2. เปิดใช้งานมอดในเมนูหลักของเกม",
      url: "https://example.com/mod-pz-th",
      downloads: 215,
      createdAt: 1732172800000
    },
    {
      id: "mod-4",
      name: "UI แสดงข้อมูลไอเทมและสถานะภาษาไทย",
      game: "Minecraft Modded",
      category: "UI & QoL",
      desc: "ปรับปรุงคำอธิบายหน้าต่าง UI และคีย์ลัดให้เป็นภาษาไทยที่กระชับ อ่านสบายตา",
      install: "1. วางไฟล์ในโฟลเดอร์ resourcepacks\n2. เลือกใช้งานในตั้งค่าภาษา",
      url: "https://example.com/mod-ui-th",
      downloads: 174,
      createdAt: 1732259200000
    },
    {
      id: "mod-5",
      name: "แปลไทยระบบสกิลและสายอาชีพ",
      game: "Fantasy Action RPG",
      category: "RPG",
      desc: "แปลคำอธิบายสกิลติดตัวและโบนัสชุดเกราะทั้งหมดเพื่อช่วยจัดบิลด์ได้ง่ายขึ้น",
      install: "1. แตกไฟล์ลงในโฟลเดอร์มอดของเกม\n2. รีสตาร์ทตัวเกม",
      url: "https://example.com/mod-skill-th",
      downloads: 128,
      createdAt: 1732345600000
    }
  ]
};

let state = loadState();
let activeCategory = "ทั้งหมด";
let currentRole = sessionStorage.getItem(SESSION_ROLE_KEY) || "guest";
let currentUsername = sessionStorage.getItem(SESSION_USER_KEY) || "";
let memberSubmitMode = "login";
let pendingAvatarSrc = null;

function normalizeUser(u) {
  return {
    username: u.username,
    displayName: u.displayName || u.username,
    password: u.password,
    points: Number(u.points) || 0,
    exp: Number(u.exp) || 0,
    isVip: Boolean(u.isVip),
    avatarSrc: u.avatarSrc || AVATAR_PRESETS[0].src,
    frameId: u.frameId || "frame-none",
    titleLabel: u.titleLabel || "นักผจญภัยหน้าใหม่",
    unlockedAvatars: Array.isArray(u.unlockedAvatars) && u.unlockedAvatars.length ? u.unlockedAvatars : ["av-default"],
    unlockedFrames: Array.isArray(u.unlockedFrames) && u.unlockedFrames.length ? u.unlockedFrames : ["frame-none"],
    unlockedTitles: Array.isArray(u.unlockedTitles) && u.unlockedTitles.length ? u.unlockedTitles : ["t-newbie"]
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return {
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
      users: Array.isArray(parsed.users) ? parsed.users.map(normalizeUser) : structuredClone(DEFAULT_STATE.users),
      requests: Array.isArray(parsed.requests) ? parsed.requests : [],
      mods: Array.isArray(parsed.mods) ? parsed.mods : structuredClone(DEFAULT_STATE.mods)
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getRankByExp(exp) {
  let current = RANK_LEVELS[0];
  for (const r of RANK_LEVELS) {
    if ((Number(exp) || 0) >= r.minExp) current = r;
  }
  return current;
}

function getFrameClass(frameId) {
  const found = FRAME_PRESETS.find((f) => f.id === frameId);
  return found ? found.cssClass : "frame-none";
}

function getCurrentMember() {
  if (currentRole !== "user") return null;
  const idx = state.users.findIndex((u) => u.username === currentUsername);
  if (idx === -1) return null;
  state.users[idx] = normalizeUser(state.users[idx]);
  return state.users[idx];
}

function syncMemberVipStatus(member) {
  if (!member) return;
  if (member.points >= Number(state.settings.vipThreshold)) {
    member.isVip = true;
  }
}

function updateAuthUI() {
  const isAdmin = currentRole === "admin";
  const member = getCurrentMember();

  document.getElementById("guestAvatarImg").src = AVATAR_PRESETS[0].src;
  document.getElementById("adminAvatarImg").src = AVATAR_PRESETS[2].src;

  document.body.classList.toggle("is-admin", isAdmin);

  const authBtn = document.getElementById("authBtn");
  const reqBtn = document.getElementById("openRequestBtn");
  const guestBox = document.getElementById("guestProfileBox");
  const userBox = document.getElementById("userProfileBox");
  const adminBox = document.getElementById("adminProfileBox");

  if (member) {
    syncMemberVipStatus(member);
    const rank = getRankByExp(member.exp);
    authBtn.textContent = "ออกจากระบบ";
    authBtn.className = "btn btn-danger";
    reqBtn.style.display = "inline-block";

    guestBox.style.display = "none";
    userBox.style.display = "block";
    adminBox.style.display = "none";

    document.getElementById("currentUserName").textContent = member.displayName;
    document.getElementById("currentUserTitle").textContent = `ฉายา: ${member.titleLabel}`;
    document.getElementById("currentUserRank").textContent = `Lv.${rank.level} ${rank.name}`;
    document.getElementById("currentUserExp").textContent = `${member.exp} EXP`;
    document.getElementById("currentUserPts").textContent = `${member.points} คะแนน`;
    document.getElementById("currentUserVip").classList.toggle("active", Boolean(member.isVip));

    document.getElementById("userAvatarImg").src = member.avatarSrc;
    document.getElementById("userAvatarFrame").className = `avatar-frame ${getFrameClass(member.frameId)}`;
  } else if (isAdmin) {
    authBtn.textContent = "ออกจากระบบ";
    authBtn.className = "btn btn-danger";
    reqBtn.style.display = "none";

    guestBox.style.display = "none";
    userBox.style.display = "none";
    adminBox.style.display = "block";
    document.getElementById("adminProfileName").textContent = `บัญชี: ${state.settings.adminUser}`;
  } else {
    authBtn.textContent = "เข้าสู่ระบบ";
    authBtn.className = "btn btn-primary";
    reqBtn.style.display = "none";

    guestBox.style.display = "block";
    userBox.style.display = "none";
    adminBox.style.display = "none";
  }

  renderUserRankSidebar();
  if (isAdmin) renderAdminPanels();
}

function renderRankTiers() {
  const el = document.getElementById("rankTiersList");
  el.innerHTML = "";
  RANK_LEVELS.forEach((r) => {
    const row = document.createElement("div");
    row.className = "rank-tier-row";
    row.innerHTML = `<span><strong>Lv.${r.level}</strong> ${r.name}</span><span>${r.minExp} EXP</span>`;
    el.appendChild(row);
  });
}

function renderUserRankSidebar() {
  const listEl = document.getElementById("userRankList");
  listEl.innerHTML = "";

  const sortedUsers = [...state.users]
    .map(normalizeUser)
    .sort((a, b) => b.exp - a.exp || b.points - a.points)
    .slice(0, 7);

  if (!sortedUsers.length) {
    listEl.innerHTML = `<p style="font-size:0.84rem; color:var(--muted); margin:0;">ยังไม่มีสมาชิกในระบบ</p>`;
    return;
  }

  sortedUsers.forEach((u, idx) => {
    const rank = getRankByExp(u.exp);
    const item = document.createElement("div");
    item.className = "rank-item user-rank-item";
    item.innerHTML = `
      <div class="rank-num">${idx + 1}</div>
      <div class="avatar-frame sm ${getFrameClass(u.frameId)}">
        <img src="${u.avatarSrc}" alt="${u.displayName}" />
      </div>
      <div class="rank-info">
        <div class="rank-name">${u.displayName} ${u.isVip ? '<span class="vip-tag active">VIP</span>' : ""}</div>
        <div class="rank-meta">Lv.${rank.level} ${rank.name} • ${u.exp} EXP</div>
        <div class="rank-meta" style="color:var(--title-text);">ฉายา: ${u.titleLabel}</div>
      </div>
    `;
    listEl.appendChild(item);
  });
}

function applySettings() {
  const s = state.settings;
  document.title = s.title;
  document.getElementById("siteTitle").textContent = s.title;
  document.getElementById("siteSubtitle").textContent = s.subtitle;
  const annEl = document.getElementById("announcementBar");
  annEl.textContent = s.announcement;
  annEl.style.display = s.announcement.trim() ? "block" : "none";
  document.documentElement.style.setProperty("--accent", s.accent);

  document.getElementById("ruleSummaryText").textContent =
    `โหลดมอด/เกมรับ +${s.pointsPerDownload} คะแนน และ +${s.expPerDownload} EXP • รับเพิ่มได้จากการโดเนทหรือทำกิจกรรม • สะสมครบ ${s.vipThreshold} คะแนนรับ VIP • ใช้ ${s.requestCost} คะแนนขอมอดเกมต่อไป`;

  document.getElementById("cfgTitle").value = s.title;
  document.getElementById("cfgSubtitle").value = s.subtitle;
  document.getElementById("cfgAnnouncement").value = s.announcement;
  document.getElementById("cfgAccent").value = s.accent;
  document.getElementById("cfgPtsPerDl").value = s.pointsPerDownload;
  document.getElementById("cfgExpPerDl").value = s.expPerDownload;
  document.getElementById("cfgVipThreshold").value = s.vipThreshold;
  document.getElementById("cfgRequestCost").value = s.requestCost;
  document.getElementById("cfgAdminUser").value = s.adminUser;
  document.getElementById("cfgAdminPass").value = s.adminPass;
}

function renderTopRank() {
  const top5 = [...state.mods]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5);

  const container = document.getElementById("topRankList");
  container.innerHTML = "";
  top5.forEach((mod, idx) => {
    const row = document.createElement("div");
    row.className = "rank-item";
    row.innerHTML = `
      <div class="rank-num">${idx + 1}</div>
      <div class="rank-info">
        <div class="rank-name">${mod.name}</div>
        <div class="rank-meta">${mod.game} • ${mod.downloads} โหลด</div>
      </div>
    `;
    row.onclick = () => openDetailModal(mod.id);
    container.appendChild(row);
  });
}

function renderAdminPanels() {
  const userList = document.getElementById("adminUserList");
  userList.innerHTML = state.users.length
    ? ""
    : `<p style="font-size:0.85rem; color:var(--muted);">ยังไม่มีสมาชิกในระบบ</p>`;

  state.users.map(normalizeUser).forEach((u, i) => {
    const realUser = state.users[i];
    const rank = getRankByExp(u.exp);
    const item = document.createElement("div");
    item.className = "admin-list-item";
    item.innerHTML = `
      <div style="flex: 1 1 200px;">
        <strong>${u.displayName}</strong> <span style="color:var(--muted);">(@${u.username})</span> ${u.isVip ? '<span class="vip-tag active">VIP</span>' : ""}
        <div style="color:var(--muted); font-size:0.8rem;">Lv.${rank.level} ${rank.name} • <strong>${u.exp} EXP</strong> • <strong>${u.points} คะแนน</strong></div>
      </div>
      <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
        <div style="display:flex; gap:4px; align-items:center;">
          <input type="number" data-input="pts" placeholder="คะแนน" style="width:82px; padding:4px 8px; font-size:0.82rem;" />
          <button class="btn btn-sm" data-act="addPts">+คะแนน</button>
        </div>
        <div style="display:flex; gap:4px; align-items:center;">
          <input type="number" data-input="exp" placeholder="EXP" style="width:82px; padding:4px 8px; font-size:0.82rem;" />
          <button class="btn btn-sm" data-act="addExp">+EXP</button>
        </div>
        <button class="btn btn-vip btn-sm" data-act="toggleVip">${u.isVip ? "ปลด VIP" : "ให้ VIP"}</button>
      </div>
    `;

    item.querySelector('[data-act="addPts"]').onclick = () => {
      const val = Number(item.querySelector('[data-input="pts"]').value);
      if (!val) return;
      realUser.points = Math.max(0, (Number(realUser.points) || 0) + val);
      syncMemberVipStatus(realUser);
      saveState();
      renderAdminPanels();
      renderUserRankSidebar();
    };

    item.querySelector('[data-act="addExp"]').onclick = () => {
      const val = Number(item.querySelector('[data-input="exp"]').value);
      if (!val) return;
      realUser.exp = Math.max(0, (Number(realUser.exp) || 0) + val);
      saveState();
      renderAdminPanels();
      renderUserRankSidebar();
    };

    item.querySelector('[data-act="toggleVip"]').onclick = () => {
      realUser.isVip = !realUser.isVip;
      saveState();
      renderAdminPanels();
      renderUserRankSidebar();
    };

    userList.appendChild(item);
  });

  const reqList = document.getElementById("adminRequestList");
  reqList.innerHTML = state.requests.length
    ? ""
    : `<p style="font-size:0.85rem; color:var(--muted);">ยังไม่มีคำขอมอดแปลไทย</p>`;

  state.requests.forEach((r) => {
    const item = document.createElement("div");
    item.className = "admin-list-item";
    item.innerHTML = `
      <div>
        <strong>${r.game}</strong> <span style="color:var(--muted);">(${r.status})</span>
        <div style="font-size:0.8rem; color:var(--muted);">โดย: ${r.username} ${r.ref ? "• " + r.ref : ""}</div>
      </div>
      <div style="display:flex; gap:6px;">
        <button class="btn btn-primary btn-sm" data-act="done">รับแปลแล้ว</button>
        <button class="btn btn-danger btn-sm" data-act="del">ลบ</button>
      </div>
    `;
    item.querySelector('[data-act="done"]').onclick = () => {
      r.status = "กำลังดำเนินการแปล";
      saveState();
      renderAdminPanels();
    };
    item.querySelector('[data-act="del"]').onclick = () => {
      state.requests = state.requests.filter((x) => x.id !== r.id);
      saveState();
      renderAdminPanels();
    };
    reqList.appendChild(item);
  });
}

function renderCategories() {
  const bar = document.getElementById("categoryBar");
  bar.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (activeCategory === cat ? " active" : "");
    btn.textContent = cat;
    btn.onclick = () => {
      activeCategory = cat;
      renderCategories();
      renderMods();
    };
    bar.appendChild(btn);
  });
}

function renderMods() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const sortBy = document.getElementById("sortSelect").value;

  let list = state.mods.filter((m) => {
    const matchCat = activeCategory === "ทั้งหมด" || m.category === activeCategory;
    const matchText =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.game.toLowerCase().includes(q) ||
      m.desc.toLowerCase().includes(q);
    return matchCat && matchText;
  });

  list.sort((a, b) =>
    sortBy === "downloads" ? b.downloads - a.downloads : b.createdAt - a.createdAt
  );

  const grid = document.getElementById("modGrid");
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<p style="color:var(--muted);">ไม่พบมอดที่ตรงกับเงื่อนไขการค้นหา</p>`;
    return;
  }

  list.forEach((mod) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <span class="badge">${mod.category}</span>
        <h3 class="card-title">${mod.name}</h3>
        <div class="card-game">เกม: ${mod.game}</div>
        <p class="card-desc">${mod.desc}</p>
      </div>
      <div>
        <div class="card-footer">
          <span>ดาวน์โหลดแล้ว ${mod.downloads} ครั้ง</span>
          <span>ดูรายละเอียด →</span>
        </div>
        <div class="card-edit-bar" onclick="event.stopPropagation()">
          <button class="btn btn-sm" data-action="edit">แก้ไข</button>
          <button class="btn btn-danger btn-sm" data-action="delete">ลบ</button>
        </div>
      </div>
    `;

    card.onclick = () => openDetailModal(mod.id);
    card.querySelector('[data-action="edit"]').onclick = () => openEditorModal(mod.id);
    card.querySelector('[data-action="delete"]').onclick = () => deleteMod(mod.id);
    grid.appendChild(card);
  });

  renderTopRank();
}

function openDetailModal(id) {
  const mod = state.mods.find((m) => m.id === id);
  if (!mod) return;
  document.getElementById("detailCategory").textContent = mod.category;
  document.getElementById("detailTitle").textContent = mod.name;
  document.getElementById("detailGame").textContent = `เกม: ${mod.game}`;
  document.getElementById("detailDesc").textContent = mod.desc;
  document.getElementById("detailInstall").textContent = mod.install;

  const dlLink = document.getElementById("detailDownloadLink");
  dlLink.href = mod.url;
  dlLink.onclick = () => {
    mod.downloads += 1;
    const member = getCurrentMember();
    if (member) {
      member.points += Number(state.settings.pointsPerDownload) || 0;
      member.exp += Number(state.settings.expPerDownload) || 0;
      syncMemberVipStatus(member);
      updateAuthUI();
    }
    saveState();
    renderMods();
  };

  document.getElementById("detailModal").showModal();
}

function openEditorModal(id = null) {
  if (currentRole !== "admin") return;
  const form = document.getElementById("modForm");
  form.reset();
  if (id) {
    const mod = state.mods.find((m) => m.id === id);
    if (!mod) return;
    document.getElementById("editorTitle").textContent = "แก้ไขข้อมูลมอด";
    document.getElementById("modId").value = mod.id;
    document.getElementById("modName").value = mod.name;
    document.getElementById("modGame").value = mod.game;
    document.getElementById("modCategory").value = mod.category;
    document.getElementById("modDesc").value = mod.desc;
    document.getElementById("modInstall").value = mod.install;
    document.getElementById("modUrl").value = mod.url;
  } else {
    document.getElementById("editorTitle").textContent = "เพิ่มมอดแปลไทยใหม่";
    document.getElementById("modId").value = "";
  }
  document.getElementById("editorModal").showModal();
}

function deleteMod(id) {
  if (currentRole !== "admin") return;
  if (!confirm("ต้องการลบมอดรายการนี้ใช่หรือไม่?")) return;
  state.mods = state.mods.filter((m) => m.id !== id);
  saveState();
  renderMods();
}

// ตั้งค่าโปรไฟล์และปลดล็อกของตกแต่ง
function renderCosmeticsInModal(member) {
  const rank = getRankByExp(member.exp);
  document.getElementById("profileStatsSummary").textContent =
    `ยศปัจจุบัน: Lv.${rank.level} ${rank.name} • EXP: ${member.exp} • คะแนนสะสม: ${member.points} คะแนน`;

  const avGrid = document.getElementById("avatarPresetGrid");
  avGrid.innerHTML = "";
  AVATAR_PRESETS.forEach((av) => {
    const isUnlocked = member.unlockedAvatars.includes(av.id);
    const isEquipped = (pendingAvatarSrc || member.avatarSrc) === av.src;
    const card = document.createElement("div");
    card.className = "cosmetic-card" + (isEquipped ? " equipped" : "");
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="${av.src}" alt="${av.label}" style="width:34px; height:34px; border-radius:50%;" />
        <strong>${av.label}</strong>
      </div>
      <div style="color:var(--muted); font-size:0.76rem;">
        ${isUnlocked ? "ปลดล็อกแล้ว" : `ใช้ ${av.costPts} คะแนน หรือ ${av.reqExp} EXP`}
      </div>
    `;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = isEquipped ? "btn btn-primary btn-sm" : "btn btn-sm";
    if (isEquipped) {
      btn.textContent = "กำลังใช้งาน";
    } else if (isUnlocked) {
      btn.textContent = "สวมใส่";
      btn.onclick = () => {
        pendingAvatarSrc = av.src;
        document.getElementById("profileAvatarUrl").value = av.src;
        renderCosmeticsInModal(member);
      };
    } else {
      btn.textContent = `ปลดล็อก (${av.costPts} Pts)`;
      btn.onclick = () => {
        if (member.exp >= av.reqExp || member.points >= av.costPts) {
          if (member.exp < av.reqExp) member.points -= av.costPts;
          member.unlockedAvatars.push(av.id);
          pendingAvatarSrc = av.src;
          document.getElementById("profileAvatarUrl").value = av.src;
          saveState();
          updateAuthUI();
          renderCosmeticsInModal(member);
        } else {
          alert("คะแนนหรือ EXP ยังไม่ถึงเกณฑ์ปลดล็อก");
        }
      };
    }
    card.appendChild(btn);
    avGrid.appendChild(card);
  });

  const frGrid = document.getElementById("framePresetGrid");
  frGrid.innerHTML = "";
  FRAME_PRESETS.forEach((fr) => {
    const isUnlocked = member.unlockedFrames.includes(fr.id);
    const isEquipped = member.frameId === fr.id;
    const card = document.createElement("div");
    card.className = "cosmetic-card" + (isEquipped ? " equipped" : "");
    card.innerHTML = `
      <strong>${fr.label}</strong>
      <div style="color:var(--muted); font-size:0.76rem;">
        ${isUnlocked ? "ปลดล็อกแล้ว" : `ใช้ ${fr.costPts} คะแนน หรือ ${fr.reqExp} EXP`}
      </div>
    `;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = isEquipped ? "btn btn-primary btn-sm" : "btn btn-sm";
    if (isEquipped) {
      btn.textContent = "กำลังใช้งาน";
    } else if (isUnlocked) {
      btn.textContent = "สวมใส่";
      btn.onclick = () => {
        member.frameId = fr.id;
        saveState();
        updateAuthUI();
        renderCosmeticsInModal(member);
      };
    } else {
      btn.textContent = `ปลดล็อก (${fr.costPts} Pts)`;
      btn.onclick = () => {
        if (member.exp >= fr.reqExp || member.points >= fr.costPts) {
          if (member.exp < fr.reqExp) member.points -= fr.costPts;
          member.unlockedFrames.push(fr.id);
          member.frameId = fr.id;
          saveState();
          updateAuthUI();
          renderCosmeticsInModal(member);
        } else {
          alert("คะแนนหรือ EXP ยังไม่ถึงเกณฑ์ปลดล็อก");
        }
      };
    }
    card.appendChild(btn);
    frGrid.appendChild(card);
  });

  const tiGrid = document.getElementById("titlePresetGrid");
  tiGrid.innerHTML = "";
  TITLE_PRESETS.forEach((ti) => {
    const isUnlocked = member.unlockedTitles.includes(ti.id);
    const isEquipped = member.titleLabel === ti.label;
    const card = document.createElement("div");
    card.className = "cosmetic-card" + (isEquipped ? " equipped" : "");
    card.innerHTML = `
      <strong>${ti.label}</strong>
      <div style="color:var(--muted); font-size:0.76rem;">
        ${isUnlocked ? "ปลดล็อกแล้ว" : `ใช้ ${ti.costPts} คะแนน หรือ ${ti.reqExp} EXP`}
      </div>
    `;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = isEquipped ? "btn btn-primary btn-sm" : "btn btn-sm";
    if (isEquipped) {
      btn.textContent = "กำลังใช้งาน";
    } else if (isUnlocked) {
      btn.textContent = "สวมใส่";
      btn.onclick = () => {
        member.titleLabel = ti.label;
        saveState();
        updateAuthUI();
        renderCosmeticsInModal(member);
      };
    } else {
      btn.textContent = `ปลดล็อก (${ti.costPts} Pts)`;
      btn.onclick = () => {
        if (member.exp >= ti.reqExp || member.points >= ti.costPts) {
          if (member.exp < ti.reqExp) member.points -= ti.costPts;
          member.unlockedTitles.push(ti.id);
          member.titleLabel = ti.label;
          saveState();
          updateAuthUI();
          renderCosmeticsInModal(member);
        } else {
          alert("คะแนนหรือ EXP ยังไม่ถึงเกณฑ์ปลดล็อก");
        }
      };
    }
    card.appendChild(btn);
    tiGrid.appendChild(card);
  });
}

document.getElementById("openProfileSettingsBtn").onclick = () => {
  const member = getCurrentMember();
  if (!member) return;
  pendingAvatarSrc = member.avatarSrc;
  document.getElementById("profileDisplayName").value = member.displayName;
  document.getElementById("profileNewPass").value = "";
  document.getElementById("profileAvatarUrl").value = member.avatarSrc;
  document.getElementById("profileAvatarFile").value = "";
  renderCosmeticsInModal(member);
  document.getElementById("profileModal").showModal();
};

document.getElementById("profileAvatarUrl").addEventListener("input", (e) => {
  const val = e.target.value.trim();
  if (val) pendingAvatarSrc = val;
});

document.getElementById("profileAvatarFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    pendingAvatarSrc = reader.result;
    document.getElementById("profileAvatarUrl").value = reader.result;
    const member = getCurrentMember();
    if (member) renderCosmeticsInModal(member);
  };
  reader.readAsDataURL(file);
});

document.getElementById("cancelProfileBtn").onclick = () => {
  document.getElementById("profileModal").close();
};

document.getElementById("profileForm").onsubmit = (e) => {
  e.preventDefault();
  const member = getCurrentMember();
  if (!member) return;
  const newName = document.getElementById("profileDisplayName").value.trim();
  const newPass = document.getElementById("profileNewPass").value;
  const urlInput = document.getElementById("profileAvatarUrl").value.trim();

  if (newName) member.displayName = newName;
  if (newPass) member.password = newPass;
  if (urlInput) {
    member.avatarSrc = urlInput;
  } else if (pendingAvatarSrc) {
    member.avatarSrc = pendingAvatarSrc;
  }

  saveState();
  updateAuthUI();
  document.getElementById("profileModal").close();
};

// สลับแท็บล็อกอินผู้ใช้ทั่วไป vs แอดมิน
document.getElementById("tabUserBtn").onclick = () => {
  document.getElementById("tabUserBtn").classList.add("active");
  document.getElementById("tabAdminBtn").classList.remove("active");
  document.getElementById("userAuthForm").style.display = "block";
  document.getElementById("adminAuthForm").style.display = "none";
};

document.getElementById("tabAdminBtn").onclick = () => {
  document.getElementById("tabAdminBtn").classList.add("active");
  document.getElementById("tabUserBtn").classList.remove("active");
  document.getElementById("adminAuthForm").style.display = "block";
  document.getElementById("userAuthForm").style.display = "none";
};

document.getElementById("authBtn").onclick = () => {
  if (currentRole !== "guest") {
    currentRole = "guest";
    currentUsername = "";
    sessionStorage.removeItem(SESSION_ROLE_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);
    updateAuthUI();
  } else {
    document.getElementById("userAuthForm").reset();
    document.getElementById("adminAuthForm").reset();
    document.getElementById("memberError").style.display = "none";
    document.getElementById("adminError").style.display = "none";
    document.getElementById("loginModal").showModal();
  }
};

document.querySelectorAll(".close-login-btn").forEach((btn) => {
  btn.onclick = () => document.getElementById("loginModal").close();
});

document.getElementById("memberRegisterBtn").onclick = () => { memberSubmitMode = "register"; };
document.getElementById("memberLoginBtn").onclick = () => { memberSubmitMode = "login"; };

document.getElementById("userAuthForm").onsubmit = (e) => {
  e.preventDefault();
  const username = document.getElementById("memberUser").value.trim();
  const password = document.getElementById("memberPass").value;
  const errEl = document.getElementById("memberError");
  let existing = state.users.find((u) => u.username.toLowerCase() === username.toLowerCase());

  if (memberSubmitMode === "register") {
    if (existing) {
      errEl.textContent = "ชื่อผู้ใช้นี้มีในระบบแล้ว กรุณากดเข้าสู่ระบบ";
      errEl.style.display = "block";
      return;
    }
    existing = normalizeUser({
      username,
      displayName: username,
      password,
      points: 0,
      exp: 0,
      isVip: false
    });
    state.users.push(existing);
    saveState();
  } else {
    if (!existing || existing.password !== password) {
      errEl.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (หากยังไม่มีบัญชี ให้กดสมัครสมาชิกใหม่)";
      errEl.style.display = "block";
      return;
    }
  }

  currentRole = "user";
  currentUsername = existing.username;
  sessionStorage.setItem(SESSION_ROLE_KEY, "user");
  sessionStorage.setItem(SESSION_USER_KEY, existing.username);
  updateAuthUI();
  document.getElementById("loginModal").close();
};

document.getElementById("adminAuthForm").onsubmit = (e) => {
  e.preventDefault();
  const u = document.getElementById("adminUserInput").value.trim();
  const p = document.getElementById("adminPassInput").value;
  if (u === state.settings.adminUser && p === state.settings.adminPass) {
    currentRole = "admin";
    currentUsername = u;
    sessionStorage.setItem(SESSION_ROLE_KEY, "admin");
    sessionStorage.setItem(SESSION_USER_KEY, u);
    updateAuthUI();
    document.getElementById("loginModal").close();
  } else {
    document.getElementById("adminError").style.display = "block";
  }
};

// ระบบขอมอดแปลไทยเกมต่อไป
document.getElementById("openRequestBtn").onclick = () => {
  const member = getCurrentMember();
  if (!member) return;
  document.getElementById("requestForm").reset();
  document.getElementById("requestError").style.display = "none";
  document.getElementById("requestCostHint").textContent =
    `คะแนนปัจจุบันของคุณ: ${member.points} คะแนน • ใช้ ${state.settings.requestCost} คะแนนต่อ 1 คำขอ`;
  document.getElementById("requestModal").showModal();
};

document.getElementById("cancelRequestBtn").onclick = () => {
  document.getElementById("requestModal").close();
};

document.getElementById("requestForm").onsubmit = (e) => {
  e.preventDefault();
  const member = getCurrentMember();
  const cost = Number(state.settings.requestCost);
  if (!member || member.points < cost) {
    document.getElementById("requestError").style.display = "block";
    return;
  }

  member.points -= cost;
  state.requests.unshift({
    id: "req-" + Date.now(),
    username: member.username,
    game: document.getElementById("reqGameName").value.trim(),
    ref: document.getElementById("reqModRef").value.trim(),
    note: document.getElementById("reqNote").value.trim(),
    status: "รอดำเนินการ"
  });

  saveState();
  updateAuthUI();
  document.getElementById("requestModal").close();
  alert("ส่งคำขอมอดแปลไทยเรียบร้อยแล้ว!");
};

document.getElementById("openAddModBtn").onclick = () => openEditorModal(null);
document.getElementById("cancelEditorBtn").onclick = () => document.getElementById("editorModal").close();
document.getElementById("closeDetailBtn").onclick = () => document.getElementById("detailModal").close();

document.getElementById("modForm").onsubmit = (e) => {
  e.preventDefault();
  if (currentRole !== "admin") return;
  const id = document.getElementById("modId").value;
  const payload = {
    name: document.getElementById("modName").value.trim(),
    game: document.getElementById("modGame").value.trim(),
    category: document.getElementById("modCategory").value,
    desc: document.getElementById("modDesc").value.trim(),
    install: document.getElementById("modInstall").value.trim(),
    url: document.getElementById("modUrl").value.trim()
  };

  if (id) {
    const idx = state.mods.findIndex((m) => m.id === id);
    if (idx !== -1) state.mods[idx] = { ...state.mods[idx], ...payload };
  } else {
    state.mods.unshift({
      id: "mod-" + Date.now(),
      ...payload,
      downloads: 0,
      createdAt: Date.now()
    });
  }

  saveState();
  renderMods();
  document.getElementById("editorModal").close();
};

["cfgTitle", "cfgSubtitle", "cfgAnnouncement", "cfgAccent", "cfgPtsPerDl", "cfgExpPerDl", "cfgVipThreshold", "cfgRequestCost", "cfgAdminUser", "cfgAdminPass"].forEach((inputId) => {
  document.getElementById(inputId).addEventListener("input", () => {
    if (currentRole !== "admin") return;
    state.settings.title = document.getElementById("cfgTitle").value;
    state.settings.subtitle = document.getElementById("cfgSubtitle").value;
    state.settings.announcement = document.getElementById("cfgAnnouncement").value;
    state.settings.accent = document.getElementById("cfgAccent").value;
    state.settings.pointsPerDownload = Math.max(0, Number(document.getElementById("cfgPtsPerDl").value) || 0);
    state.settings.expPerDownload = Math.max(0, Number(document.getElementById("cfgExpPerDl").value) || 0);
    state.settings.vipThreshold = Math.max(1, Number(document.getElementById("cfgVipThreshold").value) || 100);
    state.settings.requestCost = Math.max(1, Number(document.getElementById("cfgRequestCost").value) || 50);
    const newUser = document.getElementById("cfgAdminUser").value.trim();
    const newPass = document.getElementById("cfgAdminPass").value;
    if (newUser) state.settings.adminUser = newUser;
    if (newPass) state.settings.adminPass = newPass;
    saveState();
    applySettings();
  });
});

document.getElementById("exportJsonBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "thai-mod-hub-backup.json";
  a.click();
  URL.revokeObjectURL(url);
};

document.getElementById("importJsonInput").onchange = (e) => {
  if (currentRole !== "admin") return;
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed.mods) || !parsed.settings) {
        alert("โครงสร้างไฟล์ JSON ไม่ถูกต้อง");
        return;
      }
      state = {
        settings: { ...DEFAULT_STATE.settings, ...parsed.settings },
        users: Array.isArray(parsed.users) ? parsed.users.map(normalizeUser) : [],
        requests: Array.isArray(parsed.requests) ? parsed.requests : [],
        mods: parsed.mods
      };
      saveState();
      applySettings();
      updateAuthUI();
      renderCategories();
      renderMods();
      renderAdminPanels();
      alert("นำเข้าข้อมูลเรียบร้อยแล้ว");
    } catch {
      alert("ไม่สามารถอ่านไฟล์ JSON ได้");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
};

document.getElementById("resetDefaultBtn").onclick = () => {
  if (currentRole !== "admin") return;
  if (!confirm("รีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้น?")) return;
  state = structuredClone(DEFAULT_STATE);
  saveState();
  applySettings();
  updateAuthUI();
  renderCategories();
  renderMods();
  renderAdminPanels();
};

document.getElementById("searchInput").addEventListener("input", renderMods);
document.getElementById("sortSelect").addEventListener("change", renderMods);

renderRankTiers();
applySettings();
updateAuthUI();
renderCategories();
renderMods();