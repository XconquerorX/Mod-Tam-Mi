const STORAGE_KEY = "thai_mod_hub_state_v2";
const API_BASE_URL = "";

const I18N = {
  th: {
    login: "เข้าสู่ระบบ",
    recover: "กู้คืนบัญชี",
    requestMod: "ขอมอดแปลไทยเกมต่อไป",
    donate: "โดเนท",
    openForum: "เปิดหน้ากระทู้",
    adminRole: "ผู้ดูแลระบบ (Admin)",
    uploadPerm: "สิทธิ์ลงมอด",
    siteSubtitle: "รวมมอดเกมแปลไทย อ่านง่าย ใช้งานสะดวก ดาวน์โหลดฟรี",
    guestProfile: "โปรไฟล์ผู้เยี่ยมชม",
    guestHint: "ล็อกอินเพื่อรับ UserID สะสมคะแนน/EXP ปลดล็อกยศ และของตกแต่ง",
    points: "คะแนน",
    customizeProfile: "แต่งโปรไฟล์",
    cmsPanelBtn: "แผงแอดมิน (CMS)",
    normalMod: "มอดเกมปกติ",
    adultMod: "มอดเกม 18+",
    notifications: "แจ้งเตือน",
    adminAlerts: "แจ้งเตือนแอดมิน",
    localMode: "โหมด LocalStorage",
    backendConnected: "เชื่อมต่อ Backend แล้ว",
    exportData: "Export ข้อมูล",
    reportBug: "แจ้งบัค",
    publicNotifTitle: "กล่องแจ้งเตือนสำหรับทุกคน",
    adminNotifTitle: "กล่องแจ้งเตือนผู้ดูแลระบบ (VIP ขอมอด & แจ้งโดเนท)",
    sendNotif: "ส่งแจ้งเตือน",
    clearRead: "ล้างที่อ่านแล้ว",
    addNewMod: "เพิ่ม / ลงมอดแปลไทยใหม่",
    modName: "ชื่อมอด / ชื่อเกม",
    category: "หมวดหมู่",
    contentRating: "โหมดเนื้อหา",
    modDesc: "รายละเอียดมอด",
    downloadUrl: "ลิงก์ดาวน์โหลด",
    imageUrl: "ลิงก์รูปภาพมอด (URL)",
    uploadImage: "หรืออัปโหลดรูปภาพจากเครื่อง",
    saveMod: "บันทึกมอด",
    addCosmetic: "เพิ่มของตกแต่ง (แยกปลดล็อกด้วยคะแนน vs EXP)",
    type: "ประเภท",
    addCosmeticBtn: "เพิ่มของตกแต่ง",
    topExpRank: "Rank ผู้ใช้ที่ EXP สูงสุด",
    membersOnly: "เฉพาะสมาชิก",
    rankTiers: "ทำเนียบยศ 7 ระดับ",
    eventsAndCosmetics: "กิจกรรม & ของตกแต่ง",
    cosmeticHint: "ปลดล็อกของตกแต่งได้ทั้งจาก คะแนน และ EXP แยกเงื่อนไขกันชัดเจน",
    loginTitle: "เข้าสู่ระบบสมาชิก",
    recoverTitle: "กู้คืนบัญชีผู้ใช้",
    requestListTitle: "รายชื่อเกมที่ขอแปลไทย (แยกปกติ / 18+)",
    donateTitle: "โดเนทสนับสนุน & ส่งหลักฐาน",
    backHome: "← กลับหน้าหลักมอด",
    forumTitle: "กระดานพูดคุย & สอบถาม",
    forumSub: "แยกหน้าพูดคุยสอบถาม วิธีลงมอด และแลกเปลี่ยนข้อมูลสมาชิก",
    allThreads: "รายการกระทู้ทั้งหมด",
    threadHint: "ตั้งกระทู้ใหม่หรือพิมพ์ตอบกลับได้ทันที",
    newThread: "+ ตั้งกระทู้ใหม่",
    threadTopic: "หัวข้อกระทู้",
    threadDetail: "รายละเอียด",
    postThread: "โพสต์กระทู้"
  },
  en: {
    login: "Login",
    recover: "Recover Account",
    requestMod: "Request Thai Mod",
    donate: "Donate",
    openForum: "Open Forum",
    adminRole: "Administrator",
    uploadPerm: "Mod Uploader",
    siteSubtitle: "Thai Game Translation Mod Hub — Easy to read, convenient, free download",
    guestProfile: "Guest Profile",
    guestHint: "Login to get a UserID, earn Points/EXP, and unlock ranks & cosmetics",
    points: "Points",
    customizeProfile: "Customize Profile",
    cmsPanelBtn: "Admin Panel (CMS)",
    normalMod: "Normal Mods",
    adultMod: "18+ Mods",
    notifications: "Notifications",
    adminAlerts: "Admin Alerts",
    localMode: "LocalStorage Mode",
    backendConnected: "Backend Connected",
    exportData: "Export Data",
    reportBug: "Report Bug",
    publicNotifTitle: "Public Notifications (Everyone)",
    adminNotifTitle: "Admin Alerts (VIP Mod Requests & Donations)",
    sendNotif: "Send Alert",
    clearRead: "Clear All",
    addNewMod: "Add / Publish New Thai Mod",
    modName: "Mod / Game Title",
    category: "Category",
    contentRating: "Content Rating",
    modDesc: "Mod Description",
    downloadUrl: "Download URL",
    imageUrl: "Mod Image URL",
    uploadImage: "Or Upload Image from Device",
    saveMod: "Save Mod",
    addCosmetic: "Add Cosmetic (Separate Points vs EXP Unlock)",
    type: "Type",
    addCosmeticBtn: "Add Cosmetic",
    topExpRank: "Top EXP User Ranking",
    membersOnly: "Members Only",
    rankTiers: "7 Rank Tiers",
    eventsAndCosmetics: "Events & Cosmetics",
    cosmeticHint: "Unlock cosmetics separately with Points or EXP",
    loginTitle: "Member Login",
    recoverTitle: "Account Recovery",
    requestListTitle: "Requested Thai Translation Games (Normal / 18+)",
    donateTitle: "Donate & Submit Proof",
    backHome: "← Back to Mod Hub",
    forumTitle: "Discussion & Q&A Forum",
    forumSub: "Dedicated board for mod installation help and community chat",
    allThreads: "All Forum Threads",
    threadHint: "Create a new thread or reply anytime",
    newThread: "+ New Thread",
    threadTopic: "Thread Title",
    threadDetail: "Details",
    postThread: "Post Thread"
  }
};

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
  lang: "th",
  settings: {
    siteTitle: "Thai Mod Hub",
    siteSubtitle: "รวมมอดเกมแปลไทย อ่านง่าย ใช้งานสะดวก ดาวน์โหลดฟรี",
    announcement: "ยินดีต้อนรับสู่ Thai Mod Hub — รองรับสลับภาษา TH/EN โดเนทรับ VIP และดูรายชื่อเกมที่ขอแปลได้"
  },
  contentMode: "normal",
  requestTabMode: "normal",
  currentUserId: null,
  users: [
    {
      id: "u-admin",
      username: "admin",
      password: "123",
      role: "admin",
      isVip: true,
      canUploadMod: true,
      provider: "local",
      socialIds: {
        google: "google-admin-001",
        facebook: "fb-admin-001",
        discord: "100000000000000001",
        twitter: "@admin_modhub"
      },
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
      isVip: true,
      canUploadMod: true,
      provider: "local",
      socialIds: {
        google: "google-player1-001",
        facebook: "",
        discord: "100000000000000002",
        twitter: ""
      },
      points: 120,
      exp: 350,
      avatarSrc: DEFAULT_AVATAR,
      frameId: "frame-none",
      titleLabel: "ผู้สนับสนุน VIP",
      unlockedAvatars: [DEFAULT_AVATAR],
      unlockedFrames: ["frame-none"],
      unlockedTitles: ["นักผจญภัยหน้าใหม่", "ผู้สนับสนุน VIP"]
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
  requests: [
    {
      id: "req-demo-1",
      game: "Baldur's Gate 3 (อัปเดตแพตช์ล่าสุด)",
      rating: "normal",
      note: "อยากให้ช่วยแปลส่วนเควสเสริมเพิ่มเติมครับ",
      by: "player1 (u-member1)",
      isVipRequest: true,
      votes: 3,
      createdAt: new Date().toLocaleString("th-TH")
    }
  ],
  donations: [],
  publicNotifications: [
    {
      id: "pn-1",
      text: "เปิดระบบขอเกมแปลไทยแบบสาธารณะแล้ว สามารถกดเข้าไปดูรายชื่อและโหวตเกมที่อยากให้แปลได้เลย!",
      createdAt: new Date().toLocaleString("th-TH")
    }
  ],
  adminNotifications: [],
  bugReports: [],
  threads: [
    {
      id: "thread-welcome",
      title: "กระดานพูดคุย & สอบถามการลงมอดแปลไทย",
      body: "ติดปัญหาลงมอดเกมไหน หรืออยากแนะนำมอดแปลไทย พิมพ์คุยกันตรงนี้ได้เลยครับ",
      author: "Admin",
      authorId: "u-admin",
      createdAt: new Date().toLocaleString("th-TH"),
      replies: []
    }
  ]
};

let uploadedModImageDataUrl = "";
let uploadedDonateSlipDataUrl = "";
let backendOnline = false;
let selectedSocialProvider = null;

function normalizeUser(u) {
  return {
    id: u.id || "u-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
    username: u.username,
    password: u.password || "",
    role: u.role || "member",
    isVip: Boolean(u.isVip),
    canUploadMod: Boolean(u.canUploadMod),
    provider: u.provider || "local",
    socialIds: {
      google: u.socialIds?.google || "",
      facebook: u.socialIds?.facebook || "",
      discord: u.socialIds?.discord || "",
      twitter: u.socialIds?.twitter || ""
    },
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
      lang: parsed.lang === "en" ? "en" : "th",
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
      contentMode: parsed.contentMode === "18+" ? "18+" : "normal",
      requestTabMode: parsed.requestTabMode === "18+" ? "18+" : "normal",
      currentUserId: parsed.currentUserId || null,
      users: Array.isArray(parsed.users) && parsed.users.length ? parsed.users.map(normalizeUser) : structuredClone(DEFAULT_STATE.users),
      cosmetics: Array.isArray(parsed.cosmetics) ? parsed.cosmetics : structuredClone(DEFAULT_STATE.cosmetics),
      mods: Array.isArray(parsed.mods) ? parsed.mods : structuredClone(DEFAULT_STATE.mods),
      requests: Array.isArray(parsed.requests) ? parsed.requests : structuredClone(DEFAULT_STATE.requests),
      donations: Array.isArray(parsed.donations) ? parsed.donations : [],
      publicNotifications: Array.isArray(parsed.publicNotifications) ? parsed.publicNotifications : structuredClone(DEFAULT_STATE.publicNotifications),
      adminNotifications: Array.isArray(parsed.adminNotifications) ? parsed.adminNotifications : [],
      bugReports: Array.isArray(parsed.bugReports) ? parsed.bugReports : [],
      threads: Array.isArray(parsed.threads) ? parsed.threads : structuredClone(DEFAULT_STATE.threads)
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

let state = loadState();

function applyLanguage() {
  const dict = I18N[state.lang] || I18N.th;
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) langBtn.textContent = state.lang === "th" ? "EN / ไทย" : "ไทย / EN";
  const statusBadge = document.getElementById("backendStatusBadge");
  if (statusBadge) {
    statusBadge.textContent = backendOnline ? dict.backendConnected : dict.localMode;
  }
}

async function syncStateToBackend() {
  if (!backendOnline) return;
  try {
    await fetch(`${API_BASE_URL}/api/state`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
  } catch {
    backendOnline = false;
  }
}

async function checkBackendConnection() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (!res.ok) return;
    backendOnline = true;
    applyLanguage();
    const remoteStateRes = await fetch(`${API_BASE_URL}/api/state`);
    if (remoteStateRes.ok) {
      const remote = await remoteStateRes.json();
      if (Array.isArray(remote.users) && remote.users.length) {
        state.users = remote.users.map(normalizeUser);
      }
      if (Array.isArray(remote.donations)) state.donations = remote.donations;
      if (Array.isArray(remote.adminNotifications)) state.adminNotifications = remote.adminNotifications;
      if (Array.isArray(remote.publicNotifications) && remote.publicNotifications.length) {
        state.publicNotifications = remote.publicNotifications;
      }
      saveState(false);
      renderAll();
    }
  } catch {
    backendOnline = false;
  }
}

function saveState(shouldSync = true) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (shouldSync) syncStateToBackend();
}

