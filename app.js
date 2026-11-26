function renderSidebars() {
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

  const modalRankList = document.getElementById("rankTiersModalList");
  if (modalRankList) {
    const user = getCurrentUser();
    const currentExp = Number(user?.exp || 0);
    modalRankList.innerHTML = RANK_LEVELS.map((r) => {
      const reached = user && currentExp >= r.minExp;
      return `
        <div class="tier-item">
          <div>
            <strong>${r.name}</strong>
            <div class="muted small-text">เงื่อนไข: สะสม EXP ขั้นต่ำ ${r.minExp} EXP</div>
          </div>
          <span class="${reached ? "upload-badge" : "provider-badge"}">${reached ? "ปลดล็อกแล้ว" : `${r.minExp} EXP`}</span>
        </div>`;
    }).join("");
  }

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

function renderCosmeticModal() {
  const user = getCurrentUser();
  const body = document.getElementById("cosmeticModalBody");
  if (!user || !body) return;

  const titleOptions = [...new Set(["นักผจญภัยหน้าใหม่", ...(user.unlockedTitles || []), ...state.cosmetics.filter((c) => c.type === "title" && canUnlockCosmetic(c, user)).map((c) => c.value)])];
  const frameOptions = [...new Set(["frame-none", ...(user.unlockedFrames || []), ...state.cosmetics.filter((c) => c.type === "frame" && canUnlockCosmetic(c, user)).map((c) => c.value)])];
  const avatarOptions = [...new Set([DEFAULT_AVATAR, ...(user.unlockedAvatars || []), ...state.cosmetics.filter((c) => c.type === "avatar" && canUnlockCosmetic(c, user)).map((c) => c.value)])];

  body.innerHTML = `
    <div class="form-group">
      <label for="editTitleSelect">เลือกฉายา (Title)</label>
      <select id="editTitleSelect">
        ${titleOptions.map((t) => `<option value="${t}" ${user.titleLabel === t ? "selected" : ""}>${t}</option>`).join("")}
      </select>
    </div>
    <div class="form-group">
      <label for="editFrameSelect">เลือกกรอบรูปโปรไฟล์ (Frame)</label>
      <select id="editFrameSelect">
        ${frameOptions.map((f) => `<option value="${f}" ${user.frameId === f ? "selected" : ""}>${f}</option>`).join("")}
      </select>
    </div>
    <div class="form-group">
      <label for="editAvatarSelect">เลือกรูปโปรไฟล์ที่ปลดล็อกแล้ว</label>
      <select id="editAvatarSelect">
        ${avatarOptions.map((a, idx) => `<option value="${a}" ${user.avatarSrc === a ? "selected" : ""}>รูปโปรไฟล์ #${idx + 1}</option>`).join("")}
      </select>
    </div>
    <div class="form-group">
      <label for="uploadCustomAvatarInput">หรืออัปโหลดรูปโปรไฟล์ใหม่จากเครื่อง</label>
      <input type="file" id="uploadCustomAvatarInput" accept="image/*" />
    </div>
    <button type="button" id="saveCosmeticProfileBtn" class="btn btn-primary">บันทึกการปรับแต่ง</button>
  `;

  let pendingAvatar = user.avatarSrc || DEFAULT_AVATAR;
  document.getElementById("uploadCustomAvatarInput")?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      pendingAvatar = String(reader.result || DEFAULT_AVATAR);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("saveCosmeticProfileBtn")?.addEventListener("click", () => {
    user.titleLabel = document.getElementById("editTitleSelect").value;
    user.frameId = document.getElementById("editFrameSelect").value;
    const chosenAvatar = document.getElementById("editAvatarSelect").value;
    user.avatarSrc = pendingAvatar !== (user.avatarSrc || DEFAULT_AVATAR) ? pendingAvatar : chosenAvatar;
    if (!user.unlockedAvatars.includes(user.avatarSrc)) {
      user.unlockedAvatars.push(user.avatarSrc);
    }
    saveState();
    document.getElementById("cosmeticModal").classList.add("hidden");
    renderAll();
  });
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

  document.getElementById("openRankTiersBtn")?.addEventListener("click", () => {
    renderSidebars();
    document.getElementById("rankTiersModal")?.classList.remove("hidden");
  });
  document.getElementById("closeRankTiersModalBtn")?.addEventListener("click", () => {
    document.getElementById("rankTiersModal")?.classList.add("hidden");
  });

  document.getElementById("openCosmeticBtn")?.addEventListener("click", () => {
    if (!getCurrentUser()) return;
    renderCosmeticModal();
    document.getElementById("cosmeticModal")?.classList.remove("hidden");
  });
  document.getElementById("closeCosmeticModalBtn")?.addEventListener("click", () => {
    document.getElementById("cosmeticModal")?.classList.add("hidden");
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

    if (item.type === "title") {
      user.titleLabel = item.value;
      if (!user.unlockedTitles.includes(item.value)) user.unlockedTitles.push(item.value);
    }
    if (item.type === "frame") {
      user.frameId = item.value;
      if (!user.unlockedFrames.includes(item.value)) user.unlockedFrames.push(item.value);
    }
    if (item.type === "avatar") {
      user.avatarSrc = item.value;
      if (!user.unlockedAvatars.includes(item.value)) user.unlockedAvatars.push(item.value);
    }
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