"use strict";

const SUPABASE_CONFIG = window.YS_SUPABASE_CONFIG || { url: "", anonKey: "" };
const ORDER_PAGE_SIZE = 500;
const ORDER_STATUSES = [
  { value: "new", label: "جديد" },
  { value: "contacted", label: "تم التواصل" },
  { value: "in_progress", label: "قيد المتابعة" },
  { value: "completed", label: "مكتمل" },
  { value: "cancelled", label: "ملغي" }
];
const REQUEST_TYPES = {
  business_quote: "عرض سعر شركة",
  contact: "استفسار",
  order: "طلب شراء"
};

let accessToken = "";
let refreshToken = "";
let tokenExpiresAt = 0;
let ownerEmail = "";
let allOrders = [];

function apiUrl(path) {
  return `${SUPABASE_CONFIG.url.replace(/\/+$/, "")}${path}`;
}

function headersFor(token) {
  return {
    apikey: SUPABASE_CONFIG.anonKey,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

function showMessage(elementId, message, isError) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.classList.toggle("is-error", Boolean(isError));
}

function setSession(session) {
  accessToken = session.access_token;
  refreshToken = session.refresh_token;
  tokenExpiresAt = Date.now() + Number(session.expires_in || 3600) * 1000;
  ownerEmail = session.user && session.user.email ? session.user.email : "";
}

async function renewSession() {
  if (!refreshToken) throw new Error("session-expired");
  const response = await fetch(apiUrl("/auth/v1/token?grant_type=refresh_token"), {
    method: "POST",
    headers: {
      apikey: SUPABASE_CONFIG.anonKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refresh_token: refreshToken })
  });
  if (!response.ok) throw new Error("session-expired");
  setSession(await response.json());
}

async function authenticatedFetch(path, options) {
  if (!accessToken) throw new Error("session-expired");
  if (Date.now() > tokenExpiresAt - 60000) await renewSession();
  let response = await fetch(apiUrl(path), {
    ...options,
    headers: { ...headersFor(accessToken), ...(options.headers || {}) }
  });
  if (response.status === 401 && refreshToken) {
    await renewSession();
    response = await fetch(apiUrl(path), {
      ...options,
      headers: { ...headersFor(accessToken), ...(options.headers || {}) }
    });
  }
  if (response.status === 401) throw new Error("session-expired");
  if (!response.ok) throw new Error(`request-failed-${response.status}`);
  return response;
}

function cell(content, className) {
  const element = document.createElement("td");
  if (className) element.className = className;
  element.textContent = content || "—";
  return element;
}

function appendStatusCell(row, order) {
  const cellElement = document.createElement("td");
  const controls = document.createElement("div");
  controls.className = "status-controls";
  const select = document.createElement("select");
  select.setAttribute("aria-label", `حالة الطلب ${order.customer_name || ""}`);
  ORDER_STATUSES.forEach((status) => {
    const option = document.createElement("option");
    option.value = status.value;
    option.textContent = status.label;
    option.selected = status.value === order.status;
    select.appendChild(option);
  });
  const button = document.createElement("button");
  button.className = "button button-outline button-small";
  button.type = "button";
  button.dataset.saveStatus = order.id;
  button.textContent = "حفظ";
  controls.append(select, button);
  cellElement.appendChild(controls);
  return cellElement;
}

function appendOrderRow(order, tableBody) {
  const row = document.createElement("tr");
  const date = new Date(order.created_at);
  row.appendChild(cell(Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("ar-EG")));
  const customerLabel = order.company_name && order.company_name !== order.customer_name
    ? `${order.customer_name} — ${order.company_name}`
    : order.customer_name;
  row.appendChild(cell(customerLabel));
  const phoneCell = document.createElement("td");
  const phoneLink = document.createElement("a");
  phoneLink.href = `tel:${String(order.phone || "").replace(/[^\d+]/g, "")}`;
  phoneLink.textContent = order.phone || "—";
  phoneCell.appendChild(phoneLink);
  row.appendChild(phoneCell);
  row.appendChild(cell(`${order.product || "—"} × ${order.quantity || 1}`));
  row.appendChild(cell(REQUEST_TYPES[order.request_type] || order.request_type));
  row.appendChild(cell(order.message));
  row.appendChild(cell(order.payment_method));
  row.appendChild(appendStatusCell(row, order));
  tableBody.appendChild(row);
}

function filteredOrders() {
  const query = document.getElementById("orderSearch").value.trim().toLocaleLowerCase();
  const status = document.getElementById("statusFilter").value;
  return allOrders.filter((order) => {
    const content = [
      order.customer_name,
      order.company_name,
      order.phone,
      order.product,
      order.message,
      order.payment_method
    ].join(" ").toLocaleLowerCase();
    return (!query || content.includes(query)) && (status === "all" || order.status === status);
  });
}

