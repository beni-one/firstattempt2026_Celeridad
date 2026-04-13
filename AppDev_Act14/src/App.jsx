// Alumni Hub - Blue Links | SolidJS Multi-Screen Web Application
// Framework: SolidJS (JSX)

import { createSignal, createMemo, For, Show, onMount } from "solid-js";
import "./App.css";

// ─── DATA ────────────────────────────────────────────────────────────────────

const JOBS = [
  {
    id: 1,
    title: "Junior Full Stack Developer",
    company: "SkyTech Davao",
    salary: "₱90k – ₱110k",
    location: "Davao City",
    type: "Full-time",
    industry: "Information Technology",
    experience: "entry",
    blueKnight: true,
    posted: "2024-01-15",
    about:
      "We are looking for a passionate Junior Software Engineer to join our growing team. You will be working directly with our senior engineers to build scalable applications. This is a great opportunity for recent graduates to kickstart their career in a supportive environment.",
    requirements: [
      "Bachelor's degree in Computer Science or related field.",
      "Proficiency in JavaScript, HTML, and CSS.",
      "Experience with React or Vue.js is a plus.",
      "Strong problem-solving skills and attention to detail.",
    ],
    benefits: ["Health Insurance – Full coverage", "Remote Work – Hybrid options"],
    contact: "Sarah Jenkins – HR Manager at Davao Tech",
  },
  {
    id: 2,
    title: "Senior Full Stack Developer",
    company: "Shinsen Davao",
    salary: "₱90k – ₱110k",
    location: "Davao City",
    type: "Full-time",
    industry: "Information Technology",
    experience: "senior",
    blueKnight: true,
    posted: "2024-01-10",
    about: "Join Shinsen Davao's elite engineering team. We build cutting-edge fintech solutions.",
    requirements: [
      "10+ years of professional software development experience.",
      "Expert in TypeScript, Node.js, and cloud platforms.",
      "Experience leading engineering teams.",
    ],
    benefits: ["Executive health plan", "Stock options", "Remote-first culture"],
    contact: "Mark Reyes – CTO at Shinsen Davao",
  },
  {
    id: 3,
    title: "Senior Software Engineer",
    company: "Davao Tech Solutions",
    salary: "₱60k – ₱90k",
    location: "Davao City",
    type: "Full-time",
    industry: "Information Technology",
    experience: "senior",
    blueKnight: true,
    posted: "2024-01-15",
    about:
      "Join our growing team building innovative web applications for local businesses.",
    requirements: [
      "5+ years experience in software engineering.",
      "Proficiency in React, Node.js.",
      "Experience with AWS or GCP.",
    ],
    benefits: ["Health Insurance", "13th Month Pay"],
    contact: "Ana Torres – HR at Davao Tech Solutions",
  },
  {
    id: 4,
    title: "Product Designer",
    company: "Global Engineering Corp",
    salary: "₱80k – ₱120k",
    location: "Davao City",
    type: "Remote",
    industry: "Design",
    experience: "mid",
    blueKnight: false,
    posted: "2024-01-05",
    about: "Shape the future of our product experience as a Product Designer.",
    requirements: [
      "3+ years experience in UX/UI design.",
      "Proficiency in Figma.",
      "Portfolio demonstrating strong visual design skills.",
    ],
    benefits: ["Remote work", "Design tools stipend"],
    contact: "Lena Park – Talent at Global Engineering Corp",
  },
  {
    id: 5,
    title: "Junior Systems Analyst",
    company: "Build-IT Davao",
    salary: "₱40k – ₱60k",
    location: "Davao City",
    type: "Full-time",
    industry: "Information Technology",
    experience: "entry",
    blueKnight: false,
    posted: "2024-01-12",
    about: "Analyze and improve internal systems for a leading construction firm.",
    requirements: [
      "Bachelor's in IT or related field.",
      "Knowledge of SQL and data analysis.",
    ],
    benefits: ["HMO", "Performance bonus"],
    contact: "Carlo Lim – HR at Build-IT Davao",
  },
];

const APPLICATIONS = [
  {
    jobId: 1,
    status: "offer",
    appliedDate: "Oct 24, 2023",
    timeline: [
      { stage: "Application Sent", date: "Oct 24, 2023 • 10:30 AM", done: true },
      { stage: "Under Review", date: "Completed Nov 02, 2023", done: true },
      { stage: "Interview", date: "Completed Nov 09, 2023", done: true },
      {
        stage: "Final Decision",
        date: "Action Required",
        done: false,
        active: true,
        offer: true,
      },
    ],
    annualSalary: "₱950k",
    startDate: "Nov 15",
    benefits: [
      "HMO Coverage from Day 1",
      "15 Vacation Leaves / 15 Sick Leaves",
      "Hybrid Work Setup (2x Office)",
    ],
    benefitsPlan: "Standard Plan A",
    contract: "Full Contract.pdf – 2.4 MB",
  },
  {
    jobId: 3,
    status: "under_review",
    appliedDate: "2d ago",
    timeline: [
      { stage: "Application Sent", date: "Jan 11, 2024 • 9:00 AM", done: true },
      { stage: "Under Review", date: "In Progress • Est. 2-3 days", done: false, active: true },
      { stage: "Interview", date: "Pending Review", done: false },
      { stage: "Final Decision", date: "Hired or Declined", done: false },
    ],
  },
  {
    jobId: 4,
    status: "shortlisted",
    appliedDate: "5d ago",
    timeline: [
      { stage: "Application Sent", date: "Jan 8, 2024", done: true },
      { stage: "Shortlisted", date: "Active", done: false, active: true },
    ],
  },
  {
    jobId: 5,
    status: "not_selected",
    appliedDate: "2w ago",
    timeline: [
      { stage: "Application Sent", date: "Jan 1, 2024", done: true },
      { stage: "Not Selected", date: "Jan 10, 2024", done: true },
    ],
  },
];

