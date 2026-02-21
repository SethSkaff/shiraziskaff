const defaultAdmin = { id: 'ADM-00001', email: 'shiraziskaff', password: 'hiranya', createdAt: new Date().toISOString() };

const state = {
  session: JSON.parse(localStorage.getItem('session') || 'null'),
  users: JSON.parse(localStorage.getItem('users') || '[]'),
  client: JSON.parse(localStorage.getItem('client') || 'null'),
  escorts: JSON.parse(localStorage.getItem('escorts') || '[]'),
  admins: (() => {
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    if (!admins.some((a) => a.email === defaultAdmin.email)) admins.push(defaultAdmin);
    return admins;
  })(),
  interested: JSON.parse(localStorage.getItem('interested') || '[]'),
  companyEmails: ['vip@shiraziskaff.com: 7 unread', 'concierge@shiraziskaff.com: 2 unread'],
  pendingAvailability: [],
  rawUploads: [],
  croppedUploads: [],
  cropStates: [],
  activeImage: 0,
  showQuickFilterOnEnter: false,
  currentFilters: null
};

function persist() {
  localStorage.setItem('session', JSON.stringify(state.session));
  localStorage.setItem('users', JSON.stringify(state.users));
  localStorage.setItem('client', JSON.stringify(state.client));
  localStorage.setItem('escorts', JSON.stringify(state.escorts));
  localStorage.setItem('admins', JSON.stringify(state.admins));
  localStorage.setItem('interested', JSON.stringify(state.interested));
}

const toInches = (ft, inch) => (Number(ft || 0) * 12) + Number(inch || 0);
const inchesText = (n) => `${Math.floor(n / 12)}ft ${n % 12}in`;
const nextId = (prefix, list) => `${prefix}-${String(list.reduce((m, x) => Math.max(m, Number(String(x.id || '').split('-')[1]) || 0), 0) + 1).padStart(5, '0')}`;

function defaultFilters() {
  return { sex: '', races: [], minHeight: null, maxHeight: null, minWeight: 0, maxWeight: 0, date: '', startTime: '', endTime: '' };
}

function fillHeightSelects() {
  document.querySelectorAll('select[name$="Ft"]').forEach((sel) => {
    const isQuick = sel.closest('#quick-filter-form');
    const opts = [];
    if (isQuick) opts.push('<option value="">No Preference</option>');
    for (let ft = 4; ft <= 8; ft++) opts.push(`<option value="${ft}">${ft} ft</option>`);
    sel.innerHTML = opts.join('');
  });
  document.querySelectorAll('select[name$="In"]').forEach((sel) => {
    const isQuick = sel.closest('#quick-filter-form');
    const opts = [];
    if (isQuick) opts.push('<option value="">No Preference</option>');
    for (let inch = 0; inch <= 11; inch++) opts.push(`<option value="${inch}">${inch} in</option>`);
    sel.innerHTML = opts.join('');
  });
}

const authOverlay = document.getElementById('auth-overlay');
const authChoice = document.getElementById('auth-choice');
const loginForm = document.getElementById('login-form');
const signupAccountForm = document.getElementById('signup-account-form');
const signupProfileForm = document.getElementById('signup-profile-form');
const authStatus = document.getElementById('auth-status');

function showAuthSection(id) {
  [authChoice, loginForm, signupAccountForm, signupProfileForm].forEach((x) => x.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  authStatus.textContent = '';
}

document.getElementById('show-login').addEventListener('click', () => showAuthSection('login-form'));
document.getElementById('show-signup').addEventListener('click', () => showAuthSection('signup-account-form'));
document.getElementById('logout').addEventListener('click', () => {
  state.session = null;
  persist();
  authOverlay.classList.remove('hidden');
  showAuthSection('auth-choice');
  applyAuthState();
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target).entries());

  const admin = state.admins.find((a) => a.email === payload.email && a.password === payload.password);
  if (admin) {
    state.session = { role: 'admin', id: admin.id, email: admin.email };
    persist();
    authOverlay.classList.add('hidden');
    applyAuthState();
    return;
  }

  const user = state.users.find((u) => u.email === payload.email && u.password === payload.password);
  if (user) {
    state.session = { role: 'client', id: user.id, email: user.email };
    state.client = { ...user };
    state.showQuickFilterOnEnter = true;
    persist();
    authOverlay.classList.add('hidden');
    applyAuthState();
    return;
  }

  authStatus.textContent = 'Invalid credentials.';
});

signupAccountForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target).entries());
  signupProfileForm.email.value = payload.email;
  signupProfileForm.password.value = payload.password;
  showAuthSection('signup-profile-form');
});

signupProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target).entries());
  if (state.users.some((u) => u.email === payload.email)) {
    authStatus.textContent = 'Account already exists.';
    return;
  }
  const user = { ...payload, id: nextId('ACC', state.users), createdAt: new Date().toISOString() };
  state.users.push(user);
  state.client = { ...user };
  state.session = { role: 'client', id: user.id, email: user.email };
  state.showQuickFilterOnEnter = true;
  persist();
  authOverlay.classList.add('hidden');
  applyAuthState();
});

const tabs = document.querySelectorAll('.tab-btn[data-tab]');
function switchTab(tab) {
  tabs.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
}
tabs.forEach((btn) => btn.addEventListener('click', () => {
  if (btn.dataset.tab === 'admin' && state.session?.role !== 'admin') return;
  switchTab(btn.dataset.tab);
}));

document.querySelectorAll('.module-btn').forEach((btn) => btn.addEventListener('click', () => {
  document.querySelectorAll('.module-btn').forEach((x) => x.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.module').forEach((m) => m.classList.remove('active'));
  document.getElementById(btn.dataset.module).classList.add('active');
}));

function applyAuthState() {
  const isAdmin = state.session?.role === 'admin';
  document.getElementById('admin-tab').style.display = isAdmin ? 'inline-block' : 'none';
  if (!isAdmin && document.getElementById('admin').classList.contains('active')) switchTab('user');

  if (state.client) {
    const form = document.getElementById('client-form');
    ['name', 'phone', 'sex', 'race', 'zip'].forEach((k) => form[k].value = state.client[k] || '');
    document.getElementById('account-id').textContent = `Account ID: ${state.client.id}`;
  }

  if (!state.currentFilters) state.currentFilters = defaultFilters();
  updateFilterSummary(state.currentFilters);
  renderEscorts(state.currentFilters);
  renderAdminViews();
  renderClientBookings();
  renderStats();
  if (state.showQuickFilterOnEnter && state.session?.role === 'client') {
    openQuickFilter();
    state.showQuickFilterOnEnter = false;
  }
}

document.getElementById('client-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  state.client = { ...state.client, ...data };
  state.users = state.users.map((u) => u.id === state.client.id ? { ...u, ...state.client, email: u.email, password: u.password } : u);
  persist();
  if (!state.currentFilters) state.currentFilters = defaultFilters();
  updateFilterSummary(state.currentFilters);
  renderEscorts(state.currentFilters);
  renderStats();
});

function zipToCoords(zip) {
  if (!/^\d{5}$/.test(zip || '')) return null;
  const n = Number(zip);
  return [24 + ((n % 7000) / 7000) * 25, -124 + ((n % 10000) / 10000) * 57];
}
function milesBetweenZip(a, b) {
  const c1 = zipToCoords(a), c2 = zipToCoords(b);
  if (!c1 || !c2) return null;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(c2[0] - c1[0]);
  const dLon = rad(c2[1] - c1[1]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(rad(c1[0])) * Math.cos(rad(c2[0])) * Math.sin(dLon / 2) ** 2;
  return 3958.8 * (2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)));
}
function timeOverlap(startA, endA, startB, endB) {
  if (!startA || !endA || !startB || !endB) return true;
  return startA <= endB && startB <= endA;
}

function readSelectedRaces(form, raceName = 'races', anyName = 'raceAny') {
  const checkboxes = [...form.querySelectorAll(`input[name=\"${raceName}\"]`)];
  if (checkboxes.length) {
    if (form[anyName]?.checked) return [];
    return checkboxes.filter((x) => x.checked).map((x) => x.value);
  }
  const select = form.querySelector(`select[name=\"${raceName}\"]`);
  if (!select || !select.value) return [];
  return [select.value];
}

