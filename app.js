const initialMembers = [
  { name: "Maya Patel", plan: "Peak Performance", trainer: "Jordan Lee", joined: "Sep 14, 2026", renewal: "Oct 14, 2026", status: "Active", color: "purple" },
  { name: "Noah Williams", plan: "Momentum", trainer: "Sofia Kim", joined: "Sep 12, 2026", renewal: "Dec 12, 2026", status: "Active", color: "orange" },
  { name: "Ethan Brooks", plan: "Essential", trainer: "Unassigned", joined: "Sep 10, 2026", renewal: "Oct 10, 2026", status: "Expiring soon", color: "green" },
  { name: "Ava Thompson", plan: "Peak Performance", trainer: "Jordan Lee", joined: "Sep 08, 2026", renewal: "Oct 08, 2026", status: "Active", color: "blue" },
  { name: "Liam Carter", plan: "Momentum", trainer: "Alex Rivera", joined: "Sep 05, 2026", renewal: "Dec 05, 2026", status: "Active", color: "purple" },
  { name: "Zoe Martinez", plan: "Essential", trainer: "Sofia Kim", joined: "Sep 03, 2026", renewal: "Sep 17, 2026", status: "Expiring soon", color: "orange" },
];

const trainers = [
  { initials: "JL", name: "Jordan Lee", role: "Strength & conditioning", sessions: "18", members: "34", color: "purple" },
  { initials: "SK", name: "Sofia Kim", role: "Mobility & wellness", sessions: "15", members: "28", color: "yellow" },
  { initials: "AR", name: "Alex Rivera", role: "HIIT & performance", sessions: "22", members: "41", color: "pink" },
];

const plans = [
  { name: "Essential", price: "₹49", cadence: "/ month", description: "A strong foundation for consistent training.", members: "42", revenue: "₹2,058" },
  { name: "Momentum", price: "₹89", cadence: "/ month", description: "More access, more accountability, more results.", members: "51", revenue: "₹4,539", featured: true },
  { name: "Peak Performance", price: "₹149", cadence: "/ month", description: "The complete coaching experience for ambitious goals.", members: "35", revenue: "₹5,215" },
];

const payments = [
  { name: "Maya Patel", plan: "Peak Performance", date: "Sep 14, 2026", amount: "₹149.00", method: "Visa •• 4242", status: "Paid" },
  { name: "Noah Williams", plan: "Momentum", date: "Sep 12, 2026", amount: "₹89.00", method: "UPI", status: "Paid" },
  { name: "Ethan Brooks", plan: "Essential", date: "Sep 10, 2026", amount: "₹49.00", method: "Mastercard •• 8821", status: "Pending" },
  { name: "Ava Thompson", plan: "Peak Performance", date: "Sep 08, 2026", amount: "₹149.00", method: "Visa •• 3418", status: "Paid" },
  { name: "Liam Carter", plan: "Momentum", date: "Sep 05, 2026", amount: "₹89.00", method: "UPI", status: "Paid" },
];

const schedules = [
  { time: "08:00 AM", title: "Morning Strength", trainer: "Jordan Lee · 8 members", capacity: "8 / 12", color: "" },
  { time: "12:30 PM", title: "Mobility Flow", trainer: "Sofia Kim · 10 members", capacity: "10 / 15", color: "yellow" },
  { time: "05:30 PM", title: "HIIT Performance", trainer: "Alex Rivera · 14 members", capacity: "14 / 16", color: "pink" },
  { time: "07:00 PM", title: "Evening Strength", trainer: "Jordan Lee · 12 members", capacity: "12 / 12", color: "" },
];

const getMembers = () => JSON.parse(localStorage.getItem("pulsefit-members") || "null") || [...initialMembers];
const initials = (name) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);
const memberRow = (member, full = false) => `<tr><td><div class="member-cell"><span class="member-avatar ${member.color || "purple"}">${initials(member.name)}</span>${member.name}</div></td><td>${member.plan}</td>${full ? `<td>${member.trainer}</td>` : ""}<td>${member.joined}</td>${full ? `<td>${member.renewal}</td>` : ""}<td><span class="badge ${member.status === "Active" ? "active" : "expiring"}">${member.status}</span></td></tr>`;
const paymentRow = (payment) => `<tr><td><div class="member-cell"><span class="member-avatar purple">${initials(payment.name)}</span>${payment.name}</div></td><td>${payment.plan}</td><td>${payment.date}</td><td><strong>${payment.amount}</strong></td><td>${payment.method}</td><td><span class="badge ${payment.status === "Paid" ? "paid" : "pending"}">${payment.status}</span></td></tr>`;

