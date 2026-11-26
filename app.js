const STORAGE_KEY = "thai_mod_hub_state_v1";

const RANK_LEVELS = [
  { minExp: 0, name: "ระดับ 1: มือใหม่หัดลงมอด" },
  { minExp: 100, name: "ระดับ 2: นักสำรวจมอด" },
  { minExp: 300, name: "ระดับ 3: ผู้ช่วยแปลท้องถิ่น" },
  { minExp: 600, name: "ระดับ 4: นักผจญภัยสายมอด" },
  { minExp: 1000, name: "ระดับ 5: ผู้เชี่ยวชาญมอดไทย" },
  { minExp: 1600, name: "ระดับ 6: ปรมาจารย์สายมอด" },
  { minExp: 2500, name: "ระดับ 7: ตำนานแห่ง Thai Mod Hub" }
];

const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" rx="40" fill="#0d9488"/><circle cx="40" cy="30" r="14" fill="#ffffff"/><path d="M16 68c4-14 15-20 24-20s20 6 24 20" fill="#ffffff"/></svg>`
  );

const DEFAULT_STATE = {
  settings: {
    siteTitle: "Thai Mod Hub",
    siteSubtitle: "รวมมอดเกมแปลไทย อ่านง่าย ใช้งานสะดวก ดาวน์โหลดฟรี",
    announcement: "ยินดีต้อนรับสู่ Thai Mod Hub — สลับโหมดมอดปกติ/18+ และร่วมพูดคุยสอบถามได้ในกระดานด้านล่าง"
  },
  contentMode: "normal",
  currentUserId: null,
  users: [
    {
      id: "u-admin",
      username: "admin",
      password: "123",
      role: "admin",
      points: 999,
      exp: 2600,
      avatarSrc: DEFAULT_AVATAR,
      frameId: "frame-gold",
      titleLabel: "ผู้ดูแลระบบ",
      unlockedAvatars: [DEFAULT_AVATAR],
      unlockedFrames: ["frame-none", "frame-gold", "frame-neon"],
      unlockedTitles: ["นักผจญภัยหน้าใหม่", "ผู้ดูแลระบบ"]
    },
    {
      id: "u-member1",
      username: "player1",
      password: "123",
      role: "member",
      points: 120,
      exp: 350,
      avatarSrc: DEFAULT_AVATAR,
      frameId: "frame-none",
      titleLabel: "นักผจญภัยหน้าใหม่",
      unlockedAvatars: [DEFAULT_AVATAR],
      unlockedFrames: ["frame-none"],
      unlockedTitles: ["นักผจญภัยหน้าใหม่"]
    }
  ],
  cosmetics: [
    { id: "c-title-1", type: "title", value: "นักผจญภัยสายมอด", unlockPoints: 50, unlockExp: 0 },
    { id: "c-title-2", type: "title", value: "ผู้เชี่ยวชาญมอดไทย", unlockPoints: 0, unlockExp: 500 },
    { id: "c-frame-1", type: "frame", value: "frame-neon", unlockPoints: 100, unlockExp: 0 },
    { id: "c-frame-2", type: "frame", value: "frame-gold", unlockPoints: 0, unlockExp: 1000 }
  ],
  mods: [
    {
      id: "m-1",
      title: "Stardew Valley — แพตช์แปลไทย",
      category: "Simulation",
      rating: "normal",
      description: "แปลเมนู เควส และบทสนทนาหลักให้อ่านง่าย พร้อมฟอนต์ภาษาไทย",
      url: "https://example.com/stardew-th",
      image: "",
      downloads: 0
    },
    {
      id: "m-2",
      title: "Project Zomboid — มอดแปลไทย (Build 42)",
      category: "Survival",
      rating: "normal",
      description: "แปลไอเทม อาชีพ และคำอธิบายสกิลให้เข้าใจง่ายสำหรับผู้เล่นใหม่",
      url: "https://example.com/pz-th",
      image: "",
      downloads: 0
    },
    {
      id: "m-3",
      title: "ตัวอย่างมอดโหมด 18+",
      category: "RPG",
      rating: "18+",
      description: "รายการตัวอย่างสำหรับทดสอบการสลับโหมดมอดเกมปกติและเกม 18+",
      url: "https://example.com/adult-mod-demo",
      image: "",
      downloads: 0
    }
  ],
  requests: [],
  bugReports: [],
  threads: [
    {
      id: "thread-welcome",
      title: "กระดานพูดคุย & สอบถามการลงมอดแปลไทย",
      body: "ติดปัญหาลงมอดเกมไหน หรืออยากแนะนำมอดแปลไทย พิมพ์คุยกันตรงนี้ได้เลยครับ",
      author: "Admin",
      createdAt: new Date().toLocaleString("th-TH"),
      replies: []
    }
  ]
};

