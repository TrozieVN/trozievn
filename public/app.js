
const SETTINGS = {
  businessEmail: "ntnh8686@gmail.com",
  zaloNumber: "091 418 7636",
  zaloLink: "https://zalo.me/0914187636",
  externalAdminUrl: "https://quanly.nhatrovn.vn/?rurl=%2Fmain%2Froom-sale%2Finit",
};

const defaultRooms = [
  {
    id: "hcm-q1-studio",
    title: "Studio cửa sổ lớn Quận 1",
    province: "TP. Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Bến Thành",
    address: "Nguyễn Trãi, Phường Bến Thành, Quận 1",
    type: "Studio",
    price: 6800000,
    area: 28,
    available: true,
    status: "Còn trống",
    deposit: "1 tháng",
    electricity: "4.000đ/kWh",
    water: "100.000đ/người",
    serviceFee: "Wifi miễn phí",
    parking: "Có chỗ để xe",
    maxPeople: 2,
    amenities: ["Máy lạnh", "Ban công", "Gác bếp", "Máy giặt chung"],
    description: "Phòng mới, gần trung tâm, phù hợp người đi làm cần không gian yên tĩnh.",
    photo: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-07-05T09:00:00",
  },
  {
    id: "danang-sontra-service",
    title: "Phòng dịch vụ gần biển Mỹ Khê",
    province: "Đà Nẵng",
    district: "Sơn Trà",
    ward: "Phường An Hải",
    address: "An Thượng, Sơn Trà",
    type: "Phòng dịch vụ",
    price: 4300000,
    area: 22,
    available: true,
    status: "Còn trống",
    deposit: "1 tháng",
    electricity: "Theo đồng hồ",
    water: "100.000đ/người",
    serviceFee: "Dọn phòng hằng tuần",
    parking: "Có bãi xe",
    maxPeople: 2,
    amenities: ["Dọn phòng", "Máy lạnh", "Cửa sổ", "Wifi riêng"],
    description: "Khu phố nhiều tiện ích, gần biển, có dịch vụ dọn phòng hằng tuần.",
    photo: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-07-08T09:00:00",
  },
  {
    id: "danang-haichau-studio",
    title: "Studio trung tâm Hải Châu",
    province: "Đà Nẵng",
    district: "Hải Châu",
    ward: "Phường Hải Châu 1",
    address: "Nguyễn Văn Linh, Hải Châu",
    type: "Studio",
    price: 5000000,
    area: 26,
    available: true,
    status: "Sắp trống",
    deposit: "1 tháng",
    electricity: "4.000đ/kWh",
    water: "Theo đồng hồ",
    serviceFee: "100.000đ/tháng",
    parking: "Hầm xe",
    maxPeople: 2,
    amenities: ["Thang máy", "Máy lạnh", "Nội thất", "Giờ tự do"],
    description: "Vị trí trung tâm, thuận tiện đi làm, ăn uống và di chuyển.",
    photo: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-07-07T09:00:00",
  },
  {
    id: "binhduong-thudaumot",
    title: "Phòng gác cao Thủ Dầu Một",
    province: "Bình Dương",
    district: "Thủ Dầu Một",
    ward: "Phường Phú Hòa",
    address: "Phú Hòa, Thủ Dầu Một",
    type: "Phòng trọ",
    price: 2600000,
    area: 20,
    available: true,
    status: "Còn trống",
    deposit: "1 tháng",
    electricity: "3.800đ/kWh",
    water: "80.000đ/người",
    serviceFee: "Wifi 50.000đ/tháng",
    parking: "Để xe miễn phí",
    maxPeople: 2,
    amenities: ["Gác lửng", "Giờ tự do", "Bếp riêng", "Chỗ để xe"],
    description: "Phòng sạch sẽ, chi phí hợp lý, thích hợp sinh viên hoặc người mới đi làm.",
    photo: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-07-04T09:00:00",
  },
];

let rooms = [];
let visibleProvinceCounts = {};
const PROVINCE_PAGE_SIZE = 6;