function render() {
  const members = getMembers();
  document.getElementById("activeMembers").textContent = 128 + Math.max(0, members.length - initialMembers.length);
  document.getElementById("memberNavCount").textContent = 128 + Math.max(0, members.length - initialMembers.length);
  document.getElementById("recentMembersBody").innerHTML = members.slice(0, 4).map((member) => memberRow(member)).join("");
  document.getElementById("membersBody").innerHTML = members.map((member) => memberRow(member, true)).join("");
  document.getElementById("paymentsBody").innerHTML = payments.map(paymentRow).join("");
  document.getElementById("trainerGrid").innerHTML = trainers.map((trainer) => `<article class="trainer-card"><div class="trainer-card-top"><div class="trainer-avatar">${trainer.initials}</div><div><h3>${trainer.name}</h3><p>${trainer.role}</p></div></div><div class="trainer-meta"><div><strong>${trainer.sessions}</strong>sessions this month</div><div><strong>${trainer.members}</strong>assigned members</div></div></article>`).join("");
  document.getElementById("planGrid").innerHTML = plans.map((plan) => `<article class="plan-card ${plan.featured ? "featured" : ""}">${plan.featured ? '<span class="plan-ribbon">MOST POPULAR</span>' : ""}<h3>${plan.name}</h3><div class="plan-price">${plan.price}<small>${plan.cadence}</small></div><p>${plan.description}</p><div class="plan-stat"><span>Active members</span><strong>${plan.members}</strong></div><div class="plan-stat"><span>Monthly revenue</span><strong>${plan.revenue}</strong></div></article>`).join("");
  document.getElementById("todaySchedule").innerHTML = schedules.slice(0, 3).map((item) => `<div class="schedule-item"><span class="schedule-time">${item.time}</span><i class="schedule-color ${item.color}"></i><div class="schedule-info"><strong>${item.title}</strong><span>${item.trainer}</span></div><span class="schedule-capacity">${item.capacity}</span></div>`).join("");
  document.getElementById("calendarEvents").innerHTML = schedules.map((item, index) => `<div class="calendar-event ${item.color}" style="grid-column: ${index + 2}; grid-row: ${index + 1};"><strong>${item.title}</strong><span>${item.time}</span></div>`).join("");
  document.getElementById("attendanceBarChart").innerHTML = [["Mon", 58], ["Tue", 76], ["Wed", 84], ["Thu", 67], ["Fri", 79], ["Sat", 52], ["Sun", 38]].map(([day, value]) => `<div class="bar-group"><span class="bar-value">${value}</span><i class="bar" style="height: ${value}%"></i><span class="bar-label">${day}</span></div>`).join("");
}

function showSection(sectionId) {
  document.querySelectorAll(".page-section").forEach((section) => section.classList.toggle("active", section.id === sectionId));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.section === sectionId));
  const title = sectionId.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  document.getElementById("breadcrumbTitle").textContent = title;
  document.getElementById("sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-section], [data-section-link]");
  if (nav) showSection(nav.dataset.section || nav.dataset.sectionLink);
});

document.getElementById("mobileMenu").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("quickAddButton").addEventListener("click", () => document.getElementById("memberModal").removeAttribute("hidden"));
document.getElementById("addMemberButton").addEventListener("click", () => document.getElementById("memberModal").removeAttribute("hidden"));
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("cancelModal").addEventListener("click", closeModal);
document.getElementById("memberModal").addEventListener("click", (event) => { if (event.target.id === "memberModal") closeModal(); });
document.getElementById("memberForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const members = getMembers();
  members.unshift({ name: formData.get("name"), plan: formData.get("plan"), trainer: formData.get("trainer"), joined: "Sep 16, 2026", renewal: "Oct 16, 2026", status: "Active", color: "blue" });
  localStorage.setItem("pulsefit-members", JSON.stringify(members));
  event.currentTarget.reset();
  closeModal();
  render();
  showSection("members");
});
document.getElementById("memberSearch").addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  document.getElementById("membersBody").innerHTML = getMembers().filter((member) => `${member.name} ${member.plan} ${member.trainer}`.toLowerCase().includes(query)).map((member) => memberRow(member, true)).join("");
});

function closeModal() { document.getElementById("memberModal").setAttribute("hidden", ""); }
render();