function getCurrentUser() {
  return state.users.find((u) => u.id === state.currentUserId) || null;
}

function canUserUploadMod(user) {
  if (!user) return false;
  return user.role === "admin" || Boolean(user.canUploadMod);
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
  return (reqPoints > 0 && userPoints >= reqPoints) || (reqExp > 0 && userExp >= reqExp);
}

function formatUnlockRequirement(item) {
  const reqPoints = Number(item.unlockPoints || 0);
  const reqExp = Number(item.unlockExp || 0);
  const parts = [];
  if (reqPoints > 0) parts.push(`คะแนน ${reqPoints} แต้ม`);
  if (reqExp > 0) parts.push(`EXP ${reqExp}`);
  return parts.length ? `ปลดล็อกด้วย: ${parts.join(" หรือ ")}` : "ปลดล็อกฟรี";
}

function pushAdminAlert(type, message) {
  state.adminNotifications.unshift({
    id: "adm-notif-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
    type,
    message,
    createdAt: new Date().toLocaleString("th-TH")
  });
}

function renderThreads() {
  const listEl = document.getElementById("threadList");
  if (!listEl) return;
  if (!state.threads.length) {
    listEl.innerHTML = "<p class='muted'>ยังไม่มีกระทู้ เริ่มตั้งกระทู้แรกได้เลย</p>";
    return;
  }
  listEl.innerHTML = state.threads
    .map(
      (t) => `
      <article class="thread-card">
        <h3>${t.title}</h3>
        <div class="muted small-text">โดย ${t.author} ${t.authorId ? `(UserID: ${t.authorId})` : ""} · ${t.createdAt}</div>
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

function initForumPage() {
  const badge = document.getElementById("forumUserBadge");
  const user = getCurrentUser();
  if (badge) {
    badge.innerHTML = user
      ? `ผู้ใช้: <strong>${user.username}</strong> <span class="userid-badge">ID: ${user.id}</span>`
      : `กำลังใช้งานในฐานะผู้เยี่ยมชม · <a href="index.html">ไปหน้าล็อกอิน</a>`;
  }
  document.getElementById("langToggleBtn")?.addEventListener("click", () => {
    state.lang = state.lang === "th" ? "en" : "th";
    saveState(false);
    applyLanguage();
  });
  document.getElementById("toggleNewThreadBtn")?.addEventListener("click", () => {
    document.getElementById("newThreadForm")?.classList.toggle("hidden");
  });
  document.getElementById("newThreadForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("threadTitleInput")?.value.trim();
    const body = document.getElementById("threadBodyInput")?.value.trim();
    if (!title || !body) return;
    const u = getCurrentUser();
    state.threads.unshift({
      id: "th-" + Date.now(),
      title,
      body,
      author: u ? u.username : "สมาชิก",
      authorId: u ? u.id : "guest",
      createdAt: new Date().toLocaleString("th-TH"),
      replies: []
    });
    saveState();
    e.target.reset();
    e.target.classList.add("hidden");
    renderThreads();
  });
  document.getElementById("threadList")?.addEventListener("submit", (e) => {
    const form = e.target.closest(".reply-form");
    if (!form) return;
    e.preventDefault();
    const text = form.querySelector(".reply-input")?.value.trim();
    if (!text) return;
    const u = getCurrentUser();
    const thread = state.threads.find((t) => t.id === form.dataset.threadId);
    if (!thread) return;
    thread.replies.push({
      id: "rp-" + Date.now(),
      author: u ? u.username : "สมาชิก",
      text,
      createdAt: new Date().toLocaleString("th-TH")
    });
    saveState();
    renderThreads();
  });
  applyLanguage();
  renderThreads();
}

function renderNotifications() {
  document.getElementById("publicNotifCount").textContent = state.publicNotifications.length;
  document.getElementById("adminNotifCount").textContent = state.adminNotifications.length;

  const user = getCurrentUser();
  const isAdmin = user?.role === "admin";
  document.getElementById("openAdminNotifBtn").classList.toggle("hidden", !isAdmin);
  document.getElementById("publicNotifForm").classList.toggle("hidden", !isAdmin);
  if (!isAdmin) document.getElementById("adminNotifPanel").classList.add("hidden");

  document.getElementById("publicNotifList").innerHTML = state.publicNotifications.length
    ? state.publicNotifications
        .map(
          (n) => `
          <div class="notif-item">
            <div>
              <div>${n.text}</div>
              <div class="muted small-text">${n.createdAt}</div>
            </div>
            ${isAdmin ? `<button type="button" class="btn btn-soft" data-del-public-notif="${n.id}">ลบ</button>` : ""}
          </div>`
        )
        .join("")
    : '<p class="muted small-text">ยังไม่มีการแจ้งเตือน</p>';

  document.getElementById("adminNotifList").innerHTML = state.adminNotifications.length
    ? state.adminNotifications
        .map(
          (n) => `
          <div class="notif-item">
            <div>
              <strong>[${n.type === "donate" ? "โดเนทใหม่" : "VIP ขอมอด"}]</strong> ${n.message}
              <div class="muted small-text">${n.createdAt}</div>
            </div>
            <button type="button" class="btn btn-soft" data-del-admin-notif="${n.id}">รับทราบ</button>
          </div>`
        )
        .join("")
    : '<p class="muted small-text">ไม่มีแจ้งเตือนใหม่สำหรับผู้ดูแลระบบ</p>';
}

function renderHeaderAndProfile() {
  document.getElementById("siteTitle").textContent = state.settings.siteTitle;
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
  const vipBadge = document.getElementById("vipBadge");
  const uploadBadge = document.getElementById("uploadPermissionBadge");
  const cmsBtn = document.getElementById("toggleCmsBtn");
  const cmsPanel = document.getElementById("cmsPanel");

  document.getElementById("guestAvatarImg").src = DEFAULT_AVATAR;

  if (!user) {
    authBtn.textContent = state.lang === "en" ? "Login" : "เข้าสู่ระบบ";
    guestBox.classList.remove("hidden");
    userBox.classList.add("hidden");
    adminBadge.classList.add("hidden");
    vipBadge.classList.add("hidden");
    uploadBadge.classList.add("hidden");
    cmsBtn.classList.add("hidden");
    cmsPanel.classList.add("hidden");
    return;
  }

  authBtn.textContent = state.lang === "en" ? `Logout (${user.username})` : `ออกจากระบบ (${user.username})`;
  guestBox.classList.add("hidden");
  userBox.classList.remove("hidden");

  document.getElementById("userNameText").textContent = user.username;
  document.getElementById("userProviderBadge").textContent = user.provider || "local";
  document.getElementById("userIdBadge").textContent = `ID: ${user.id}`;
  document.getElementById("userTitleBadge").textContent = user.titleLabel;
  document.getElementById("userRankText").textContent = getRankByExp(user.exp).name;
  document.getElementById("userPointsText").textContent = user.points;
  document.getElementById("userExpText").textContent = user.exp;

  const avatarImg = document.getElementById("userAvatarImg");
  const avatarFrame = document.getElementById("userAvatarFrame");
  avatarImg.src = user.avatarSrc || DEFAULT_AVATAR;
  avatarFrame.className = `avatar-frame ${user.frameId || "frame-none"}`;

  const isAdmin = user.role === "admin";
  const canUpload = canUserUploadMod(user);

  adminBadge.classList.toggle("hidden", !isAdmin);
  vipBadge.classList.toggle("hidden", !user.isVip && !isAdmin);
  uploadBadge.classList.toggle("hidden", !canUpload);
  cmsBtn.classList.toggle("hidden", !isAdmin && !canUpload);

  document.querySelectorAll(".admin-only-block").forEach((el) => el.classList.toggle("hidden", !isAdmin));
  document.getElementById("modForm").classList.toggle("hidden", !canUpload);
  if (!isAdmin && !canUpload) cmsPanel.classList.add("hidden");
}

function renderSidebars() {
  // กรองบัญชีผู้ดูแลระบบ (admin) ออกจากอันดับ Rank ผู้ใช้ที่ EXP สูงสุด
  const sortedMembers = [...state.users]
    .filter((u) => u.role !== "admin")
    .sort((a, b) => b.exp - a.exp);

  document.getElementById("userRankList").innerHTML = sortedMembers.length
    ? sortedMembers
        .map(
          (u, idx) => `
          <div class="rank-item">
            <div>
              #${idx + 1} <strong>${u.username}</strong> ${u.isVip ? `<span class="vip-badge">VIP</span>` : ""}
              <div class="muted small-text">ID: ${u.id}</div>
            </div>
            <span>${u.exp} EXP</span>
          </div>`
        )
        .join("")
    : '<p class="muted small-text">ยังไม่มีข้อมูลสมาชิก</p>';

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

function renderPublicRequests() {
  document.getElementById("reqTabNormalBtn").classList.toggle("active", state.requestTabMode === "normal");
  document.getElementById("reqTabAdultBtn").classList.toggle("active", state.requestTabMode === "18+");

  const filtered = state.requests.filter((r) => (r.rating || "normal") === state.requestTabMode);
  const box = document.getElementById("publicRequestList");
  if (!filtered.length) {
    box.innerHTML = `<p class="muted small-text">ยังไม่มีรายชื่อเกมที่ขอในหมวด "${state.requestTabMode === "18+" ? "เกม 18+" : "เกมปกติ"}"</p>`;
    return;
  }

  box.innerHTML = filtered
    .map(
      (r) => `
      <div class="request-public-item">
        <div>
          <strong>${r.game}</strong>
          ${(r.rating || "normal") === "18+" ? `<span class="badge-18">18+</span>` : ""}
          ${r.isVipRequest ? `<span class="vip-badge">VIP ขอพิเศษ</span>` : ""}
          <div class="muted small-text">ขอโดย: ${r.by} · ${r.createdAt || ""}</div>
          <div class="small-text">${r.note || "-"}</div>
        </div>
        <button type="button" class="btn btn-soft" data-vote-request="${r.id}">▲ โหวต (${r.votes || 0})</button>
      </div>`
    )
    .join("");
}

function renderAdminLists() {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") return;

  document.getElementById("adminUserList").innerHTML = state.users
    .map(
      (u) => `
      <div class="admin-user-card">
        <div>
          <strong>${u.username}</strong>
          <span class="userid-badge">ID: ${u.id}</span>
          <span class="provider-badge">${u.provider || "local"}</span>
          ${u.isVip ? `<span class="vip-badge">VIP</span>` : ""}
          ${u.canUploadMod || u.role === "admin" ? `<span class="upload-badge">สิทธิ์ลงมอด</span>` : ""}
          <div class="muted small-text">คะแนน: ${u.points} | EXP: ${u.exp}</div>
        </div>
        <div class="admin-grant-controls">
          <input type="number" class="admin-grant-input" data-pts-input="${u.id}" value="20" step="1" />
          <button type="button" class="btn btn-soft" data-grant-points="${u.id}">ให้คะแนน</button>
          <input type="number" class="admin-grant-input" data-exp-input="${u.id}" value="50" step="1" />
          <button type="button" class="btn btn-soft" data-grant-exp="${u.id}">ให้ EXP</button>
          <button type="button" class="btn btn-soft" data-bind-oauth="${u.id}">ผูก OAuth ID</button>
          ${
            u.role !== "admin"
              ? `<button type="button" class="btn btn-vip" data-toggle-vip="${u.id}">${u.isVip ? "ถอด VIP" : "ตั้งเป็น VIP"}</button>
                 <button type="button" class="btn btn-soft" data-toggle-upload="${u.id}">${u.canUploadMod ? "ถอดสิทธิ์ลงมอด" : "อนุญาตลงมอด"}</button>
                 <button type="button" class="btn btn-danger" data-delete-user="${u.id}">ลบบัญชี</button>`
              : ""
          }
        </div>
      </div>`
    )
    .join("");

  document.getElementById("adminDonateList").innerHTML = state.donations.length
    ? state.donations
        .map(
          (d) => `
          <div class="admin-user-card">
            <div>
              <strong>${d.sender}</strong> — <span class="vip-badge">${d.amount} บาท</span>
              <span class="muted small-text">(${d.status === "approved" ? "อนุมัติแล้ว" : "รอตรวจสอบ"})</span>
              <div class="muted small-text">${d.note || "-"} · ${d.createdAt}</div>
              ${d.slip ? `<img src="${d.slip}" alt="หลักฐานสลิป" class="mod-preview-img" />` : ""}
            </div>
            <div class="admin-grant-controls">
              ${
                d.status !== "approved"
                  ? `<button type="button" class="btn btn-primary" data-approve-donate="${d.id}">อนุมัติ & มอบ VIP</button>`
                  : ""
              }
              <button type="button" class="btn btn-soft" data-delete-donate="${d.id}">ลบรายการ</button>
            </div>
          </div>`
        )
        .join("")
    : '<p class="muted small-text">ยังไม่มีรายการแจ้งโดเนท</p>';
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

function bindHomeEvents() {
  document.getElementById("langToggleBtn").addEventListener("click", () => {
    state.lang = state.lang === "th" ? "en" : "th";
    saveState(false);
    applyLanguage();
    renderHeaderAndProfile();
  });

  document.getElementById("openPublicNotifBtn").addEventListener("click", () => {
    document.getElementById("publicNotifPanel").classList.toggle("hidden");
  });
  document.getElementById("closePublicNotifBtn").addEventListener("click", () => {
    document.getElementById("publicNotifPanel").classList.add("hidden");
  });
  document.getElementById("publicNotifForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("publicNotifInput");
    const text = input.value.trim();
    if (!text) return;
    state.publicNotifications.unshift({
      id: "pn-" + Date.now(),
      text,
      createdAt: new Date().toLocaleString("th-TH")
    });
    saveState();
    e.target.reset();
    renderNotifications();
  });
  document.getElementById("publicNotifList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-del-public-notif]");
    if (!btn) return;
    state.publicNotifications = state.publicNotifications.filter((n) => n.id !== btn.dataset.delPublicNotif);
    saveState();
    renderNotifications();
  });

  document.getElementById("openAdminNotifBtn").addEventListener("click", () => {
    document.getElementById("adminNotifPanel").classList.toggle("hidden");
  });
  document.getElementById("closeAdminNotifBtn").addEventListener("click", () => {
    document.getElementById("adminNotifPanel").classList.add("hidden");
  });
  document.getElementById("clearAdminNotifBtn").addEventListener("click", () => {
    state.adminNotifications = [];
    saveState();
    renderNotifications();
  });
  document.getElementById("adminNotifList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-del-admin-notif]");
    if (!btn) return;
    state.adminNotifications = state.adminNotifications.filter((n) => n.id !== btn.dataset.delAdminNotif);
    saveState();
    renderNotifications();
  });

  document.getElementById("authBtn").addEventListener("click", () => {
    if (getCurrentUser()) {
      state.currentUserId = null;
      saveState();
      renderAll();
    } else {
      selectedSocialProvider = null;
      document.getElementById("socialIdFormBox").classList.add("hidden");
      document.getElementById("authModal").classList.remove("hidden");
    }
  });

  document.getElementById("closeAuthModalBtn").addEventListener("click", () => {
    document.getElementById("authModal").classList.add("hidden");
  });

  document.getElementById("authModal").addEventListener("click", (e) => {
    const socialBtn = e.target.closest("[data-social-provider]");
    if (!socialBtn) return;
    selectedSocialProvider = socialBtn.dataset.socialProvider.toLowerCase();
    document.getElementById("socialIdLabel").textContent = `กรอก ${socialBtn.dataset.socialProvider} ID จริงที่ผูกไว้ในระบบ`;
    document.getElementById("socialAccountIdInput").value = "";
    document.getElementById("socialIdFormBox").classList.remove("hidden");
    document.getElementById("socialAccountIdInput").focus();
  });

  document.getElementById("cancelSocialLoginBtn").addEventListener("click", () => {
    selectedSocialProvider = null;
    document.getElementById("socialIdFormBox").classList.add("hidden");
  });

  document.getElementById("confirmSocialLoginBtn").addEventListener("click", async () => {
    const rawId = document.getElementById("socialAccountIdInput").value.trim();
    if (!selectedSocialProvider || !rawId) {
      alert("กรุณากรอก ID บัญชีจริงก่อนครับ");
      return;
    }

    if (backendOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/oauth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider: selectedSocialProvider, oauthId: rawId })
        });
        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "ไม่พบ ID บัญชีจริงที่ผูกไว้ในระบบครับ");
          return;
        }
        const matched = normalizeUser(data.user);
        const idx = state.users.findIndex((u) => u.id === matched.id);
        if (idx >= 0) state.users[idx] = matched;
        else state.users.push(matched);
        state.currentUserId = matched.id;
        saveState(false);
        selectedSocialProvider = null;
        document.getElementById("socialIdFormBox").classList.add("hidden");
        document.getElementById("authModal").classList.add("hidden");
        renderAll();
        return;
      } catch {
        backendOnline = false;
      }
    }

    const matchedUser = state.users.find(
      (u) => (u.socialIds?.[selectedSocialProvider] || "").trim().toLowerCase() === rawId.toLowerCase()
    );
    if (!matchedUser) {
      alert("ไม่พบ ID บัญชีจริงที่ผูกไว้ในระบบครับ");
      return;
    }

    matchedUser.provider = selectedSocialProvider;
    state.currentUserId = matchedUser.id;
    saveState();
    selectedSocialProvider = null;
    document.getElementById("socialIdFormBox").classList.add("hidden");
    document.getElementById("authModal").classList.add("hidden");
    renderAll();
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
        id: "u-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
        username,
        password,
        role: "member",
        isVip: false,
        canUploadMod: false,
        provider: "local",
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

  document.getElementById("openRecoverBtn").addEventListener("click", () => {
    document.getElementById("recoverModal").classList.remove("hidden");
  });
  document.getElementById("closeRecoverModalBtn").addEventListener("click", () => {
    document.getElementById("recoverModal").classList.add("hidden");
  });
  document.getElementById("recoverForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const identifier = document.getElementById("recoverIdentifierInput").value.trim();
    const newPass = document.getElementById("recoverNewPassInput").value;
    const target = state.users.find(
      (u) => u.id.toLowerCase() === identifier.toLowerCase() || u.username.toLowerCase() === identifier.toLowerCase()
    );
    if (!target) {
      alert("ไม่พบบัญชีที่ตรงกับ UserID หรือชื่อผู้ใช้ที่ระบุครับ");
      return;
    }
    target.password = newPass;
    state.currentUserId = target.id;
    saveState();
    e.target.reset();
    document.getElementById("recoverModal").classList.add("hidden");
    renderAll();
    alert(`กู้คืนบัญชี ${target.username} เรียบร้อยแล้วครับ`);
  });

  // หน้าขอมอดแปลไทยเกมต่อไป (ดูรายชื่อสาธารณะ แยกปกติ / 18+)
  document.getElementById("openRequestBtn").addEventListener("click", () => {
    renderPublicRequests();
    document.getElementById("requestModal").classList.remove("hidden");
  });
  document.getElementById("closeRequestModalBtn").addEventListener("click", () => {
    document.getElementById("requestModal").classList.add("hidden");
  });
  document.getElementById("reqTabNormalBtn").addEventListener("click", () => {
    state.requestTabMode = "normal";
    renderPublicRequests();
  });
  document.getElementById("reqTabAdultBtn").addEventListener("click", () => {
    state.requestTabMode = "18+";
    renderPublicRequests();
  });
  document.getElementById("toggleNewRequestFormBtn").addEventListener("click", () => {
    document.getElementById("requestForm").classList.toggle("hidden");
  });
  document.getElementById("requestForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const game = document.getElementById("requestGameInput").value.trim();
    const rating = document.getElementById("requestRatingInput").value;
    const note = document.getElementById("requestNoteInput").value.trim();
    if (!game) return;

    const isVipRequest = Boolean(user?.isVip || user?.role === "admin");
    const byLabel = user ? `${user.username} (${user.id})` : "ผู้เยี่ยมชม";

    state.requests.unshift({
      id: "req-" + Date.now(),
      game,
      rating,
      note,
      by: byLabel,
      isVipRequest,
      votes: 1,
      createdAt: new Date().toLocaleString("th-TH")
    });

    if (isVipRequest) {
      pushAdminAlert("vip_request", `บัญชี VIP ${byLabel} ขอมอดแปลไทยเกม "${game}" (${rating})`);
    }

    state.requestTabMode = rating;
    saveState();
    e.target.reset();
    e.target.classList.add("hidden");
    renderPublicRequests();
    renderNotifications();
  });
  document.getElementById("publicRequestList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-vote-request]");
    if (!btn) return;
    const req = state.requests.find((r) => r.id === btn.dataset.voteRequest);
    if (req) {
      req.votes = Number(req.votes || 0) + 1;
      saveState();
      renderPublicRequests();
    }
  });

  // ระบบโดเนท & ส่งหลักฐานให้ผู้ดูแลระบบ
  document.getElementById("openDonateBtn").addEventListener("click", () => {
    const user = getCurrentUser();
    if (user) {
      document.getElementById("donateSenderInput").value = `${user.username} (${user.id})`;
    }
    document.getElementById("donateModal").classList.remove("hidden");
  });
  document.getElementById("closeDonateModalBtn").addEventListener("click", () => {
    document.getElementById("donateModal").classList.add("hidden");
  });

  const donateUrlInput = document.getElementById("donateSlipUrlInput");
  const donateFileInput = document.getElementById("donateSlipFileInput");
  const donatePreview = document.getElementById("donateSlipPreview");

  donateUrlInput.addEventListener("input", () => {
    const val = donateUrlInput.value.trim();
    if (val) {
      uploadedDonateSlipDataUrl = "";
      donatePreview.src = val;
      donatePreview.classList.remove("hidden");
    } else {
      donatePreview.classList.add("hidden");
    }
  });

  donateFileInput.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadedDonateSlipDataUrl = String(reader.result || "");
      donateUrlInput.value = "";
      donatePreview.src = uploadedDonateSlipDataUrl;
      donatePreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("donateForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const sender = document.getElementById("donateSenderInput").value.trim();
    const amount = Number(document.getElementById("donateAmountInput").value || 0);
    const note = document.getElementById("donateNoteInput").value.trim();
    const slip = uploadedDonateSlipDataUrl || donateUrlInput.value.trim() || "";
    if (!sender || amount <= 0) return;

    state.donations.unshift({
      id: "don-" + Date.now(),
      userId: user ? user.id : null,
      sender,
      amount,
      slip,
      note,
      status: "pending",
      createdAt: new Date().toLocaleString("th-TH")
    });

    pushAdminAlert("donate", `${sender} ส่งหลักฐานการโดเนทจำนวน ${amount} บาท`);
    saveState();
    e.target.reset();
    uploadedDonateSlipDataUrl = "";
    donatePreview.classList.add("hidden");
    document.getElementById("donateModal").classList.add("hidden");
    renderAll();
    alert("ส่งหลักฐานการโดเนทให้ผู้ดูแลระบบเรียบร้อยแล้วครับ");
  });

  document.getElementById("toggleCmsBtn").addEventListener("click", () => {
    document.getElementById("cmsPanel").classList.toggle("hidden");
    renderAdminLists();
  });

  const urlInput = document.getElementById("modImageUrlInput");
  const fileInput = document.getElementById("modImageFileInput");
  const preview = document.getElementById("modImagePreview");

  urlInput.addEventListener("input", () => {
    const val = urlInput.value.trim();
    if (val) {
      uploadedModImageDataUrl = "";
      preview.src = val;
      preview.classList.remove("hidden");
    } else {
      preview.classList.add("hidden");
    }
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadedModImageDataUrl = String(reader.result || "");
      urlInput.value = "";
      preview.src = uploadedModImageDataUrl;
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("modForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!canUserUploadMod(user)) return;

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
    preview.classList.add("hidden");
    renderMods();
  });

  document.getElementById("cosmeticForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("cosmeticTypeInput").value;
    const value = document.getElementById("cosmeticNameInput").value.trim();
    const unlockPoints = Math.max(0, Number(document.getElementById("cosmeticReqPoints").value || 0));
    const unlockExp = Math.max(0, Number(document.getElementById("cosmeticReqExp").value || 0));
    if (!value) return;

    state.cosmetics.push({ id: "c-" + Date.now(), type, value, unlockPoints, unlockExp });
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

  document.getElementById("adminUserList").addEventListener("click", async (e) => {
    const ptsBtn = e.target.closest("[data-grant-points]");
    const expBtn = e.target.closest("[data-grant-exp]");
    const bindBtn = e.target.closest("[data-bind-oauth]");
    const vipBtn = e.target.closest("[data-toggle-vip]");
    const uploadBtn = e.target.closest("[data-toggle-upload]");
    const delBtn = e.target.closest("[data-delete-user]");

    if (ptsBtn) {
      const userId = ptsBtn.dataset.grantPoints;
      const amount = Number(document.querySelector(`[data-pts-input="${userId}"]`)?.value);
      const target = state.users.find((u) => u.id === userId);
      if (target && Number.isFinite(amount) && amount !== 0) {
        target.points = Number(target.points || 0) + amount;
        saveState();
        renderAll();
      }
    }

    if (expBtn) {
      const userId = expBtn.dataset.grantExp;
      const amount = Number(document.querySelector(`[data-exp-input="${userId}"]`)?.value);
      const target = state.users.find((u) => u.id === userId);
      if (target && Number.isFinite(amount) && amount !== 0) {
        target.exp = Math.max(0, Number(target.exp || 0) + amount);
        saveState();
        renderAll();
      }
    }

    if (bindBtn) {
      const target = state.users.find((u) => u.id === bindBtn.dataset.bindOauth);
      if (!target) return;
      const provider = (prompt("ระบุผู้ให้บริการ (google / facebook / discord / twitter):", "google") || "").trim().toLowerCase();
      if (!["google", "facebook", "discord", "twitter"].includes(provider)) return;
      const oauthId = prompt(`กรอก ${provider} ID จริง:`, target.socialIds?.[provider] || "");
      if (!oauthId || !oauthId.trim()) return;
      target.socialIds[provider] = oauthId.trim();
      saveState();
      renderAll();
    }

    if (vipBtn) {
      const target = state.users.find((u) => u.id === vipBtn.dataset.toggleVip);
      if (target) {
        target.isVip = !target.isVip;
        saveState();
        renderAll();
      }
    }

    if (uploadBtn) {
      const target = state.users.find((u) => u.id === uploadBtn.dataset.toggleUpload);
      if (target) {
        target.canUploadMod = !target.canUploadMod;
        saveState();
        renderAll();
      }
    }

    if (delBtn) {
      const targetId = delBtn.dataset.deleteUser;
      const target = state.users.find((u) => u.id === targetId);
      if (!target || target.role === "admin") return;
      if (!confirm(`ยืนยันการลบบัญชี "${target.username}" ถาวรหรือไม่?`)) return;
      state.users = state.users.filter((u) => u.id !== targetId);
      if (state.currentUserId === targetId) state.currentUserId = null;
      saveState();
      renderAll();
    }
  });

  document.getElementById("adminDonateList").addEventListener("click", (e) => {
    const approveBtn = e.target.closest("[data-approve-donate]");
    const delBtn = e.target.closest("[data-delete-donate]");

    if (approveBtn) {
      const don = state.donations.find((d) => d.id === approveBtn.dataset.approveDonate);
      if (!don) return;
      don.status = "approved";
      if (don.userId) {
        const member = state.users.find((u) => u.id === don.userId);
        if (member) {
          member.isVip = true;
          member.titleLabel = "ผู้สนับสนุน VIP";
        }
      }
      state.publicNotifications.unshift({
        id: "pn-" + Date.now(),
        text: `ขอบคุณคุณ ${don.sender} สำหรับการโดเนทสนับสนุนจำนวน ${don.amount} บาท!`,
        createdAt: new Date().toLocaleString("th-TH")
      });
      saveState();
      renderAll();
    }

    if (delBtn) {
      state.donations = state.donations.filter((d) => d.id !== delBtn.dataset.deleteDonate);
      saveState();
      renderAdminLists();
    }
  });

  const switchMode = (targetMode) => {
    if (targetMode === "18+" && state.contentMode !== "18+") {
      if (!confirm("โหมดนี้สำหรับมอดเกม 18+ ยืนยันว่ามีอายุตามเกณฑ์ที่กำหนดหรือไม่?")) return;
    }
    state.contentMode = targetMode;
    saveState();
    renderHeaderAndProfile();
    renderMods();
  };

  document.getElementById("modeNormalBtn").addEventListener("click", () => switchMode("normal"));
  document.getElementById("modeAdultBtn").addEventListener("click", () => switchMode("18+"));
  document.getElementById("searchModInput").addEventListener("input", renderMods);
  document.getElementById("categoryFilter").addEventListener("change", renderMods);

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
      author: user ? `${user.username} (${user.id})` : "ผู้เยี่ยมชม",
      createdAt: new Date().toLocaleString("th-TH")
    });
    saveState();
    e.target.reset();
    renderBugAdminList();
  });
  document.getElementById("bugAdminList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-delete-bug]");
    if (!btn) return;
    state.bugReports = state.bugReports.filter((b) => b.id !== btn.dataset.deleteBug);
    saveState();
    renderBugAdminList();
  });

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
  applyLanguage();
  renderHeaderAndProfile();
  renderNotifications();
  renderSidebars();
  renderMods();
  renderAdminLists();
  renderBugAdminList();
}

if (document.body.dataset.page === "forum") {
  initForumPage();
} else {
  bindHomeEvents();
  renderAll();
  checkBackendConnection();
}