const STATUS_CONFIG = {
  under_review: { label: "Under Review", color: "#f97316", bg: "#fff7ed" },
  shortlisted: { label: "Shortlisted", color: "#16a34a", bg: "#f0fdf4" },
  interviewing: { label: "Interviewing", color: "#7c3aed", bg: "#f5f3ff" },
  not_selected: { label: "Not Selected", color: "#6b7280", bg: "#f9fafb" },
  offer: { label: "Offer Received", color: "#0047AB", bg: "#eff6ff" },
  accepted: { label: "Accepted", color: "#16a34a", bg: "#f0fdf4" },
};

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    home: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="9 22 9 12 15 12 15 22"/>`,
    briefcase: `<rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>`,
    users: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>`,
    bell: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>`,
    user: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
    search: `<circle cx="11" cy="11" r="8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
    filter: `<polygon stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
    check: `<polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="20 6 9 17 4 12"/>`,
    x: `<line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
    download: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
    mail: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="22,6 12,13 2,6"/>`,
    copy: `<rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>`,
    shield: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    eye_off: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
    settings: `<circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>`,
    lock: `<rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11V7a5 5 0 0110 0v4"/>`,
    logout: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>`,
    chevron_right: `<polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="9 18 15 12 9 6"/>`,
    arrow_left: `<line x1="19" y1="12" x2="5" y2="12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="12 19 5 12 12 5"/>`,
    map_pin: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
    calendar: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="8" y1="2" x2="8" y2="6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="3" y1="10" x2="21" y2="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
    award: `<circle cx="12" cy="8" r="6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>`,
    file: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="14 2 14 8 20 8"/>`,
    qr: `<rect x="3" y="3" width="7" height="7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><rect x="14" y="3" width="7" height="7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><rect x="3" y="14" width="7" height="7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="14" y1="14" x2="14" y2="14" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><line x1="21" y1="14" x2="21" y2="14" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><line x1="14" y1="21" x2="14" y2="21" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><line x1="21" y1="21" x2="21" y2="21" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>`,
    trash: `<polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="3 6 5 6 21 6"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>`,
    info: `<circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
    edit: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
    share: `<circle cx="18" cy="5" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="6" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="18" cy="19" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`,
    building: `<rect x="2" y="7" width="10" height="15" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7l5-5 5 5v15H12V7z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 13h2M6 17h2M16 13h2M16 17h2"/>`,
    dollar: `<line x1="12" y1="1" x2="12" y2="23" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>`,
    clock: `<circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><polyline stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="12 6 12 12 16 14"/>`,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      innerHTML={icons[name] || ""}
    />
  );
};

// ─── LAYOUT COMPONENTS ───────────────────────────────────────────────────────