function renderOrders() {
  const body = document.getElementById("ordersTableBody");
  const visibleOrders = filteredOrders();
  body.replaceChildren();
  visibleOrders.forEach((order) => appendOrderRow(order, body));
  document.getElementById("emptyOrders").hidden = visibleOrders.length > 0;
  document.getElementById("totalOrders").textContent = String(allOrders.length);
  document.getElementById("newOrders").textContent = String(allOrders.filter((order) => order.status === "new").length);
  document.getElementById("activeOrders").textContent = String(allOrders.filter((order) => order.status === "contacted" || order.status === "in_progress").length);
}

async function fetchAllOrders() {
  const orders = [];
  for (let offset = 0; ; offset += ORDER_PAGE_SIZE) {
    const response = await authenticatedFetch(
      `/rest/v1/orders?select=id,created_at,customer_name,phone,company_name,product,quantity,request_type,message,payment_method,status&order=created_at.desc,id.desc`,
      { headers: { Range: `${offset}-${offset + ORDER_PAGE_SIZE - 1}`, "Range-Unit": "items" } }
    );
    const page = await response.json();
    orders.push(...page);
    if (page.length < ORDER_PAGE_SIZE) break;
  }
  return orders;
}

async function loadOrders() {
  const refresh = document.getElementById("refreshOrders");
  refresh.disabled = true;
  showMessage("dashboardMessage", "جارٍ تحميل الطلبات…", false);
  try {
    allOrders = await fetchAllOrders();
    renderOrders();
    showMessage("dashboardMessage", `تم تحميل ${allOrders.length} طلب.`, false);
  } catch (error) {
    if (error.message === "session-expired") {
      clearSession();
      showMessage("loginMessage", "انتهت الجلسة. سجّلي الدخول مرة أخرى.", true);
    } else {
      showMessage("dashboardMessage", "تعذّر تحميل الطلبات. تحققي من إعداد Supabase وسياسات قاعدة البيانات ثم حاولي مجددًا.", true);
    }
  } finally {
    refresh.disabled = false;
  }
}

function showDashboard() {
  document.getElementById("loginPanel").hidden = true;
  document.getElementById("ownerDashboard").hidden = false;
  document.getElementById("ownerIdentity").textContent = ownerEmail;
}

function clearSession() {
  accessToken = "";
  refreshToken = "";
  tokenExpiresAt = 0;
  ownerEmail = "";
  allOrders = [];
  document.getElementById("ownerDashboard").hidden = true;
  document.getElementById("loginPanel").hidden = false;
}

async function signIn(email, password) {
  const response = await fetch(apiUrl("/auth/v1/token?grant_type=password"), {
    method: "POST",
    headers: {
      apikey: SUPABASE_CONFIG.anonKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error("sign-in-failed");
  setSession(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  const configured = Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
  document.getElementById("setupNotice").hidden = configured;
  document.getElementById("loginPanel").hidden = !configured;
  if (!configured) return;

  document.getElementById("ownerLogin").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    showMessage("loginMessage", "جارٍ التحقق من الحساب…", false);
    try {
      await signIn(form.elements.email.value.trim(), form.elements.password.value);
      form.reset();
      showDashboard();
      await loadOrders();
    } catch (error) {
      showMessage("loginMessage", "تعذّر تسجيل الدخول. تحققي من البريد وكلمة المرور وإعدادات المشروع.", true);
    } finally {
      submit.disabled = false;
    }
  });

  document.getElementById("refreshOrders").addEventListener("click", loadOrders);
  document.getElementById("orderSearch").addEventListener("input", renderOrders);
  document.getElementById("statusFilter").addEventListener("change", renderOrders);
  document.getElementById("ownerLogout").addEventListener("click", async () => {
    const currentToken = accessToken;
    clearSession();
    if (currentToken) {
      try {
        const response = await fetch(apiUrl("/auth/v1/logout"), {
          method: "POST",
          headers: headersFor(currentToken)
        });
        if (!response.ok) showMessage("loginMessage", "تم تسجيل الخروج من اللوحة. تعذّر إبطال الجلسة على الخادم.", true);
      } catch (error) {
        showMessage("loginMessage", "تم تسجيل الخروج من هذا الجهاز. تعذّر الاتصال بالخادم لإبطال الجلسة.", true);
      }
    }
  });
  document.getElementById("ordersTableBody").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-save-status]");
    if (!button) return;
    const order = allOrders.find((item) => item.id === button.dataset.saveStatus);
    const status = button.closest("tr").querySelector("select").value;
    if (!order || status === order.status) return;
    button.disabled = true;
    try {
      await authenticatedFetch(`/rest/v1/orders?id=eq.${encodeURIComponent(order.id)}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ status })
      });
      order.status = status;
      renderOrders();
      showMessage("dashboardMessage", "تم تحديث حالة الطلب.", false);
    } catch (error) {
      if (error.message === "session-expired") {
        clearSession();
        showMessage("loginMessage", "انتهت الجلسة. سجّلي الدخول مرة أخرى.", true);
      } else {
        button.disabled = false;
        showMessage("dashboardMessage", "تعذّر تحديث الحالة. حاولي مجددًا.", true);
      }
    }
  });
});