function gatherFilters(form) {
  const fd = new FormData(form);
  const minFt = fd.get('minHeightFt');
  const minIn = fd.get('minHeightIn');
  const maxFt = fd.get('maxHeightFt');
  const maxIn = fd.get('maxHeightIn');
  return {
    sex: fd.get('sex') || '',
    races: readSelectedRaces(form),
    minHeight: minFt === '' && minIn === '' ? null : toInches(minFt || 0, minIn || 0),
    maxHeight: maxFt === '' && maxIn === '' ? null : toInches(maxFt || 0, maxIn || 0),
    minWeight: Number(fd.get('minWeight') || 0),
    maxWeight: Number(fd.get('maxWeight') || 0),
    date: fd.get('date') || '',
    startTime: fd.get('startTime') || '',
    endTime: fd.get('endTime') || ''
  };
}

function escortMatchesFilters(escort, filters) {
  if (filters.sex && escort.sex !== filters.sex) return false;
  if (filters.races.length && !filters.races.includes(escort.race)) return false;
  if (filters.minHeight && escort.heightInches < filters.minHeight) return false;
  if (filters.maxHeight && escort.heightInches > filters.maxHeight) return false;
  if (filters.minWeight && escort.weightLbs < filters.minWeight) return false;
  if (filters.maxWeight && escort.weightLbs > filters.maxWeight) return false;
  if (!filters.date && !filters.startTime && !filters.endTime) return true;
  return escort.availability.some((slot) => {
    const dateMatch = !filters.date || slot.date === filters.date;
    const timeMatch = (!filters.startTime && !filters.endTime) || timeOverlap(filters.startTime || slot.start, filters.endTime || slot.end, slot.start, slot.end);
    return dateMatch && timeMatch;
  });
}

function eligibleEscort(escort) {
  if (!state.client) return true;
  const prefSex = escort.preferences.sexes.length ? escort.preferences.sexes.includes(state.client.sex) : true;
  const prefRace = escort.preferences.races.length ? escort.preferences.races.includes(state.client.race) : true;
  const distance = milesBetweenZip(state.client.zip, escort.zip);
  const inRange = distance == null || distance <= escort.driveRadius;
  return prefSex && prefRace && inRange;
}



function renderEscorts(filters = (state.currentFilters || defaultFilters())) {
  const wrap = document.getElementById('escort-grid');
  wrap.innerHTML = '';

  state.escorts
    .filter(eligibleEscort)
    .filter((escort) => escortMatchesFilters(escort, filters))
    .forEach((escort) => {
      let idx = 0;
      const card = document.createElement('article');
      card.className = 'escort-card';
      const distance = state.client?.zip ? milesBetweenZip(state.client.zip, escort.zip) : null;
      card.innerHTML = `
        <div class="carousel" style="background-image:url('${escort.photos[0] || ''}')">
          <div class="carousel-nav"><button type="button" data-dir="-1">◀</button><button type="button" data-dir="1">▶</button></div>
        </div>
        <div class="escort-body">
          <h3>${escort.name}</h3>
          <p class="meta">${escort.sex} • ${escort.race}<br/>${inchesText(escort.heightInches)} • ${escort.weightLbs} lbs<br/>ZIP ${escort.zip} • ${distance == null ? 'Distance unavailable' : `${Math.round(distance)} mi away`}</p>
          <p class="status">${escort.availability.length} availability slots</p>
          <button type="button" data-open="${escort.id}">View Profile & Request Quote</button>
        </div>`;

      const carousel = card.querySelector('.carousel');
      const update = () => { if (escort.photos.length) carousel.style.backgroundImage = `url('${escort.photos[idx % escort.photos.length]}')`; };
      card.querySelectorAll('.carousel-nav button').forEach((btn) => btn.addEventListener('click', () => {
        idx = (idx + Number(btn.dataset.dir) + escort.photos.length) % escort.photos.length;
        update();
      }));
      setInterval(() => { if (escort.photos.length) { idx = (idx + 1) % escort.photos.length; update(); } }, 3000);
      card.querySelector('[data-open]').addEventListener('click', () => openProfile(escort));
      wrap.append(card);
    });

  if (!wrap.children.length) wrap.innerHTML = '<p class="status">No companions match your current preferences.</p>';
}

const profileModal = document.getElementById('profile-modal');
document.getElementById('close-modal').addEventListener('click', () => profileModal.close());