const Sidebar = ({ screen, setScreen }) => {
  const navItems = [
    { key: "home", label: "Home", icon: "home" },
    { key: "jobs", label: "Jobs", icon: "briefcase" },
    { key: "network", label: "Network", icon: "users" },
    { key: "notifications", label: "Notifications", icon: "bell" },
    { key: "profile", label: "Profile", icon: "user" },
  ];

  return (
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-logo">
          <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" width="36">
            <path d="M30 2L5 15v20c0 16 10 28 25 33C55 63 65 51 65 35V15L30 2z" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
            <path d="M30 12L12 22v14c0 10 7 18 18 21 11-3 18-11 18-21V22L30 12z" fill="#1e40af"/>
            <text x="30" y="36" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="Georgia">BL</text>
          </svg>
        </div>
        <div class="brand-text">
          <div class="brand-name">BLUE LINKS</div>
          <div class="brand-tagline">Rediscover. Reunite. Reconnect.</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <For each={navItems}>
          {(item) => (
            <button
              class={`nav-item ${screen() === item.key || (screen() === "job_detail" && item.key === "jobs") || (screen() === "applications" && item.key === "jobs") || (screen() === "job_filter" && item.key === "jobs") || (screen() === "application_detail" && item.key === "jobs") || (screen() === "decline_offer" && item.key === "jobs") || (screen() === "scan_qr" && item.key === "jobs") || (screen() === "alumni_verification" && item.key === "profile") || (screen() === "settings" && item.key === "profile") || (screen() === "stealth_mode" && item.key === "profile") ? "active" : ""}`}
              onClick={() => setScreen(item.key)}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </button>
          )}
        </For>
      </nav>
      <div class="sidebar-footer">
        <div class="user-mini">
          <div class="user-mini-avatar">S</div>
          <div class="user-mini-info">
            <div class="user-mini-name">Stephany Jobs</div>
            <div class="user-mini-class">Class of 2018 • BSIT</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────

const HomeScreen = ({ setScreen, setSelectedJob }) => {
  return (
    <div class="screen home-screen">
      <div class="screen-header">
        <div>
          <div class="school-label">ATENEO DE DAVAO BLUE KNIGHT</div>
          <h1 class="welcome-title">Welcome back, Stephany!</h1>
          <div class="class-label">Class of 2026 • Information Technology</div>
        </div>
        <div class="header-actions">
          <button class="btn-outline" onClick={() => setScreen("profile")}>Update Profile</button>
          <button class="btn-primary">Digital ID</button>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-section">
          <h3 class="section-title">Dashboard</h3>
          <div class="dashboard-cards">
            {[
              { icon: "file", label: "Request Records" },
              { icon: "briefcase", label: "Job Board", action: () => setScreen("jobs") },
              { icon: "dollar", label: "Donation" },
              { icon: "users", label: "Directory" },
            ].map((card) => (
              <button class="dash-card" onClick={card.action || (() => {})}>
                <div class="dash-icon"><Icon name={card.icon} size={24} color="#1e40af" /></div>
                <span>{card.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div class="news-events-grid">
          <div class="news-section">
            <div class="section-header">
              <h3 class="section-title">Latest News</h3>
              <button class="view-all">View All</button>
            </div>
            <div class="news-cards">
              <div class="news-card">
                <div class="news-img campus">
                  <div class="news-img-overlay">
                    <span class="news-category">Campus Update</span>
                  </div>
                </div>
                <div class="news-content">
                  <div class="news-title">Grand Alumni Homecoming 2024: Registration Now Open</div>
                  <div class="news-excerpt">Join thousands of Blue Knights this...</div>
                </div>
              </div>
              <div class="news-card">
                <div class="news-img infra">
                  <div class="news-img-overlay">
                    <span class="news-category">Infrastructure</span>
                  </div>
                </div>
                <div class="news-content">
                  <div class="news-title">Inauguration of the Martinez Sports Complex</div>
                  <div class="news-excerpt">A new chapter for...</div>
                </div>
              </div>
            </div>
          </div>

          <div class="events-section">
            <div class="section-header">
              <h3 class="section-title">Upcoming Events</h3>
              <button class="view-all">Calendar</button>
            </div>
            <div class="event-item">
              <div class="event-date">
                <div class="event-month">Dec</div>
                <div class="event-day">07</div>
              </div>
              <div class="event-info">
                <div class="event-name">Alumni Webinar: Tech Trends</div>
                <div class="event-time">⏰ 6:00 PM • Zoom</div>
              </div>
              <button class="event-arrow"><Icon name="chevron_right" size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── JOBS SCREEN ─────────────────────────────────────────────────────────────

const JobsScreen = ({ setScreen, setSelectedJob, jobTab, setJobTab }) => {
  const [search, setSearch] = createSignal("");
  const [filters, setFilters] = createSignal(["Information Technology", "Davao City"]);

  const removeFilter = (f) => setFilters(filters().filter((x) => x !== f));

  const filteredJobs = createMemo(() =>
    JOBS.filter((j) => {
      const q = search().toLowerCase();
      return (
        (j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.industry.toLowerCase().includes(q)) &&
        filters().every(
          (f) =>
            j.industry === f ||
            j.location === f ||
            f === "Information Technology" && j.industry === "Information Technology" ||
            f === "Davao City" && j.location === "Davao City"
        )
      );
    })
  );

  const partnerFirms = createMemo(() => filteredJobs().filter((j) => j.blueKnight).slice(0, 4));
  const jobsForYou = createMemo(() => filteredJobs().slice(0, 3));

  return (
    <div class="screen jobs-screen">
      <div class="tab-bar">
        <button
          class={`tab-btn ${jobTab() === "board" ? "active" : ""}`}
          onClick={() => setJobTab("board")}
        >Job Board</button>
        <button
          class={`tab-btn ${jobTab() === "applications" ? "active" : ""}`}
          onClick={() => { setJobTab("applications"); setScreen("applications"); }}
        >Applications</button>
      </div>

      <div class="search-row">
        <div class="search-bar">
          <Icon name="search" size={16} color="#9ca3af" />
          <input
            class="search-input"
            placeholder="Search roles, companies, or keywords"
            value={search()}
            onInput={(e) => setSearch(e.target.value)}
          />
        </div>
        <button class="filter-btn" onClick={() => setScreen("job_filter")}>
          <Icon name="filter" size={18} />
        </button>
      </div>

      <div class="filter-tags">
        <span class="filter-label">Filters:</span>
        <For each={filters()}>
          {(f) => (
            <span class="filter-tag">
              {f}
              <button class="tag-remove" onClick={() => removeFilter(f)}>
                <Icon name="x" size={12} />
              </button>
            </span>
          )}
        </For>
      </div>

      <div class="jobs-content">
        <div class="partner-section">
          <h3 class="section-title">Partner Firms in Davao</h3>
          <div class="partner-grid">
            <For each={partnerFirms()}>
              {(job) => (
                <div class="partner-card" onClick={() => { setSelectedJob(job); setScreen("job_detail"); }}>
                  <div class="partner-company">{job.company}</div>
                  <Show when={job.blueKnight}>
                    <span class="blue-knight-badge">⊙ Blue Knight Priority</span>
                  </Show>
                  <div class="partner-role">{job.title}</div>
                  <div class="partner-salary">💰 {job.salary}</div>
                  <div class="partner-location">📍 {job.location}</div>
                </div>
              )}
            </For>
          </div>
        </div>

        <div class="jobs-for-you">
          <div class="section-header">
            <h3 class="section-title">Jobs For You</h3>
            <button class="view-all">View all</button>
          </div>
          <For each={jobsForYou()}>
            {(job) => (
              <div class="job-card" onClick={() => { setSelectedJob(job); setScreen("job_detail"); }}>
                <div class="job-card-top">
                  <div>
                    <div class="job-card-title">{job.title}</div>
                    <div class="job-card-company">{job.company}</div>
                  </div>
                  <button class="btn-primary sm" onClick={(e) => { e.stopPropagation(); setSelectedJob(job); setScreen("job_detail"); }}>Apply Now</button>
                </div>
                <div class="job-meta">
                  <span class="job-meta-item"><Icon name="map_pin" size={13} /> {job.location}</span>
                  <span class="job-meta-item"><Icon name="clock" size={13} /> {job.type}</span>
                  <span class="job-meta-item"><Icon name="calendar" size={13} /> Posted {job.posted}</span>
                </div>
                <div class="job-card-desc">{job.about}</div>
                <div class="job-badges">
                  <Show when={job.blueKnight}>
                    <span class="blue-knight-badge">⊙ Blue Knight Priority</span>
                  </Show>
                  <span class="industry-badge">{job.industry}</span>
                  <span class="salary-badge">💰 {job.salary}</span>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

// ─── JOB DETAIL SCREEN ───────────────────────────────────────────────────────

const JobDetailScreen = ({ job, setScreen, setSelectedApp }) => {
  const [showQR, setShowQR] = createSignal(false);

  if (!job()) return null;
  const j = job();

  const handleApply = () => {
    setScreen("scan_qr");
  };

  return (
    <div class="screen detail-screen">
      <div class="detail-header">
        <button class="back-btn" onClick={() => setScreen("jobs")}>
          <Icon name="arrow_left" size={18} />
        </button>
        <div class="detail-header-info">
          <div class="detail-title">{j.title}</div>
          <div class="detail-company">{j.company}</div>
          <div class="detail-badges">
            <Show when={j.blueKnight}>
              <span class="blue-knight-badge">⊙ Blue Knight Priority</span>
            </Show>
            <span class="location-badge">📍 {j.location}</span>
          </div>
        </div>
      </div>

      <div class="detail-body">
        <div class="detail-main">
          <div class="detail-card">
            <div class="qr-apply-row">
              <div class="qr-icon">
                <Icon name="qr" size={32} color="#1e40af" />
              </div>
              <div class="qr-info">
                <div class="qr-title">Scan QR to Apply</div>
                <div class="qr-subtitle">Instant application at event booth</div>
              </div>
              <button class="btn-ghost" onClick={handleApply}>
                <Icon name="chevron_right" size={18} />
              </button>
            </div>
          </div>

          <div class="detail-section">
            <h4 class="detail-section-title">About the Role</h4>
            <p class="detail-text">{j.about}</p>
          </div>

          <div class="detail-section">
            <h4 class="detail-section-title">Requirements</h4>
            <ul class="req-list">
              <For each={j.requirements}>
                {(r) => (
                  <li class="req-item">
                    <span class="req-check"><Icon name="check" size={14} color="#16a34a" /></span>
                    {r}
                  </li>
                )}
              </For>
            </ul>
          </div>

          <div class="detail-section">
            <h4 class="detail-section-title">Benefits</h4>
            <div class="benefits-grid">
              <For each={j.benefits}>
                {(b) => {
                  const [label, desc] = b.split(" – ");
                  return (
                    <div class="benefit-card">
                      <div class="benefit-label">{label}</div>
                      <div class="benefit-desc">{desc || ""}</div>
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        </div>

        <div class="detail-sidebar">
          <div class="detail-card">
            <h4 class="detail-section-title">Job Info</h4>
            <div class="job-info-list">
              <div class="job-info-item">
                <Icon name="map_pin" size={15} color="#6b7280" />
                <span>{j.location}</span>
              </div>
              <div class="job-info-item">
                <Icon name="clock" size={15} color="#6b7280" />
                <span>{j.type}</span>
              </div>
              <div class="job-info-item">
                <Icon name="dollar" size={15} color="#6b7280" />
                <span>{j.salary}</span>
              </div>
              <div class="job-info-item">
                <Icon name="calendar" size={15} color="#6b7280" />
                <span>{j.industry}</span>
              </div>
            </div>
          </div>

          <button class="btn-primary full-width lg" onClick={handleApply}>
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── SCAN QR SCREEN ──────────────────────────────────────────────────────────

const ScanQRScreen = ({ setScreen, job }) => {
  const [submitted, setSubmitted] = createSignal(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setScreen("applications"), 1500);
  };

  return (
    <div class="screen scan-screen">
      <div class="scan-header">
        <button class="back-btn" onClick={() => setScreen("job_detail")}>
          <Icon name="arrow_left" size={18} />
        </button>
        <h2>Scan to Apply</h2>
        <button class="icon-btn"><Icon name="share" size={18} /></button>
      </div>

      <Show when={!submitted()}>
        <div class="qr-viewfinder">
          <div class="qr-frame">
            <div class="qr-corner tl" />
            <div class="qr-corner tr" />
            <div class="qr-corner bl" />
            <div class="qr-corner br" />
            <div class="qr-scan-line" />
            <div class="qr-placeholder-grid">
              {Array(64).fill(0).map((_, i) => (
                <div class={`qr-cell ${Math.random() > 0.5 ? "dark" : ""}`} />
              ))}
            </div>
          </div>
          <div class="qr-hint">Align QR code within the frame</div>
        </div>

        <div class="credentials-panel">
          <div class="credential-success">
            <Icon name="check" size={16} color="#16a34a" />
            <div>
              <div class="cred-title">Verified Credentials Found</div>
              <div class="cred-subtitle">Linked from University Registrar</div>
            </div>
          </div>
          <div class="credential-list">
            <div class="credential-item">
              <Icon name="file" size={18} color="#1e40af" />
              <div class="cred-info">
                <div class="cred-name">Transcript of Records (TOR)</div>
                <div class="cred-sub">Official Copy • 2023</div>
              </div>
              <Icon name="check" size={16} color="#16a34a" />
            </div>
            <div class="credential-item">
              <Icon name="award" size={18} color="#1e40af" />
              <div class="cred-info">
                <div class="cred-name">University Diploma</div>
                <div class="cred-sub">Bachelor of Science in IT</div>
              </div>
              <Icon name="check" size={16} color="#16a34a" />
            </div>
            <div class="credential-item">
              <Icon name="file" size={18} color="#6b7280" />
              <div class="cred-info">
                <div class="cred-name">3 Additional Certificates Available</div>
              </div>
              <Icon name="chevron_right" size={16} color="#9ca3af" />
            </div>
          </div>
          <div class="auto-share-row">
            <span>Automatically share verified documents</span>
            <div class="toggle active" />
          </div>
          <button class="btn-primary full-width lg" onClick={handleSubmit}>
            <Icon name="qr" size={18} /> Submit Application
          </button>
          <div class="secured-note">Secured by University Registrar System</div>
        </div>
      </Show>

      <Show when={submitted()}>
        <div class="submit-success">
          <div class="success-icon">✓</div>
          <h3>Application Submitted!</h3>
          <p>Your verified documents have been sent to the employer.</p>
        </div>
      </Show>
    </div>
  );
};

// ─── JOB FILTER SCREEN ───────────────────────────────────────────────────────

const JobFilterScreen = ({ setScreen }) => {
  const [blueKnight, setBlueKnight] = createSignal(true);
  const [skills, setSkills] = createSignal(["UI Design", "Figma"]);
  const [location, setLocation] = createSignal("Davao City");
  const [industry, setIndustry] = createSignal("Information Technology");
  const [jobType, setJobType] = createSignal(["Full-Time", "Remote"]);
  const [experience, setExperience] = createSignal("executive");
  const [salary, setSalary] = createSignal([60, 150]);

  const industries = ["Information Technology", "Engineering", "Design", "Marketing", "Management"];
  const jobTypes = ["Full-Time", "Part-Time", "Freelance", "Internship", "Remote"];
  const expLevels = [
    { key: "entry", label: "Entry Level" },
    { key: "mid", label: "Mid Level" },
    { key: "senior", label: "Senior" },
    { key: "director", label: "Director" },
    { key: "executive", label: "Executive (10+ years)", sublabel: "Senior Knight" },
  ];

  const toggleJobType = (t) => {
    if (jobType().includes(t)) setJobType(jobType().filter((x) => x !== t));
    else setJobType([...jobType(), t]);
  };

  return (
    <div class="screen filter-screen">
      <div class="filter-header">
        <button class="icon-btn" onClick={() => setScreen("jobs")}>
          <Icon name="x" size={20} />
        </button>
        <h2>Filters</h2>
        <button class="text-btn" onClick={() => setScreen("jobs")}>Reset</button>
      </div>
      <div class="filter-subtitle">Refine your alumni job search</div>

      <div class="filter-body">
        <div class="filter-row toggle-row">
          <span class="filter-field-label">⊙ Blue Knight Priority</span>
          <div class={`toggle ${blueKnight() ? "active" : ""}`} onClick={() => setBlueKnight(!blueKnight())} />
        </div>

        <div class="filter-field">
          <div class="filter-field-label">Filter by skills:</div>
          <div class="filter-hint">SELECT UP TO 3 SKILLS</div>
          <div class="filter-search-input">
            <Icon name="search" size={14} color="#9ca3af" />
            <input placeholder="Search for skills" />
          </div>
          <div class="filter-tags-row">
            <For each={skills()}>
              {(s) => (
                <span class="filter-tag active">
                  {s} <button class="tag-remove" onClick={() => setSkills(skills().filter((x) => x !== s))}><Icon name="x" size={11} /></button>
                </span>
              )}
            </For>
          </div>
        </div>

        <div class="filter-field">
          <div class="filter-field-label">Location</div>
          <div class="filter-search-input">
            <Icon name="search" size={14} color="#9ca3af" />
            <input placeholder="Search city or region..." />
          </div>
          <Show when={location()}>
            <span class="filter-tag active">
              {location()} <button class="tag-remove" onClick={() => setLocation("")}><Icon name="x" size={11} /></button>
            </span>
          </Show>
        </div>

        <div class="filter-field">
          <div class="filter-field-label">Industry</div>
          <div class="chip-grid">
            <For each={industries}>
              {(ind) => (
                <button
                  class={`chip ${industry() === ind ? "active" : ""}`}
                  onClick={() => setIndustry(ind)}
                >{ind}</button>
              )}
            </For>
          </div>
        </div>

        <div class="filter-field">
          <div class="filter-field-label">Job Type</div>
          <div class="filter-hint">SELECT ALL THAT APPLY</div>
          <div class="chip-grid">
            <For each={jobTypes}>
              {(t) => (
                <button
                  class={`chip ${jobType().includes(t) ? "active" : ""}`}
                  onClick={() => toggleJobType(t)}
                >{t}</button>
              )}
            </For>
          </div>
        </div>

        <div class="filter-field">
          <div class="filter-field-label">Experience Level</div>
          <For each={expLevels}>
            {(lvl) => (
              <div
                class={`exp-option ${experience() === lvl.key ? "active" : ""}`}
                onClick={() => setExperience(lvl.key)}
              >
                <div class={`exp-radio ${experience() === lvl.key ? "active" : ""}`}>
                  <Show when={experience() === lvl.key}><div class="exp-radio-dot" /></Show>
                </div>
                <div>
                  <div class="exp-label">{lvl.label}</div>
                  <Show when={lvl.sublabel}><div class="exp-sublabel">{lvl.sublabel}</div></Show>
                </div>
              </div>
            )}
          </For>
        </div>

        <div class="filter-field">
          <div class="filter-field-label-row">
            <span class="filter-field-label">Monthly Salary</span>
            <span class="salary-range">₱{salary()[0]}k – ₱{salary()[1]}k</span>
          </div>
          <div class="range-container">
            <input
              type="range" min="20" max="300" value={salary()[0]}
              class="range-slider"
              onInput={(e) => setSalary([+e.target.value, salary()[1]])}
            />
            <input
              type="range" min="20" max="300" value={salary()[1]}
              class="range-slider"
              onInput={(e) => setSalary([salary()[0], +e.target.value])}
            />
          </div>
          <div class="range-labels">
            <span>₱20k</span><span>₱300k+</span>
          </div>
        </div>
      </div>

      <div class="filter-footer">
        <button class="btn-primary full-width lg" onClick={() => setScreen("jobs")}>
          Search Jobs →
        </button>
      </div>
    </div>
  );
};

// ─── APPLICATIONS SCREEN ─────────────────────────────────────────────────────

const ApplicationsScreen = ({ setScreen, setSelectedApp, jobTab, setJobTab }) => {
  const [activeTab, setActiveTab] = createSignal("all");
  const tabs = ["all", "under_review", "interviewing", "shortlisted"];

  return (
    <div class="screen applications-screen">
      <div class="tab-bar">
        <button
          class={`tab-btn ${jobTab() === "board" ? "active" : ""}`}
          onClick={() => { setJobTab("board"); setScreen("jobs"); }}
        >Job Board</button>
        <button class="tab-btn active">Applications</button>
        <button class="icon-btn ml-auto"><Icon name="filter" size={18} /></button>
      </div>

      <div class="search-row">
        <div class="search-bar">
          <Icon name="search" size={16} color="#9ca3af" />
          <input class="search-input" placeholder="Search roles, companies, or keywords" />
        </div>
        <button class="filter-btn"><Icon name="filter" size={18} /></button>
      </div>

      <div class="status-tabs">
        <For each={tabs}>
          {(t) => (
            <button class={`status-tab ${activeTab() === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
              {t === "all" ? "All" : STATUS_CONFIG[t]?.label}
            </button>
          )}
        </For>
      </div>

      <div class="app-list">
        <For each={APPLICATIONS}>
          {(app) => {
            const job = JOBS.find((j) => j.id === app.jobId);
            const cfg = STATUS_CONFIG[app.status];
            return (
              <div
                class="app-card"
                onClick={() => { setSelectedApp(app); setScreen("application_detail"); }}
              >
                <div class="app-card-top">
                  <div class="app-card-info">
                    <div class="app-card-title">{job?.title}</div>
                    <div class="app-card-company">{job?.company}</div>
                    <div class="app-badge-row">
                      <Show when={job?.blueKnight}><span class="blue-knight-badge">⊙ Blue Knight Priority</span></Show>
                      <span class="industry-badge">{job?.industry}</span>
                    </div>
                  </div>
                  <span class="status-badge" style={{ background: cfg?.bg, color: cfg?.color }}>
                    • {cfg?.label}
                  </span>
                </div>
                <div class="app-card-bottom">
                  <span class="app-meta">⏱ Applied {app.appliedDate}</span>
                  <Show when={job?.location}><span class="app-meta">📍 {job.location}</span></Show>
                  <Show when={job?.salary}><span class="app-meta">💰 {job.salary}</span></Show>
                  <Show when={app.status === "shortlisted"}>
                    <button class="btn-primary sm" onClick={(e) => { e.stopPropagation(); setSelectedApp(app); setScreen("application_detail"); }}>
                      Book Interview
                    </button>
                  </Show>
                  <Show when={app.status === "offer"}>
                    <button class="btn-primary sm" onClick={(e) => { e.stopPropagation(); setSelectedApp(app); setScreen("application_detail"); }}>
                      View Acceptance Details →
                    </button>
                  </Show>
                </div>
                <Show when={app.status === "shortlisted"}>
                  <div class="shortlist-highlight">
                    ✨ Your profile stood out! The hiring manager would like to schedule an initial screening.
                  </div>
                </Show>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

// ─── APPLICATION DETAIL SCREEN ───────────────────────────────────────────────

const ApplicationDetailScreen = ({ app, setScreen }) => {
  if (!app()) return null;
  const a = app();
  const job = JOBS.find((j) => j.id === a.jobId);

  return (
    <div class="screen app-detail-screen">
      <div class="detail-header">
        <button class="back-btn" onClick={() => setScreen("applications")}>
          <Icon name="arrow_left" size={18} />
        </button>
        <h2>Application Details</h2>
      </div>

      <div class="app-detail-body">
        <div class="app-detail-main">
          <div class="app-detail-job-card">
            <div class="app-detail-badge-mark">✕</div>
            <div>
              <div class="app-detail-job-title">{job?.title}</div>
              <div class="app-detail-job-company">{job?.company}</div>
              <div class="app-badge-row">
                <span class="status-badge" style={{ background: "#eff6ff", color: "#1e40af" }}>
                  ⊙ Offer Received
                </span>
                <span class="location-badge">📍 {job?.location}</span>
              </div>
            </div>
          </div>

          <div class="timeline-section">
            <h4 class="detail-section-title">Current Status</h4>
            <div class="timeline">
              <For each={a.timeline}>
                {(step) => (
                  <div class={`timeline-item ${step.done ? "done" : ""} ${step.active ? "active" : ""}`}>
                    <div class="timeline-dot">
                      <Show when={step.done}><Icon name="check" size={12} color="white" /></Show>
                    </div>
                    <div class="timeline-content">
                      <div class="timeline-stage">{step.stage}</div>
                      <div class="timeline-date">{step.date}</div>
                      <Show when={step.offer}>
                        <div class="offer-box">
                          <div class="offer-icon">🎉</div>
                          <div>
                            <div class="offer-title">Congratulations!</div>
                            <div class="offer-text">We are pleased to offer you the position. Please review the offer letter sent to your email. You can accept or decline this offer below until December 10, 2023.</div>
                          </div>
                        </div>
                      </Show>
                    </div>
                    <span class={`timeline-status ${step.active ? "active" : ""}`}>
                      {step.done ? <Icon name="check" size={14} color="#16a34a" /> : step.active ? "Active" : ""}
                    </span>
                  </div>
                )}
              </For>
            </div>
          </div>

          <Show when={a.status === "offer"}>
            <div class="offer-highlights">
              <h4 class="detail-section-title">Offer Highlights</h4>
              <div class="offer-grid">
                <div class="offer-item">
                  <Icon name="dollar" size={20} color="#1e40af" />
                  <div class="offer-label">Annual Salary</div>
                  <div class="offer-value">{a.annualSalary}</div>
                </div>
                <div class="offer-item">
                  <Icon name="calendar" size={20} color="#1e40af" />
                  <div class="offer-label">Start Date</div>
                  <div class="offer-value">{a.startDate}</div>
                </div>
              </div>
              <div class="benefits-list">
                <div class="offer-label">Benefits Package – {a.benefitsPlan}</div>
                <For each={a.benefits}>
                  {(b) => <div class="benefit-item"><Icon name="check" size={14} color="#16a34a" /> {b}</div>}
                </For>
              </div>
              <div class="contract-item">
                <Icon name="file" size={18} color="#1e40af" />
                <span>{a.contract}</span>
                <Icon name="chevron_right" size={16} color="#9ca3af" />
              </div>
              <div class="contact-item">
                <Icon name="user" size={18} color="#6b7280" />
                <span>{job?.contact}</span>
                <button class="icon-btn"><Icon name="mail" size={16} /></button>
              </div>
            </div>
          </Show>
        </div>

        <Show when={a.status === "offer"}>
          <div class="app-detail-actions">
            <button class="btn-outline danger" onClick={() => setScreen("decline_offer")}>Decline</button>
            <button class="btn-primary lg" onClick={() => setScreen("applications")}>Accept Offer →</button>
          </div>
        </Show>
      </div>
    </div>
  );
};

// ─── DECLINE OFFER SCREEN ────────────────────────────────────────────────────

const DeclineOfferScreen = ({ app, setScreen }) => {
  const [reason, setReason] = createSignal("");
  const [note, setNote] = createSignal("Dear Hiring Manager, thank you for the opportunity...");
  const [confirmed, setConfirmed] = createSignal(false);
  const [declined, setDeclined] = createSignal(false);

  const job = JOBS.find((j) => j.id === app()?.jobId);

  const handleDecline = () => {
    if (!confirmed()) return;
    setDeclined(true);
    setTimeout(() => setScreen("applications"), 1500);
  };

  return (
    <div class="screen decline-screen">
      <div class="detail-header">
        <button class="back-btn" onClick={() => setScreen("application_detail")}>
          <Icon name="arrow_left" size={18} />
        </button>
        <h2>Decline Offer</h2>
      </div>

      <Show when={!declined()}>
        <div class="decline-job-card">
          <div class="app-detail-badge-mark">✕</div>
          <div>
            <div class="app-detail-job-title">{job?.title}</div>
            <div class="app-detail-job-company">{job?.company}</div>
            <div class="app-badge-row">
              <span class="status-badge" style={{ background: "#eff6ff", color: "#1e40af" }}>⊙ Offer Received</span>
              <span class="location-badge">📍 {job?.location}</span>
            </div>
          </div>
        </div>

        <div class="decline-info">
          <Icon name="info" size={18} color="#f97316" />
          <div>
            <strong>Declining an offer is a significant decision.</strong>
            <br />Providing a polite reason helps maintain a professional relationship for future opportunities.
          </div>
        </div>

        <div class="decline-form">
          <div class="form-group">
            <label class="form-label">Reason for Declining</label>
            <select class="form-select" value={reason()} onChange={(e) => setReason(e.target.value)}>
              <option value="">Select a reason...</option>
              <option>Accepted another offer</option>
              <option>Salary doesn't meet expectations</option>
              <option>Role not aligned with career goals</option>
              <option>Personal reasons</option>
              <option>Other</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Polite Note to Employer</label>
            <div class="form-hint">This message will be sent to the hiring manager. Keep it professional and brief.</div>
            <textarea
              class="form-textarea"
              rows={5}
              value={note()}
              onInput={(e) => setNote(e.target.value)}
            />
            <div class="char-count">{note().length}/500 characters</div>
          </div>

          <div class="use-template-row">
            <button class="text-btn">Use template</button>
          </div>

          <div
            class={`confirm-checkbox ${confirmed() ? "checked" : ""}`}
            onClick={() => setConfirmed(!confirmed())}
          >
            <div class={`checkbox ${confirmed() ? "active" : ""}`}>
              <Show when={confirmed()}><Icon name="check" size={12} color="white" /></Show>
            </div>
            <div>
              <strong>I confirm this decision is final</strong>
              <br /><span class="form-hint">Once submitted, this action cannot be undone immediately.</span>
            </div>
          </div>

          <button
            class={`btn-danger full-width lg ${!confirmed() ? "disabled" : ""}`}
            onClick={handleDecline}
          >
            Decline Offer ✕
          </button>
          <button class="btn-ghost full-width" onClick={() => setScreen("application_detail")}>
            Cancel
          </button>
        </div>
      </Show>

      <Show when={declined()}>
        <div class="submit-success">
          <div class="success-icon decline">✕</div>
          <h3>Offer Declined</h3>
          <p>Your polite note has been sent to the employer.</p>
        </div>
      </Show>
    </div>
  );
};

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────

const ProfileScreen = ({ setScreen }) => {
  return (
    <div class="screen profile-screen">
      <div class="profile-hero">
        <button class="profile-edit-btn"><Icon name="edit" size={16} /></button>
        <div class="profile-avatar">S</div>
        <div class="profile-name">Stephany</div>
        <div class="profile-class">Class of 2026 • Information Technology</div>
        <span class="verified-badge">⊙ Verified Alumni</span>
      </div>

      <div class="profile-body">
        <div class="profile-section-title">Account Management</div>
        <div class="profile-menu">
          {[
            { icon: "user", label: "Personal Information", sub: "Manage your contact details" },
            { icon: "award", label: "Academic Records", sub: "Degree and graduation details", action: () => setScreen("alumni_verification") },
            { icon: "file", label: "Alumni ID", sub: "View your digital alumni card" },
            { icon: "briefcase", label: "Job Preferences", sub: "Career opportunities & interests" },
          ].map((item) => (
            <button class="menu-item" onClick={item.action || (() => {})}>
              <div class="menu-icon"><Icon name={item.icon} size={18} color="#1e40af" /></div>
              <div class="menu-text">
                <div class="menu-label">{item.label}</div>
                <div class="menu-sub">{item.sub}</div>
              </div>
              <Icon name="chevron_right" size={16} color="#9ca3af" />
            </button>
          ))}
        </div>

        <div class="profile-section-title">App Settings</div>
        <div class="profile-menu">
          {[
            { icon: "settings", label: "Settings", sub: "Privacy, security, & notifications", action: () => setScreen("settings") },
            { icon: "logout", label: "Logout", sub: "Sign out of your account", danger: true },
          ].map((item) => (
            <button class={`menu-item ${item.danger ? "danger" : ""}`} onClick={item.action || (() => {})}>
              <div class="menu-icon"><Icon name={item.icon} size={18} color={item.danger ? "#ef4444" : "#1e40af"} /></div>
              <div class="menu-text">
                <div class={`menu-label ${item.danger ? "danger" : ""}`}>{item.label}</div>
                <div class="menu-sub">{item.sub}</div>
              </div>
              <Icon name="chevron_right" size={16} color="#9ca3af" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── ALUMNI VERIFICATION SCREEN ──────────────────────────────────────────────

const AlumniVerificationScreen = ({ setScreen }) => {
  const [copied, setCopied] = createSignal(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class="screen verification-screen">
      <div class="detail-header">
        <button class="back-btn" onClick={() => setScreen("profile")}>
          <Icon name="arrow_left" size={18} />
        </button>
        <h2>Alumni Verification</h2>
        <button class="icon-btn"><Icon name="share" size={18} /></button>
      </div>

      <div class="verification-body">
        <div class="verification-card">
          <div class="verif-avatar">S</div>
          <div class="verif-check">✓</div>
          <div class="verif-name">Jobs, Stephany A.</div>
          <span class="verified-badge large">⊙ Verified Alumni</span>

          <div class="verif-details">
            <div class="verif-field-label">Degree Program</div>
            <div class="verif-field-value bold">Bachelor of Science in Information Technology</div>

            <div class="verif-row">
              <div>
                <div class="verif-field-label">Graduation Year</div>
                <div class="verif-field-value">Class of 2018</div>
              </div>
              <div>
                <div class="verif-field-label">Honors</div>
                <div class="verif-field-value">Cum Laude</div>
              </div>
            </div>

            <div class="verif-field-label">Verification Hash</div>
            <div class="verif-hash">ALM-2020-BJ-9928-VX812</div>
          </div>

          <button class="btn-primary full-width">
            <Icon name="download" size={16} /> Download Official Verification (PDF)
          </button>

          <div class="verif-note">
            This digital credential is cryptographically signed and can be used for employment background checks and academic verification.
          </div>
        </div>

        <div class="verif-actions">
          <button class="verif-action-btn">
            <Icon name="mail" size={16} /> Email HR
          </button>
          <button class="verif-action-btn" onClick={handleCopy}>
            <Icon name="copy" size={16} /> {copied() ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── SETTINGS SCREEN ─────────────────────────────────────────────────────────

const SettingsScreen = ({ setScreen }) => {
  return (
    <div class="screen settings-screen">
      <div class="settings-hero">
        <div class="settings-icon"><Icon name="settings" size={40} color="white" /></div>
        <h2>Settings</h2>
      </div>

      <div class="settings-body">
        <div class="settings-section-label">PRIVACY</div>
        <div class="settings-menu">
          <button class="settings-item" onClick={() => setScreen("stealth_mode")}>
            <div class="settings-icon-wrap">
              <Icon name="eye_off" size={18} color="#1e40af" />
            </div>
            <div class="settings-text">
              <div class="settings-label">Stealth Mode</div>
              <div class="settings-sub">Manage who can see you</div>
            </div>
            <Icon name="chevron_right" size={16} color="#9ca3af" />
          </button>
        </div>

        <div class="settings-section-label">SECURITY</div>
        <div class="settings-menu">
          <button class="settings-item">
            <div class="settings-icon-wrap">
              <Icon name="lock" size={18} color="#1e40af" />
            </div>
            <div class="settings-text">
              <div class="settings-label">Password</div>
              <div class="settings-sub">Edit password</div>
            </div>
            <Icon name="chevron_right" size={16} color="#9ca3af" />
          </button>
        </div>

        <div class="settings-section-label">NOTIFICATIONS</div>
        <div class="settings-menu">
          <button class="settings-item">
            <div class="settings-icon-wrap">
              <Icon name="bell" size={18} color="#1e40af" />
            </div>
            <div class="settings-text">
              <div class="settings-label">Notifications</div>
              <div class="settings-sub">Manage notifications</div>
            </div>
            <Icon name="chevron_right" size={16} color="#9ca3af" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── STEALTH MODE SCREEN ─────────────────────────────────────────────────────

const StealthModeScreen = ({ setScreen }) => {
  const [enabled, setEnabled] = createSignal(true);
  const [blocked, setBlocked] = createSignal([
    { name: "TechCorp Solutions", added: "Added 2 months ago" },
    { name: "Global Finance Inc.", added: "Added yesterday" },
    { name: "Apex Innovations", added: "Current Employer" },
  ]);
  const [newCompany, setNewCompany] = createSignal("");

  const removeCompany = (name) => setBlocked(blocked().filter((c) => c.name !== name));
  const addCompany = () => {
    if (newCompany().trim()) {
      setBlocked([...blocked(), { name: newCompany().trim(), added: "Just now" }]);
      setNewCompany("");
    }
  };

  return (
    <div class="screen stealth-screen">
      <div class="stealth-hero">
        <button class="back-btn light" onClick={() => setScreen("settings")}>
          <Icon name="arrow_left" size={18} />
        </button>
        <div class="stealth-icon"><Icon name="eye_off" size={40} color="white" /></div>
        <h2>Stealth Mode</h2>
        <div class="stealth-subtitle">Privacy Settings</div>
      </div>

      <div class="stealth-body">
        <div class="stealth-toggle-row">
          <div>
            <Icon name="eye_off" size={18} color="#1e40af" />
          </div>
          <div class="stealth-toggle-text">
            <div class="stealth-toggle-label">Enable Stealth Mode</div>
            <div class="stealth-toggle-sub">Your profile and activity will be hidden from the companies listed below.</div>
          </div>
          <div class={`toggle ${enabled() ? "active" : ""}`} onClick={() => setEnabled(!enabled())} />
        </div>

        <div class="blocked-header">
          <span class="filter-field-label">BLOCKED COMPANIES</span>
          <span class="blocked-count">{blocked().length} Active</span>
        </div>

        <div class="blocked-search">
          <Icon name="search" size={14} color="#9ca3af" />
          <input
            placeholder="Add a company to block list..."
            value={newCompany()}
            onInput={(e) => setNewCompany(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCompany()}
          />
        </div>

        <div class="blocked-list">
          <For each={blocked()}>
            {(company) => (
              <div class="blocked-item">
                <div class="blocked-icon">
                  <Icon name="building" size={18} color="#1e40af" />
                </div>
                <div class="blocked-info">
                  <div class="blocked-name">{company.name}</div>
                  <div class="blocked-added">{company.added}</div>
                </div>
                <button class="icon-btn danger" onClick={() => removeCompany(company.name)}>
                  <Icon name="trash" size={16} color="#ef4444" />
                </button>
              </div>
            )}
          </For>
        </div>

        <div class="stealth-note">
          <Icon name="info" size={14} color="#f97316" />
          Recruiters from companies in this list will see your profile as "Anonymous Candidate" without photos or identifying details.
        </div>
      </div>
    </div>
  );
};

// ─── NETWORK SCREEN ──────────────────────────────────────────────────────────

const NetworkScreen = () => (
  <div class="screen network-screen">
    <div class="screen-header">
      <h2>Alumni Network</h2>
    </div>
    <div class="network-grid">
      {["Your Global Circle", "Blue Graduates United", "IT Alumni Davao", "Class of 2018"].map((group) => (
        <div class="network-card">
          <div class="network-avatar">{group[0]}</div>
          <div class="network-name">{group}</div>
          <div class="network-count">{Math.floor(Math.random() * 500 + 100)} members</div>
          <button class="btn-outline sm">View</button>
        </div>
      ))}
    </div>
  </div>
);

// ─── NOTIFICATIONS SCREEN ─────────────────────────────────────────────────────

const NotificationsScreen = () => (
  <div class="screen notifications-screen">
    <div class="screen-header">
      <h2>Notifications</h2>
    </div>
    <div class="notif-list">
      {[
        { icon: "briefcase", text: "Your application to SkyTech Davao has been shortlisted!", time: "2 hours ago", unread: true },
        { icon: "bell", text: "Grand Alumni Homecoming registration is now open.", time: "1 day ago", unread: true },
        { icon: "check", text: "Your alumni verification PDF is ready to download.", time: "3 days ago", unread: false },
        { icon: "users", text: "5 new Blue Knights joined your network.", time: "1 week ago", unread: false },
      ].map((n) => (
        <div class={`notif-item ${n.unread ? "unread" : ""}`}>
          <div class="notif-icon"><Icon name={n.icon} size={18} color="#1e40af" /></div>
          <div class="notif-content">
            <div class="notif-text">{n.text}</div>
            <div class="notif-time">{n.time}</div>
          </div>
          {n.unread && <div class="notif-dot" />}
        </div>
      ))}
    </div>
  </div>
);

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = createSignal("home");
  const [selectedJob, setSelectedJob] = createSignal(null);
  const [selectedApp, setSelectedApp] = createSignal(APPLICATIONS[0]);
  const [jobTab, setJobTab] = createSignal("board");

  return (
    <div class="app">
      <Sidebar screen={screen} setScreen={setScreen} />
      <main class="main-content">
        <Show when={screen() === "home"}>
          <HomeScreen setScreen={setScreen} setSelectedJob={setSelectedJob} />
        </Show>
        <Show when={screen() === "jobs"}>
          <JobsScreen setScreen={setScreen} setSelectedJob={setSelectedJob} jobTab={jobTab} setJobTab={setJobTab} />
        </Show>
        <Show when={screen() === "job_detail"}>
          <JobDetailScreen job={selectedJob} setScreen={setScreen} setSelectedApp={setSelectedApp} />
        </Show>
        <Show when={screen() === "scan_qr"}>
          <ScanQRScreen setScreen={setScreen} job={selectedJob} />
        </Show>
        <Show when={screen() === "job_filter"}>
          <JobFilterScreen setScreen={setScreen} />
        </Show>
        <Show when={screen() === "applications"}>
          <ApplicationsScreen setScreen={setScreen} setSelectedApp={setSelectedApp} jobTab={jobTab} setJobTab={setJobTab} />
        </Show>
        <Show when={screen() === "application_detail"}>
          <ApplicationDetailScreen app={selectedApp} setScreen={setScreen} />
        </Show>
        <Show when={screen() === "decline_offer"}>
          <DeclineOfferScreen app={selectedApp} setScreen={setScreen} />
        </Show>
        <Show when={screen() === "profile"}>
          <ProfileScreen setScreen={setScreen} />
        </Show>
        <Show when={screen() === "alumni_verification"}>
          <AlumniVerificationScreen setScreen={setScreen} />
        </Show>
        <Show when={screen() === "settings"}>
          <SettingsScreen setScreen={setScreen} />
        </Show>
        <Show when={screen() === "stealth_mode"}>
          <StealthModeScreen setScreen={setScreen} />
        </Show>
        <Show when={screen() === "network"}>
          <NetworkScreen />
        </Show>
        <Show when={screen() === "notifications"}>
          <NotificationsScreen />
        </Show>
      </main>
    </div>
  );
}