let uploadedModImageDataUrl = "";

function normalizeUser(u) {
  return {
    id: u.id,
    username: u.username,
    password: u.password,
    role: u.role || "member",
    points: Number(u.points || 0),
    exp: Number(u.exp || 0),
    avatarSrc: u.avatarSrc || DEFAULT_AVATAR,
    frameId: u.frameId || "frame-none",
    titleLabel: u.titleLabel || "นักผจญภัยหน้าใหม่",
    unlockedAvatars: Array.isArray(u.unlockedAvatars) && u.unlockedAvatars.length ? u.unlockedAvatars : [DEFAULT_AVATAR],
    unlockedFrames: Array.isArray(u.unlockedFrames) && u.unlockedFrames.length ? u.unlockedFrames : ["frame-none"],
    unlockedTitles: Array.isArray(u.unlockedTitles) && u.unlockedTitles.length ? u.unlockedTitles : ["นักผจญภัยหน้าใหม่"]
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return {
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
      contentMode: parsed.contentMode === "18+" ? "18+" : "normal",
      currentUserId: parsed.currentUserId || null,
      users: Array.isArray(parsed.users) && parsed.users.length ? parsed.users.map(normalizeUser) : structuredClone(DEFAULT_STATE.users),
      cosmetics: Array.isArray(parsed.cosmetics) ? parsed.cosmetics : structuredClone(DEFAULT_STATE.cosmetics),
      mods: Array.isArray(parsed.mods) ? parsed.mods : structuredClone(DEFAULT_STATE.mods),
      requests: Array.isArray(parsed.requests) ? parsed.requests : [],
      bugReports: Array.isArray(parsed.bugReports) ? parsed.bugReports : [],
      threads: Array.isArray(parsed.threads) ? parsed.threads : structuredClone(DEFAULT_STATE.threads)
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getCurrentUser() {
  return state.users.find((u) => u.id === state.currentUserId) || null;
}

function getRankByExp(exp) {
  let current = RANK_LEVELS[0];
  for (const r of RANK_LEVELS) {
    if ((Number(exp) || 0) >= r.minExp) current = r;
  }
  return current;
}

function canUnlockCosmetic(item, user) {
  const reqPoints = Number(item.unlockPoints || 0);
  const reqExp = Number(item.unlockExp || 0);
  const userPoints = Number(user?.points || 0);
  const userExp = Number(user?.exp || 0);

  if (reqPoints === 0 && reqExp === 0) return true;
  const passPoints = reqPoints > 0 && userPoints >= reqPoints;
  const passExp = reqExp > 0 && userExp >= reqExp;
  return passPoints || passExp;
}

function formatUnlockRequirement(item) {
  const reqPoints = Number(item.unlockPoints || 0);
  const reqExp = Number(item.unlockExp || 0);
  const parts = [];
  if (reqPoints > 0) parts.push(`คะแนน ${reqPoints} แต้ม`);
  if (reqExp > 0) parts.push(`EXP ${reqExp}`);
  return parts.length ? `ปลดล็อกด้วย: ${parts.join(" หรือ ")}` : "ปลดล็อกฟรี";
}

function renderHeaderAndProfile() {
  document.getElementById("siteTitle").textContent = state.settings.siteTitle;
  document.getElementById("siteSubtitle").textContent = state.settings.siteSubtitle;

  const ann = document.getElementById("announcementBar");
  if (state.settings.announcement) {
    ann.textContent = state.settings.announcement;
    ann.classList.remove("hidden");
  } else {
    ann.classList.add("hidden");
  }

  document.getElementById("modeNormalBtn").classList.toggle("active", state.contentMode === "normal");
  document.getElementById("modeAdultBtn").classList.toggle("active", state.contentMode === "18+");

  const user = getCurrentUser();
  const authBtn = document.getElementById("authBtn");
  const guestBox = document.getElementById("guestProfileBox");
  const userBox = document.getElementById("userProfileBox");
  const adminBadge = document.getElementById("adminBadge");
  const cmsBtn = document.getElementById("toggleCmsBtn");
  const cmsPanel = document.getElementById("cmsPanel");

  document.getElementById("guestAvatarImg").src = DEFAULT_AVATAR;

  if (!user) {
    authBtn.textContent = "เข้าสู่ระบบ";
    guestBox.classList.remove("hidden");
    userBox.classList.add("hidden");
    adminBadge.classList.add("hidden");
    cmsBtn.classList.add("hidden");
    cmsPanel.classList.add("hidden");
    return;
  }

  authBtn.textContent = `ออกจากระบบ (${user.username})`;
  guestBox.classList.add("hidden");
  userBox.classList.remove("hidden");

  document.getElementById("userNameText").textContent = user.username;
  document.getElementById("userTitleBadge").textContent = user.titleLabel;
  document.getElementById("userRankText").textContent = getRankByExp(user.exp).name;
  document.getElementById("userPointsText").textContent = user.points;
  document.getElementById("userExpText").textContent = user.exp;

  const avatarImg = document.getElementById("userAvatarImg");
  const avatarFrame = document.getElementById("userAvatarFrame");
  avatarImg.src = user.avatarSrc || DEFAULT_AVATAR;
  avatarFrame.className = `avatar-frame ${user.frameId || "frame-none"}`;

  const isAdmin = user.role === "admin";
  adminBadge.classList.toggle("hidden", !isAdmin);
  cmsBtn.classList.toggle("hidden", !isAdmin);
  if (!isAdmin) cmsPanel.classList.add("hidden");
}

function renderSidebars() {
  const sortedUsers = [...state.users].sort((a, b) => b.exp - a.exp);
  document.getElementById("userRankList").innerHTML = sortedUsers
    .map(
      (u, idx) => `
      <div class="rank-item">
        <span>#${idx + 1} <strong>${u.username}</strong></span>
        <span>${u.exp} EXP</span>
      </div>`
    )
    .join("");

  document.getElementById("rankTiersList").innerHTML = RANK_LEVELS.map(
    (r) => `<div class="tier-item"><span>${r.name}</span><span>${r.minExp} EXP</span></div>`
  ).join("");

  const user = getCurrentUser();
  document.getElementById("cosmeticShopList").innerHTML = state.cosmetics
    .map((item) => {
      const unlocked = user ? canUnlockCosmetic(item, user) : false;
      return `
        <div class="cosmetic-item">
          <div>
            <strong>${item.value}</strong> <span class="muted small-text">(${item.type})</span>
            <div class="muted small-text">${formatUnlockRequirement(item)}</div>
          </div>
          <button type="button" class="btn btn-soft" data-claim-cosmetic="${item.id}" ${!user || !unlocked ? "disabled" : ""}>
            ${!user ? "ล็อกอินก่อน" : unlocked ? "รับ/ใช้" : "ยังไม่ถึงเกณฑ์"}
          </button>
        </div>`;
    })
    .join("");
}

function renderMods() {
  const search = (document.getElementById("searchModInput").value || "").trim().toLowerCase();
  const cat = document.getElementById("categoryFilter").value;

  const categories = [...new Set(state.mods.map((m) => m.category).filter(Boolean))];
  const selectEl = document.getElementById("categoryFilter");
  const prevCat = selectEl.value;
  selectEl.innerHTML =
    '<option value="all">ทุกหมวดหมู่</option>' +
    categories.map((c) => `<option value="${c}">${c}</option>`).join("");
  selectEl.value = categories.includes(prevCat) ? prevCat : "all";

  const filtered = state.mods.filter((m) => {
    const modRating = m.rating || "normal";
    if (modRating !== state.contentMode) return false;
    if (cat !== "all" && m.category !== cat) return false;
    if (search) {
      const hay = `${m.title} ${m.category} ${m.description}`.toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  });

  const listEl = document.getElementById("modList");
  if (!filtered.length) {
    listEl.innerHTML = `<div class="card-box muted">ไม่พบรายการมอดในโหมด "${state.contentMode === "18+" ? "มอดเกม 18+" : "มอดเกมปกติ"}"</div>`;
    return;
  }

  listEl.innerHTML = filtered
    .map(
      (m) => `
      <article class="mod-card">
        ${m.image ? `<img src="${m.image}" alt="${m.title}" class="mod-card-img" />` : ""}
        ${(m.rating || "normal") === "18+" ? `<span class="badge-18">18+</span>` : ""}
        <h3>${m.title}</h3>
        <div class="muted small-text">หมวดหมู่: ${m.category} · โหลดแล้ว ${m.downloads || 0} ครั้ง</div>
        <p>${m.description}</p>
        <a href="${m.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" data-download-mod="${m.id}">ดาวน์โหลดมอด</a>
      </article>`
    )
    .join("");
}

function renderThreads() {
  const listEl = document.getElementById("threadList");
  if (!state.threads.length) {
    listEl.innerHTML = "<p class='muted'>ยังไม่มีกระทู้ เริ่มตั้งกระทู้แรกได้เลย</p>";
    return;
  }
  listEl.innerHTML = state.threads
    .map(
      (t) => `
      <article class="thread-card">
        <h3>${t.title}</h3>
        <div class="muted small-text">โดย ${t.author} · ${t.createdAt}</div>
        <p>${t.body}</p>
        <div>
          ${(t.replies || [])
            .map((r) => `<div class="reply-item"><strong>${r.author}:</strong> ${r.text} <span class="muted small-text">(${r.createdAt})</span></div>`)
            .join("")}
        </div>
        <form class="reply-form" data-thread-id="${t.id}">
          <input type="text" class="reply-input" placeholder="พิมพ์ข้อความตอบกลับ..." required />
          <button type="submit" class="btn btn-primary">ตอบกลับ</button>
        </form>
      </article>`
    )
    .join("");
}

function renderAdminLists() {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") return;

  document.getElementById("adminUserList").innerHTML = state.users
    .map(
      (u) => `
      <div class="admin-row">
        <div>
          <strong>${u.username}</strong>
          <div class="muted small-text">คะแนน: ${u.points} | EXP: ${u.exp}</div>
        </div>
        <div class="header-right-actions">
          <button type="button" class="btn btn-soft" data-adj-points="${u.id}">+20 แต้ม</button>
          <button type="button" class="btn btn-soft" data-adj-exp="${u.id}">+50 EXP</button>
        </div>
      </div>`
    )
    .join("");

  document.getElementById("adminRequestList").innerHTML = state.requests.length
    ? state.requests
        .map(
          (r) => `
          <div class="admin-row">
            <div>
              <strong>${r.game}</strong> <span class="muted small-text">(${r.by})</span>
              <div class="muted small-text">${r.note || "-"}</div>
            </div>
          </div>`
        )
        .join("")
    : '<p class="muted small-text">ยังไม่มีคำขอมอด</p>';
}

function renderBugAdminList() {
  const box = document.getElementById("bugAdminList");
  const user = getCurrentUser();
  if (!user || user.role !== "admin") {
    box.innerHTML = "";
    return;
  }
  box.innerHTML =
    "<h4>รายการแจ้งบัค (สำหรับ Admin)</h4>" +
    (state.bugReports.length
      ? state.bugReports
          .map(
            (b) => `
            <div class="bug-item">
              <strong>${b.target}</strong> <span class="muted small-text">(${b.author} · ${b.createdAt})</span>
              <p>${b.description}</p>
              <button type="button" class="btn btn-soft" data-delete-bug="${b.id}">ลบรายการ</button>
            </div>`
          )
          .join("")
      : '<p class="muted small-text">ยังไม่มีรายงานบัค</p>');
}

function bindEvents() {
  document.getElementById("authBtn").addEventListener("click", () => {
    if (getCurrentUser()) {
      state.currentUserId = null;
      saveState();
      renderAll();
    } else {
      document.getElementById("authModal").classList.remove("hidden");
    }
  });

  document.getElementById("closeAuthModalBtn").addEventListener("click", () => {
    document.getElementById("authModal").classList.add("hidden");
  });

  document.getElementById("authForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("authUsernameInput").value.trim();
    const password = document.getElementById("authPasswordInput").value;
    let found = state.users.find((u) => u.username === username);

    if (found) {
      if (found.password !== password) {
        alert("รหัสผ่านไม่ถูกต้องครับ");
        return;
      }
    } else {
      found = normalizeUser({
        id: "u-" + Date.now(),
        username,
        password,
        role: "member",
        points: 20,
        exp: 10
      });
      state.users.push(found);
    }

    state.currentUserId = found.id;
    saveState();
    e.target.reset();
    document.getElementById("authModal").classList.add("hidden");
    renderAll();
  });

  document.getElementById("openRequestBtn").addEventListener("click", () => {
    document.getElementById("requestModal").classList.remove("hidden");
  });

  document.getElementById("closeRequestModalBtn").addEventListener("click", () => {
    document.getElementById("requestModal").classList.add("hidden");
  });

  document.getElementById("requestForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const game = document.getElementById("requestGameInput").value.trim();
    const note = document.getElementById("requestNoteInput").value.trim();
    if (!game) return;

    state.requests.unshift({
      id: "req-" + Date.now(),
      game,
      note,
      by: user ? user.username : "ผู้เยี่ยมชม"
    });
    saveState();
    e.target.reset();
    document.getElementById("requestModal").classList.add("hidden");
    renderAdminLists();
    alert("ส่งคำขอมอดเรียบร้อยแล้วครับ");
  });

  document.getElementById("toggleCmsBtn").addEventListener("click", () => {
    document.getElementById("cmsPanel").classList.toggle("hidden");
    renderAdminLists();
  });

  // รูปภาพในหน้าลงมอด
  const urlInput = document.getElementById("modImageUrlInput");
  const fileInput = document.getElementById("modImageFileInput");
  const preview = document.getElementById("modImagePreview");

  const updatePreview = (src) => {
    if (src) {
      preview.src = src;
      preview.classList.remove("hidden");
    } else {
      preview.src = "";
      preview.classList.add("hidden");
    }
  };

  urlInput.addEventListener("input", () => {
    const val = urlInput.value.trim();
    if (val) {
      uploadedModImageDataUrl = "";
      updatePreview(val);
    } else {
      updatePreview(uploadedModImageDataUrl);
    }
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadedModImageDataUrl = String(reader.result || "");
      urlInput.value = "";
      updatePreview(uploadedModImageDataUrl);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("modForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("modTitleInput").value.trim();
    const category = document.getElementById("modCategoryInput").value.trim();
    const rating = document.getElementById("modRatingInput").value;
    const description = document.getElementById("modDescInput").value.trim();
    const url = document.getElementById("modUrlInput").value.trim();
    const image = uploadedModImageDataUrl || urlInput.value.trim() || "";
    if (!title || !category || !description || !url) return;

    state.mods.unshift({
      id: "m-" + Date.now(),
      title,
      category,
      rating,
      description,
      url,
      image,
      downloads: 0
    });
    saveState();
    e.target.reset();
    uploadedModImageDataUrl = "";
    updatePreview("");
    renderMods();
  });

  document.getElementById("cosmeticForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("cosmeticTypeInput").value;
    const value = document.getElementById("cosmeticNameInput").value.trim();
    const unlockPoints = Math.max(0, Number(document.getElementById("cosmeticReqPoints").value || 0));
    const unlockExp = Math.max(0, Number(document.getElementById("cosmeticReqExp").value || 0));
    if (!value) return;

    state.cosmetics.push({
      id: "c-" + Date.now(),
      type,
      value,
      unlockPoints,
      unlockExp
    });
    saveState();
    e.target.reset();
    renderSidebars();
  });

  document.getElementById("cosmeticShopList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-claim-cosmetic]");
    if (!btn) return;
    const user = getCurrentUser();
    if (!user) return;
    const item = state.cosmetics.find((c) => c.id === btn.dataset.claimCosmetic);
    if (!item || !canUnlockCosmetic(item, user)) return;

    if (item.type === "title") user.titleLabel = item.value;
    if (item.type === "frame") user.frameId = item.value;
    if (item.type === "avatar") user.avatarSrc = item.value;

    saveState();
    renderAll();
  });

  document.getElementById("adminUserList").addEventListener("click", (e) => {
    const ptsBtn = e.target.closest("[data-adj-points]");
    const expBtn = e.target.closest("[data-adj-exp]");
    if (ptsBtn) {
      const target = state.users.find((u) => u.id === ptsBtn.dataset.adjPoints);
      if (target) {
        target.points += 20;
        saveState();
        renderAll();
      }
    }
    if (expBtn) {
      const target = state.users.find((u) => u.id === expBtn.dataset.adjExp);
      if (target) {
        target.exp += 50;
        saveState();
        renderAll();
      }
    }
  });

  // สลับโหมดมอดปกติ / 18+
  const switchMode = (targetMode) => {
    if (targetMode === "18+" && state.contentMode !== "18+") {
      const ok = confirm("โหมดนี้สำหรับมอดเกม 18+ ยืนยันว่ามีอายุตามเกณฑ์ที่กำหนดหรือไม่?");
      if (!ok) return;
    }
    state.contentMode = targetMode;
    saveState();
    renderHeaderAndProfile();
    renderMods();
  };

  document.getElementById("modeNormalBtn").addEventListener("click", () => switchMode("normal"));
  document.getElementById("modeAdultBtn").addEventListener("click", () => switchMode("18+"));

  // ค้นหาและกรองหมวดหมู่
  document.getElementById("searchModInput").addEventListener("input", renderMods);
  document.getElementById("categoryFilter").addEventListener("change", renderMods);

  // นับยอดดาวน์โหลด
  document.getElementById("modList").addEventListener("click", (e) => {
    const link = e.target.closest("[data-download-mod]");
    if (!link) return;
    const mod = state.mods.find((m) => m.id === link.dataset.downloadMod);
    if (mod) {
      mod.downloads = (mod.downloads || 0) + 1;
      saveState();
      renderMods();
    }
  });

  // แจ้งบัค
  document.getElementById("openBugModalBtn").addEventListener("click", () => {
    document.getElementById("bugModal").classList.remove("hidden");
    renderBugAdminList();
  });

  document.getElementById("closeBugModalBtn").addEventListener("click", () => {
    document.getElementById("bugModal").classList.add("hidden");
  });

  document.getElementById("bugReportForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const target = document.getElementById("bugTargetInput").value.trim();
    const description = document.getElementById("bugDescInput").value.trim();
    if (!target || !description) return;
    const user = getCurrentUser();

    state.bugReports.unshift({
      id: "bug-" + Date.now(),
      target,
      description,
      author: user ? user.username : "ผู้เยี่ยมชม",
      createdAt: new Date().toLocaleString("th-TH")
    });
    saveState();
    e.target.reset();
    renderBugAdminList();
    alert("ส่งรายงานบัคเรียบร้อยแล้ว ขอบคุณที่ช่วยแจ้งครับ");
  });

  document.getElementById("bugAdminList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-delete-bug]");
    if (!btn) return;
    state.bugReports = state.bugReports.filter((b) => b.id !== btn.dataset.deleteBug);
    saveState();
    renderBugAdminList();
  });

  // กระทู้พูดคุยสอบถาม
  document.getElementById("toggleNewThreadBtn").addEventListener("click", () => {
    document.getElementById("newThreadForm").classList.toggle("hidden");
  });

  document.getElementById("newThreadForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("threadTitleInput").value.trim();
    const body = document.getElementById("threadBodyInput").value.trim();
    if (!title || !body) return;
    const user = getCurrentUser();

    state.threads.unshift({
      id: "th-" + Date.now(),
      title,
      body,
      author: user ? user.username : "สมาชิก",
      createdAt: new Date().toLocaleString("th-TH"),
      replies: []
    });
    saveState();
    e.target.reset();
    e.target.classList.add("hidden");
    renderThreads();
  });

  document.getElementById("threadList").addEventListener("submit", (e) => {
    const form = e.target.closest(".reply-form");
    if (!form) return;
    e.preventDefault();
    const input = form.querySelector(".reply-input");
    const text = input.value.trim();
    if (!text) return;
    const user = getCurrentUser();
    const thread = state.threads.find((t) => t.id === form.dataset.threadId);
    if (!thread) return;

    thread.replies.push({
      id: "rp-" + Date.now(),
      author: user ? user.username : "สมาชิก",
      text,
      createdAt: new Date().toLocaleString("th-TH")
    });
    saveState();
    renderThreads();
  });

  // Export ข้อมูลสำรอง
  document.getElementById("exportDataBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thai-mod-hub-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  });
}

function renderAll() {
  renderHeaderAndProfile();
  renderSidebars();
  renderMods();
  renderThreads();
  renderAdminLists();
  renderBugAdminList();
}

bindEvents();
renderAll();