function openProfile(escort) {
  document.getElementById('modal-body').innerHTML = `
    <h2>${escort.name}</h2>
    <p>${escort.bio}</p>
    <p><strong>Info:</strong> ${escort.sex} • ${escort.race} • ${inchesText(escort.heightInches)} • ${escort.weightLbs} lbs</p>
    <p><strong>Open Slots:</strong> ${escort.availability.map((s) => `${s.date} ${s.start}-${s.end}`).slice(0, 8).join(', ') || 'No open slots'}</p>
    <div class="modal-images">${escort.photos.map((p) => `<img src="${p}" alt="${escort.name}" />`).join('')}</div>
    <form id="quote-form" class="form-grid" style="margin-top:1rem;">
      <label>Phone Number <input name="phone" required /></label>
      <label>Preferred Date <input name="date" type="date" required /></label>
      <label>Preferred Time <input name="time" type="time" required /></label>
      <button type="submit">Request Quote</button>
    </form>`;
  profileModal.showModal();
  document.getElementById('quote-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target).entries());
    state.interested.push({ ...payload, escort: escort.name, client: state.client?.name || 'Guest', clientId: state.client?.id || 'N/A' });
    persist();
    renderAdminViews();
    renderStats();
    profileModal.close();
  });
}

const quickDialog = document.getElementById('quick-filter-dialog');
function openQuickFilter() {
  switchTab('user');
  quickDialog.showModal();
}

document.getElementById('cancel-quick-filter').addEventListener('click', () => quickDialog.close());
document.getElementById('reset-quick-filter').addEventListener('click', () => {
  const form = document.getElementById('quick-filter-form');
  form.reset();
  ['minHeightFt','minHeightIn','maxHeightFt','maxHeightIn'].forEach((n)=>form[n].value='');
});
document.getElementById('reopen-filters').addEventListener('click', openQuickFilter);
document.getElementById('clear-filters').addEventListener('click', () => {
  state.currentFilters = defaultFilters();
  updateFilterSummary(state.currentFilters);
  renderEscorts(state.currentFilters);
});

function updateFilterSummary(filters) {
  const lines = [];
  if (filters.sex) lines.push(`Sex: ${filters.sex}`);
  if (filters.races.length) lines.push(`Race: ${filters.races.join(', ')}`);
  if (filters.minHeight || filters.maxHeight) lines.push('Height preference set');
  if (filters.minWeight || filters.maxWeight) lines.push('Weight preference set');
  if (filters.date) lines.push(`Date: ${filters.date}`);
  if (filters.startTime || filters.endTime) lines.push('Time range set');
  document.getElementById('filter-summary').textContent = lines.length ? lines.join(' • ') : 'No Preference across all filters.';
}

document.getElementById('quick-filter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  state.currentFilters = gatherFilters(e.target);
  updateFilterSummary(state.currentFilters);
  renderEscorts(state.currentFilters);
  quickDialog.close();
});

// Admin companion preferences race checkbox logic
const escortForm = document.getElementById('escort-form');
escortForm.addEventListener('change', (e) => {
  if (e.target.name === 'prefRaceAny' && e.target.checked) escortForm.querySelectorAll('input[name="prefRaces"]').forEach((x) => x.checked = false);
  if (e.target.name === 'prefRaces' && e.target.checked) escortForm.prefRaceAny.checked = false;
});

function buildAvailability() {
  const month = escortForm.month.value;
  const singleDate = escortForm.singleDate.value;
  const weekdays = [...escortForm.querySelectorAll('input[name="weekday"]:checked')].map((x) => Number(x.value));
  const start = escortForm.earlyTime.value;
  const end = escortForm.lateTime.value;
  const dates = [];

  if (singleDate) dates.push(singleDate);
  if (month && weekdays.length) {
    const [y, m] = month.split('-').map(Number);
    const d = new Date(y, m - 1, 1);
    while (d.getMonth() === m - 1) {
      if (weekdays.includes(d.getDay())) dates.push(d.toISOString().slice(0, 10));
      d.setDate(d.getDate() + 1);
    }
  }

  [...new Set(dates)].forEach((date) => state.pendingAvailability.push({ date, start, end }));
  renderAvailabilityPreview();
}
function renderAvailabilityPreview() {
  document.getElementById('availability-preview').innerHTML = state.pendingAvailability.length ? state.pendingAvailability
    .map((s, i) => `<li>${s.date} • ${s.start}-${s.end} <button type=\"button\" data-remove-slot=\"${i}\">remove</button></li>`).join('') : '<li>No slots selected.</li>';
  document.querySelectorAll('[data-remove-slot]').forEach((btn) => btn.addEventListener('click', () => {
    state.pendingAvailability.splice(Number(btn.dataset.removeSlot), 1);
    renderAvailabilityPreview();
  }));
}
document.getElementById('add-availability').addEventListener('click', buildAvailability);
document.getElementById('clear-availability').addEventListener('click', () => { state.pendingAvailability = []; renderAvailabilityPreview(); });
document.getElementById('set-weekdays').addEventListener('click', () => {
  escortForm.querySelectorAll('input[name="weekday"]').forEach((c)=>c.checked = ['1','2','3','4','5'].includes(c.value));
});
document.getElementById('set-weekends').addEventListener('click', () => {
  escortForm.querySelectorAll('input[name="weekday"]').forEach((c)=>c.checked = ['0','6'].includes(c.value));
});
document.getElementById('time-preset').addEventListener('change', (e) => {
  if (!e.target.value) return;
  const [start,end] = e.target.value.split('-');
  escortForm.earlyTime.value = start;
  escortForm.lateTime.value = end;
});

