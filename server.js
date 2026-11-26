const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static(__dirname));

const DEFAULT_DB = {
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
      titleLabel: "ผู้ดูแลระบบ",
      frameId: "frame-gold"
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
      titleLabel: "ผู้สนับสนุน VIP",
      frameId: "frame-none"
    }
  ],
  mods: [],
  threads: [],
  bugReports: [],
  requests: [],
  donations: [],
  publicNotifications: [],
  adminNotifications: []
};

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), "utf8");
    return structuredClone(DEFAULT_DB);
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "Thai Mod Hub Backend" });
});

app.get("/api/state", (req, res) => {
  res.json(readDb());
});

app.post("/api/auth/oauth", (req, res) => {
  const provider = String(req.body?.provider || "").trim().toLowerCase();
  const oauthId = String(req.body?.oauthId || "").trim().toLowerCase();
  const allowedProviders = ["google", "facebook", "discord", "twitter"];

  if (!allowedProviders.includes(provider) || !oauthId) {
    return res.status(400).json({ error: "ผู้ให้บริการ OAuth หรือ ID บัญชีไม่ถูกต้อง" });
  }

  const db = readDb();
  const matched = db.users.find(
    (u) => String(u.socialIds?.[provider] || "").trim().toLowerCase() === oauthId
  );

  if (!matched) {
    return res.status(404).json({
      error: "ไม่พบ ID บัญชีจริงที่ผูกไว้ในระบบ"
    });
  }

  matched.provider = provider;
  writeDb(db);
  return res.json({ user: matched });
});

app.put("/api/state", (req, res) => {
  const incoming = req.body;
  if (!incoming || typeof incoming !== "object") {
    return res.status(400).json({ error: "ข้อมูลไม่ถูกต้อง" });
  }
  const db = readDb();
  const merged = {
    ...db,
    ...incoming,
    users: Array.isArray(incoming.users) && incoming.users.length ? incoming.users : db.users
  };
  writeDb(merged);
  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Thai Mod Hub Backend running at http://localhost:${PORT}`);
});