const provinceFilter = document.querySelector("#provinceFilter");
const districtFilter = document.querySelector("#districtFilter");
const wardFilter = document.querySelector("#wardFilter");
const priceFilter = document.querySelector("#priceFilter");
const sortFilter = document.querySelector("#sortFilter");
const typeFilter = document.querySelector("#typeFilter");
const searchInput = document.querySelector("#searchInput");
const roomGrid = document.querySelector("#roomGrid");
const roomSelect = document.querySelector("#roomSelect");
const resultCount = document.querySelector("#resultCount");
const visitForm = document.querySelector("#visitForm");
const mailStatus = document.querySelector("#mailStatus");
const zaloCard = document.querySelector("#zaloCard");
const zaloNumber = document.querySelector("#zaloNumber");
const ownerLoginForm = document.querySelector("#ownerLoginForm");
const ownerLoginStatus = document.querySelector("#ownerLoginStatus");
const ownerSession = document.querySelector("#ownerSession");
const ownerRoomForm = document.querySelector("#ownerRoomForm");
const ownerSubmitButton = document.querySelector("#ownerSubmitButton");
const cancelEditButton = document.querySelector("#cancelEditButton");
const ownerLogout = document.querySelector("#ownerLogout");
const dialog = document.querySelector("#roomDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialog = document.querySelector("#closeDialog");

function loadOwnerRooms() {
  try {
    return JSON.parse(localStorage.getItem("trozie_owner_rooms") || "[]");
  } catch {
    return [];
  }
}

function saveOwnerRooms(ownerRooms) {
  localStorage.setItem("trozie_owner_rooms", JSON.stringify(ownerRooms));
}

function loadRoomOverrides() {
  try {
    return JSON.parse(localStorage.getItem("trozie_room_overrides") || "{}");
  } catch {
    return {};
  }
}

function saveRoomOverrides(overrides) {
  localStorage.setItem("trozie_room_overrides", JSON.stringify(overrides));
}

function applyRoomOverrides(roomList) {
  const overrides = loadRoomOverrides();
  return roomList.map((room) => ({ ...room, ...(overrides[room.id] || {}) }));
}

function refreshRooms() {
  rooms = applyRoomOverrides([...defaultRooms, ...loadOwnerRooms()]);
}

function isOwnerRoom(room) {
  return true;
}

function isOwnerLoggedIn() {
  return sessionStorage.getItem("trozie_owner_logged_in") === "yes";
}

function setOwnerLoggedIn(value) {
  if (value) sessionStorage.setItem("trozie_owner_logged_in", "yes");
  else sessionStorage.removeItem("trozie_owner_logged_in");
}

function updateOwnerView() {
  const loggedIn = isOwnerLoggedIn();
  ownerLoginForm.hidden = loggedIn;
  ownerSession.hidden = !loggedIn;
  ownerRoomForm.hidden = !loggedIn;
  renderRooms();
}

function getNumericPrice(value) {
  if (typeof value === "number") return value;
  const raw = String(value || "").trim();
  if (!/^[\d\s.,]+$/.test(raw)) return null;
  const number = Number(raw.replace(/[^\d]/g, ""));
  return Number.isFinite(number) && number > 0 ? number : null;
}

function formatPrice(value) {
  const numericPrice = getNumericPrice(value);
  if (numericPrice) return new Intl.NumberFormat("vi-VN").format(numericPrice) + "đ";
  return String(value || "Liên hệ");
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function uniqueValues(key, sourceRooms = rooms) {
  return [...new Set(sourceRooms.map((room) => room[key]).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "vi"));
}

function refillSelect(select, placeholder, values, disabled = false) {
  select.innerHTML = "";
  select.append(new Option(placeholder, "all"));
  values.forEach((value) => select.append(new Option(value, value)));
  select.disabled = disabled;
}

function fillFilters() {
  refillSelect(provinceFilter, "Tất cả tỉnh thành", uniqueValues("province"));
  refillSelect(districtFilter, "Chọn tỉnh trước", [], true);
  refillSelect(wardFilter, "Chọn quận trước", [], true);
  refillSelect(typeFilter, "Tất cả loại phòng", uniqueValues("type"));
  fillRoomSelect();
}

function fillRoomSelect() {
  roomSelect.innerHTML = "";
  rooms.filter((room) => room.available).forEach((room) => {
    roomSelect.append(new Option(`${room.title} - ${room.district}, ${room.province}`, room.id));
  });
}

function updateDistrictOptions() {
  if (provinceFilter.value === "all") {
    refillSelect(districtFilter, "Chọn tỉnh trước", [], true);
    refillSelect(wardFilter, "Chọn quận trước", [], true);
    return;
  }

  const provinceRooms = rooms.filter((room) => room.province === provinceFilter.value);
  refillSelect(districtFilter, "Tất cả quận / huyện", uniqueValues("district", provinceRooms));
  refillSelect(wardFilter, "Chọn quận trước", [], true);
}

function updateWardOptions() {
  if (provinceFilter.value === "all" || districtFilter.value === "all") {
    refillSelect(wardFilter, "Chọn quận trước", [], true);
    return;
  }

  const districtRooms = rooms.filter((room) => (
    room.province === provinceFilter.value && room.district === districtFilter.value
  ));
  refillSelect(wardFilter, "Tất cả phường / xã", uniqueValues("ward", districtRooms));
}

function roomMatches(room) {
  const [minPrice, maxPrice] = priceFilter.value === "all"
    ? [0, Number.POSITIVE_INFINITY]
    : priceFilter.value.split("-").map(Number);
  const query = normalizeText(searchInput.value);
  const searchable = normalizeText([
    room.title,
    room.province,
    room.district,
    room.ward,
    room.address,
    room.type,
    room.amenities.join(" "),
  ].join(" "));

  const numericPrice = getNumericPrice(room.price);

  return (isOwnerLoggedIn() || room.available)
    && (provinceFilter.value === "all" || room.province === provinceFilter.value)
    && (districtFilter.disabled || districtFilter.value === "all" || room.district === districtFilter.value)
    && (wardFilter.disabled || wardFilter.value === "all" || room.ward === wardFilter.value)
    && (typeFilter.value === "all" || room.type === typeFilter.value)
    && (priceFilter.value === "all" || (numericPrice !== null && numericPrice >= minPrice && numericPrice <= maxPrice))
    && searchable.includes(query);
}

function sortRooms(roomList) {
  return [...roomList].sort((a, b) => {
    if (sortFilter.value === "price-asc") return (getNumericPrice(a.price) ?? Number.POSITIVE_INFINITY) - (getNumericPrice(b.price) ?? Number.POSITIVE_INFINITY);
    if (sortFilter.value === "price-desc") return (getNumericPrice(b.price) ?? -1) - (getNumericPrice(a.price) ?? -1);
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
}

function resetProvincePagination() {
  visibleProvinceCounts = {};
}

function renderRooms() {
  const filteredRooms = sortRooms(rooms.filter(roomMatches));
  resultCount.textContent = `${filteredRooms.length} kết quả`;

  if (!filteredRooms.length) {
    roomGrid.innerHTML = '<div class="empty">Chưa có phòng phù hợp bộ lọc. Hãy thử tỉnh thành hoặc mức giá khác</div>';
    return;
  }

  const roomsByProvince = filteredRooms.reduce((groups, room) => {
    if (!groups[room.province]) groups[room.province] = [];
    groups[room.province].push(room);
    return groups;
  }, {});

  roomGrid.innerHTML = Object.entries(roomsByProvince).map(([province, provinceRooms]) => {
    const visibleCount = Math.min(visibleProvinceCounts[province] || PROVINCE_PAGE_SIZE, provinceRooms.length);
    const visibleRooms = provinceRooms.slice(0, visibleCount);
    const hasMore = visibleCount < provinceRooms.length;

    return `
      <section class="province-group" data-province="${province}">
        <div class="province-heading">
          <div>
            <h3>${province}</h3>
            <span>Đang hiện ${visibleRooms.length}/${provinceRooms.length} phòng ${isOwnerLoggedIn() ? "trong hệ thống" : "còn trống"}</span>
          </div>
          <div class="province-controls">
            ${hasMore ? `<button class="province-button" type="button" data-more="${province}" aria-label="Xem thêm phòng ${province}">&gt;</button>` : ""}
            ${hasMore ? `<button class="province-button" type="button" data-all="${province}" aria-label="Xem tất cả phòng ${province}">...</button>` : ""}
          </div>
        </div>
        <div class="province-room-grid">
          ${visibleRooms.map((room) => `
            <article class="room-card compact-room-card ${room.available ? "" : "room-unavailable"}">
              <div class="room-photo" style="--photo: url('${room.photo}')"></div>
              <div class="room-body">
                <div class="price">${formatPrice(room.price)} / tháng</div>
                ${isOwnerLoggedIn() ? `<span class="pill">${room.available ? "Đang hiện với khách" : "Đã hủy, khách không thấy"}</span>` : ""}
                <button class="primary-button full" type="button" data-detail="${room.id}">Xem chi tiết phòng</button>
                ${isOwnerLoggedIn() ? `
                  ${isOwnerRoom(room) ? `<button class="secondary-button full" type="button" data-edit="${room.id}">Sửa phòng</button>` : ""}
                  ${room.sourceLink ? `<span class="pill">Phòng liên kết</span>` : ""}
                  <button class="danger-button full" type="button" data-toggle="${room.id}">
                    ${room.available ? "Hủy phòng" : "Mở lại phòng"}
                  </button>
                ` : ""}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function showRoomDetail(roomId) {
  const room = rooms.find((item) => item.id === roomId);
  if (!room) return;

  dialogContent.innerHTML = `
    <div class="dialog-photo" style="--photo: url('${room.photo}')"></div>
    <div class="dialog-body">
      <p class="eyebrow">${room.province} - ${room.district} - ${room.ward}</p>
      <h2>${room.title}</h2>
      <div class="price">${formatPrice(room.price)} / tháng</div>
      <p>${room.description}</p>
      <div class="room-meta">
        <span class="pill">Trạng thái: ${room.status || "Còn trống"}</span>
        <span class="pill">Địa chỉ: ${room.address}</span>
        <span class="pill">Diện tích: ${room.area || "Liên hệ"}</span>
        <span class="pill">Cọc: ${room.deposit || "1 tháng"}</span>
        <span class="pill">Điện: ${room.electricity || "Liên hệ"}</span>
        <span class="pill">Nước: ${room.water || "Liên hệ"}</span>
        <span class="pill">Wifi/dịch vụ: ${room.serviceFee || "Liên hệ"}</span>
        <span class="pill">Xe: ${room.parking || "Liên hệ"}</span>
        <span class="pill">Tối đa: ${room.maxPeople || "Liên hệ"}</span>
      </div>
      <div class="room-amenities">
        ${room.amenities.map((item) => `<span class="pill">${item}</span>`).join("")}
      </div>
      ${room.sourceLink ? `<a class="secondary-button" href="${room.sourceLink}" target="_blank" rel="noreferrer">Mở link phòng gốc</a>` : ""}
      ${room.available ? `<button class="primary-button" type="button" data-book="${room.id}">Đặt lịch xem phòng</button>` : ""}
    </div>
  `;
  dialog.showModal();
}

function selectRoomForVisit(roomId) {
  roomSelect.value = roomId;
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth", block: "start" });
}

function showZalo() {
  zaloCard.hidden = false;
  zaloNumber.textContent = SETTINGS.zaloNumber;
  zaloNumber.href = SETTINGS.zaloLink;
  window.open(SETTINGS.zaloLink, "_blank", "noopener");
}

async function sendVisitEmail(event) {
  event.preventDefault();

  const formData = new FormData(visitForm);

  const data = {
    room_id: formData.get("room"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    note: formData.get("note")
  };


  const response = await fetch("/api/visits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });


  const result = await response.json();


  if (result.id) {
    mailStatus.textContent = "Đã gửi yêu cầu xem phòng thành công";
    visitForm.reset();
  } else {
    mailStatus.textContent = "Có lỗi khi gửi yêu cầu";
  }

}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getOwnerFormRoom(formData, existingRoom = {}) {
  const field = (name, fallback = "") => String(formData.get(name) || "").trim() || fallback;

  return {
    id: existingRoom.id || `owner-${Date.now()}`,
    title: field("title", "Phòng mới Troziee"),
    province: field("province", "Chưa cập nhật"),
    district: field("district", "Chưa cập nhật"),
    ward: field("ward", "Chưa cập nhật"),
    address: field("address", "Chưa cập nhật"),
    type: field("type", "Phòng trọ"),
    price: field("price", "Liên hệ"),
    area: field("area", "Liên hệ"),
    available: existingRoom.available ?? formData.get("status") !== "Đã cho thuê",
    status: formData.get("status"),
    deposit: field("deposit", "Liên hệ"),
    electricity: field("electricity"),
    water: field("water"),
    serviceFee: field("serviceFee"),
    parking: field("parking"),
    maxPeople: field("maxPeople"),
    sourceLink: field("sourceLink"),
    amenities: String(formData.get("amenities") || "").split(",").map((item) => item.trim()).filter(Boolean),
    description: field("description", "Phòng mới được TrozieVn cập nhật."),
    photo: existingRoom.photo,
    createdAt: existingRoom.createdAt || new Date().toISOString(),
  };
}

async function saveOwnerRoom(event) {
console.log("ĐÃ BẤM NÚT THÊM PHÒNG");

  event.preventDefault();
  if (!isOwnerLoggedIn()) return;

  const formData = new FormData(ownerRoomForm);
  const editingId = formData.get("roomId");
  const ownerRooms = loadOwnerRooms();
  const existingRoom = ownerRooms.find((room) => room.id === editingId);
  const room = getOwnerFormRoom(formData, existingRoom);
  const photoFile = formData.get("photo");
console.log("FILE ẢNH:", photoFile);
let photoUrl = existingRoom?.photo || "";

if (photoFile && photoFile.size) {
  const uploadData = new FormData();
  uploadData.append("photo", photoFile);

  const uploadResponse = await fetch("/upload", {
    method: "POST",
    body: uploadData
  });

  const uploadResult = await uploadResponse.json();
  photoUrl = uploadResult.url;
}

  if (photoFile && photoFile.size) {
    room.photo = photoUrl;
  } else {
    room.photo = existingRoom?.photo || "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80";
  }

  const url = editingId
    ? `/api/rooms/${editingId}`
    : "/api/rooms";

const method = editingId ? "PUT" : "POST";

const response = await fetch(url, {
    method,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(room)
});

const result = await response.json();

console.log(result);

resetOwnerForm();
loadRoomsFromDatabase();
}

function editOwnerRoom(roomId) {
  if (!isOwnerLoggedIn()) return;
  const room = rooms.find((item) => String(item.id) === String(roomId));
  if (!room) return;

  ownerRoomForm.elements.roomId.value = room.id;
  ownerRoomForm.elements.title.value = room.title || "";
  ownerRoomForm.elements.province.value = room.province || "";
  ownerRoomForm.elements.district.value = room.district || "";
  ownerRoomForm.elements.ward.value = room.ward || "";
  ownerRoomForm.elements.address.value = room.address || "";
  ownerRoomForm.elements.type.value = room.type || "";
  ownerRoomForm.elements.price.value = room.price || "";
  ownerRoomForm.elements.area.value = room.area || "";
  ownerRoomForm.elements.deposit.value = room.deposit || "";
  ownerRoomForm.elements.electricity.value = room.electricity || "";
  ownerRoomForm.elements.water.value = room.water || "";
  ownerRoomForm.elements.serviceFee.value = room.serviceFee || "";
  ownerRoomForm.elements.parking.value = room.parking || "";
  ownerRoomForm.elements.maxPeople.value = room.maxPeople || "";
  ownerRoomForm.elements.status.value = room.status || "Còn trống";
  ownerRoomForm.elements.sourceLink.value = room.sourceLink || "";
  ownerRoomForm.elements.amenities.value = (room.amenities || []).join(", ");
  ownerRoomForm.elements.description.value = room.description || "";
  ownerSubmitButton.textContent = "Lưu chỉnh sửa phòng";
  cancelEditButton.hidden = false;
  document.querySelector("#owner").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetOwnerForm() {
  ownerRoomForm.reset();
  ownerRoomForm.elements.roomId.value = "";
  ownerSubmitButton.textContent = "Thêm phòng lên web";
  cancelEditButton.hidden = true;
}

function toggleRoomAvailability(roomId) {
  if (!isOwnerLoggedIn()) return;
  const room = rooms.find((item) => String(item.id) === String(roomId));
if (!room) return;

  const nextAvailable = !room.available;

  fetch(`/api/rooms/${roomId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    ...room,
    available: nextAvailable,
    status: nextAvailable ? "Còn trống" : "Đã cho thuê"
  })
})
.then(() => {
  loadRoomsFromDatabase();
});

  refreshAfterOwnerChange();
}

function refreshAfterOwnerChange() {
  refreshRooms();
  resetProvincePagination();
  fillFilters();
  renderRooms();
}

ownerLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(ownerLoginForm);

  const response = await fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: formData.get("phone"),
      password: formData.get("password")
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const result = await response.text();

  if (result === "Đăng nhập thành công") {
    setOwnerLoggedIn(true);
    ownerLoginStatus.textContent = result;
    ownerLoginForm.reset();
    updateOwnerView();
  } else {
    ownerLoginStatus.textContent = result;
  }
});

ownerLogout.addEventListener("click", () => {
  setOwnerLoggedIn(false);
  resetOwnerForm();
  updateOwnerView();
});

async function loadRoomsFromDatabase() {
  const response = await fetch("/api/rooms");
  const data = await response.json();

  rooms = data.map(room => ({
    ...room,

    id: String(room.id),

    amenities: room.amenities
        ? room.amenities.split(",").map(item => item.trim())
        : [],

    serviceFee: room.service_fee,
    maxPeople: room.max_people,
    sourceLink: room.source_link,

    available: room.status !== "Đã cho thuê",

    createdAt: room.created_at
}));

console.log("ROOM DATABASE:", rooms);
  fillFilters();
  renderRooms();
  updateOwnerView();
}

loadRoomsFromDatabase();

[priceFilter, sortFilter, typeFilter, searchInput].forEach((element) => {
  element.addEventListener("input", () => {
    resetProvincePagination();
    renderRooms();
  });
});

provinceFilter.addEventListener("input", () => {
  resetProvincePagination();
  updateDistrictOptions();
  renderRooms();
});

districtFilter.addEventListener("input", () => {
  resetProvincePagination();
  updateWardOptions();
  renderRooms();
});

wardFilter.addEventListener("input", () => {
  resetProvincePagination();
  renderRooms();
});

roomGrid.addEventListener("click", (event) => {
  const moreProvince = event.target.dataset.more;
  const allProvince = event.target.dataset.all;
  const detailId = event.target.dataset.detail;
  const bookId = event.target.dataset.book;
  const editId = event.target.dataset.edit;
  const toggleId = event.target.dataset.toggle;

  if (moreProvince) {
    visibleProvinceCounts[moreProvince] = (visibleProvinceCounts[moreProvince] || PROVINCE_PAGE_SIZE) + PROVINCE_PAGE_SIZE;
    renderRooms();
  }
  if (allProvince) {
    visibleProvinceCounts[allProvince] = rooms.filter((room) => room.province === allProvince && roomMatches(room)).length;
    renderRooms();
  }
  if (editId) editOwnerRoom(editId);
  if (toggleId) toggleRoomAvailability(toggleId);
  if (detailId) showRoomDetail(detailId);
  if (bookId) selectRoomForVisit(bookId);
});

dialogContent.addEventListener("click", (event) => {
  const bookId = event.target.dataset.book;
  if (bookId) {
    dialog.close();
    selectRoomForVisit(bookId);
  }
});

closeDialog.addEventListener("click", () => dialog.close());
visitForm.addEventListener("submit", sendVisitEmail);
ownerRoomForm.addEventListener("submit", saveOwnerRoom);
cancelEditButton.addEventListener("click", resetOwnerForm);
document.querySelector("#zaloTop").addEventListener("click", showZalo);
document.querySelector("#showZaloHero").addEventListener("click", showZalo);