function drawCrop(index) {
  const src = state.rawUploads[index];
  if (!src) return;
  const settings = state.cropStates[index] || { zoom: 1, y: 50 };
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    const zoom = settings.zoom;
    const sourceW = img.width / zoom;
    const sourceH = img.height / zoom;
    const sourceY = Math.max(0, (img.height - sourceH) * (settings.y / 100));
    ctx.drawImage(img, 0, sourceY, sourceW, sourceH, 0, 0, 600, 800);
    state.croppedUploads[index] = canvas.toDataURL('image/jpeg', 0.9);
    renderCropUI();
  };
  img.src = src;
}
function renderCropUI() {
  const counter = document.getElementById('image-counter');
  if (!state.rawUploads.length) {
    counter.textContent = 'No images selected';
    document.getElementById('active-crop-preview').innerHTML = '';
    document.getElementById('crop-preview').innerHTML = '';
    return;
  }
  counter.textContent = `Image ${state.activeImage + 1} of ${state.rawUploads.length}`;
  document.getElementById('active-crop-preview').innerHTML = `<img src="${state.croppedUploads[state.activeImage] || state.rawUploads[state.activeImage]}" alt="active crop"/>`;
  document.getElementById('crop-preview').innerHTML = state.croppedUploads.map((src, idx) => `<img data-thumb-index="${idx}" class="${idx===state.activeImage?'active':''}" src="${src}" alt="thumb ${idx+1}"/>`).join('');
  document.querySelectorAll('[data-thumb-index]').forEach((img) => img.addEventListener('click', () => { state.activeImage = Number(img.dataset.thumbIndex); renderCropUI(); }));
  const st = state.cropStates[state.activeImage] || { zoom: 1, y: 50 };
  document.getElementById('crop-zoom').value = st.zoom;
  document.getElementById('crop-y').value = st.y;
}

document.getElementById('image-upload').addEventListener('change', (e) => {
  const files = [...e.target.files];
  Promise.all(files.map((f) => new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.readAsDataURL(f);
  }))).then((raw) => {
    state.rawUploads = raw;
    state.croppedUploads = [...raw];
    state.cropStates = raw.map(() => ({ zoom: 1, y: 50 }));
    state.activeImage = 0;
    drawCrop(0);
  });
});

document.getElementById('prev-image').addEventListener('click', () => {
  if (!state.rawUploads.length) return;
  state.activeImage = (state.activeImage - 1 + state.rawUploads.length) % state.rawUploads.length;
  renderCropUI();
});
document.getElementById('next-image').addEventListener('click', () => {
  if (!state.rawUploads.length) return;
  state.activeImage = (state.activeImage + 1) % state.rawUploads.length;
  renderCropUI();
});
document.getElementById('remove-image').addEventListener('click', () => {
  if (!state.rawUploads.length) return;
  state.rawUploads.splice(state.activeImage, 1);
  state.croppedUploads.splice(state.activeImage, 1);
  state.cropStates.splice(state.activeImage, 1);
  state.activeImage = Math.max(0, state.activeImage - 1);
  renderCropUI();
});

document.getElementById('crop-zoom').addEventListener('input', (e) => {
  if (!state.rawUploads.length) return;
  state.cropStates[state.activeImage].zoom = Number(e.target.value);
  drawCrop(state.activeImage);
});
document.getElementById('crop-y').addEventListener('input', (e) => {
  if (!state.rawUploads.length) return;
  state.cropStates[state.activeImage].y = Number(e.target.value);
  drawCrop(state.activeImage);
});

escortForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const prefRaces = escortForm.prefRaceAny.checked ? [] : [...escortForm.querySelectorAll('input[name="prefRaces"]:checked')].map((x) => x.value);
  const escort = {
    id: nextId('CMP', state.escorts),
    name: fd.get('name'),
    sex: fd.get('sex'),
    race: fd.get('race'),
    zip: fd.get('zip'),
    driveRadius: Number(fd.get('driveRadius')),
    heightInches: toInches(fd.get('heightFt'), fd.get('heightIn')),
    weightLbs: Number(fd.get('weightLbs')),
    bio: fd.get('bio'),
    photos: [...state.croppedUploads],
    preferences: { sexes: [...escortForm.prefSexes.selectedOptions].map((o) => o.value), races: prefRaces },
    availability: [...state.pendingAvailability],
    bookings: []
  };
  state.escorts.push(escort);
  state.pendingAvailability = [];
  state.rawUploads = [];
  state.croppedUploads = [];
  state.cropStates = [];
  state.activeImage = 0;
  e.target.reset();
  fillHeightSelects();
  renderAvailabilityPreview();
  renderCropUI();
  persist();
  renderAdminViews();
  if (!state.currentFilters) state.currentFilters = defaultFilters();
  updateFilterSummary(state.currentFilters);
  renderEscorts(state.currentFilters);
  renderStats();
});

document.getElementById('schedule-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const escort = state.escorts.find((x) => x.id === data.escortId);
  if (!escort) return;
  escort.bookings.push(data);
  escort.availability = escort.availability.filter((s) => !(s.date === data.date && s.start === data.startTime && s.end === data.endTime));
  persist();
  renderAdminViews();
  if (!state.currentFilters) state.currentFilters = defaultFilters();
  updateFilterSummary(state.currentFilters);
  renderEscorts(state.currentFilters);
  renderClientBookings();
});

document.getElementById('admin-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  state.admins.push({ id: nextId('ADM', state.admins), ...data, createdAt: new Date().toISOString() });
  e.target.reset();
  persist();
  renderStats();
});

function renderAdminViews() {
  document.getElementById('emails').innerHTML = state.companyEmails.map((x) => `<li>${x}</li>`).join('');
  document.getElementById('interested').innerHTML = state.interested.map((i) => `<li>${i.client} (${i.clientId}) requested ${i.escort} on ${i.date} ${i.time}</li>`).join('') || '<li>No active requests.</li>';
  document.getElementById('escort-select').innerHTML = state.escorts.map((e) => `<option value="${e.id}">${e.name} (${e.id})</option>`).join('');
  document.getElementById('schedule-list').innerHTML = state.escorts.flatMap((e) => e.bookings.map((b) => `<li>${b.date} ${b.startTime}-${b.endTime}: ${e.name} for ${b.client} (${b.clientId})</li>`)).join('') || '<li>No blocked slots.</li>';
}

function renderClientBookings() {
  const bookings = state.escorts.flatMap((e) => e.bookings.map((b) => ({ ...b, escort: e.name })));
  document.getElementById('client-bookings').innerHTML = bookings.map((b) => `<li>${b.date} ${b.startTime}-${b.endTime}: ${b.escort} reserved (${b.clientId})</li>`).join('') || '<li>No upcoming reservations.</li>';
}

function renderStats() {
  document.getElementById('stats').innerHTML = `
    <div><h3>${state.escorts.length}</h3><p>Companion Profiles</p></div>
    <div><h3>${state.interested.length}</h3><p>Quote Requests</p></div>
    <div><h3>${state.admins.length}</h3><p>Admin Accounts</p></div>
    <div><h3>${state.users.length}</h3><p>Client Accounts</p></div>`;
  const all = [...state.users, ...state.admins];
  document.getElementById('account-registry').innerHTML = all.map((a) => `<li>${a.id} • ${a.email || a.name}</li>`).join('') || '<li>No accounts yet.</li>';
}

fillHeightSelects();
state.currentFilters = state.currentFilters || defaultFilters();
renderAvailabilityPreview();
renderCropUI();
applyAuthState();

if (!state.session) {
  authOverlay.classList.remove('hidden');
  showAuthSection('auth-choice');
} else {
  authOverlay.classList.add('hidden');
}
