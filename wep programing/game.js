/* =========================================================
   ملعبي — Booking Pitch — App Logic
   ========================================================= */

(function () {
  "use strict";

  /* ============ 1) بيانات الملاعب ============ */
  const PITCHES = [
    {
      id: "p1",
      name: { ar: "ملعب النخبة", en: "Elite Arena" },
      type5: 7,
      loc: { ar: "حي الملقا، الرياض", en: "Al Malqa, Riyadh" },
      price: 180,
      rating: 4.9,
      tags: { ar: ["عشب صناعي", "إضاءة ليلية", "غرف تبديل"], en: ["Artificial turf", "Night lights", "Locker rooms"] },
      img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "p2",
      name: { ar: "ملعب الصقور", en: "Falcons Field" },
      type5: 5,
      loc: { ar: "حي الياسمين، الرياض", en: "Al Yasmin, Riyadh" },
      price: 120,
      rating: 4.7,
      tags: { ar: ["مسقوف", "تكييف", "مواقف"], en: ["Covered", "AC", "Parking"] },
      img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "p3",
      name: { ar: "استاد الوادي", en: "Al Wadi Stadium" },
      type5: 11,
      loc: { ar: "طريق الملك فهد، جدة", en: "King Fahd Rd, Jeddah" },
      price: 420,
      rating: 4.8,
      tags: { ar: ["عشب طبيعي", "مدرجات", "إضاءة احترافية"], en: ["Natural grass", "Stands", "Pro lighting"] },
      img: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "p4",
      name: { ar: "ملعب المرجان", en: "Marjan Court" },
      type5: 7,
      loc: { ar: "الكورنيش، الدمام", en: "Corniche, Dammam" },
      price: 200,
      rating: 4.6,
      tags: { ar: ["إطلالة بحرية", "عشب صناعي", "كافيه"], en: ["Sea view", "Artificial turf", "Cafe"] },
      img: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "p5",
      name: { ar: "ملعب البطولة", en: "Championship Pitch" },
      type5: 5,
      loc: { ar: "حي النرجس، الرياض", en: "Al Narjis, Riyadh" },
      price: 110,
      rating: 4.5,
      tags: { ar: ["إضاءة ليلية", "دخول سهل", "أسعار مناسبة"], en: ["Night lights", "Easy access", "Great price"] },
      img: "https://images.unsplash.com/photo-1760890518049-47b9822e1c89?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "p6",
      name: { ar: "أكاديمية الأبطال", en: "Champions Academy" },
      type5: 11,
      loc: { ar: "طريق الأمير سلطان، مكة", en: "Prince Sultan Rd, Makkah" },
      price: 380,
      rating: 4.9,
      tags: { ar: ["عشب هجين", "غرف VIP", "تصوير للمباراة"], en: ["Hybrid grass", "VIP rooms", "Match recording"] },
      img: "https://images.unsplash.com/photo-1760885985017-af7a49dcfb48?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const ALL_SLOTS = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

  /* deterministic "taken" slots per pitch, so it feels real but stays stable */
  function takenSlotsFor(pitchId) {
    const seed = pitchId.charCodeAt(1);
    return ALL_SLOTS.filter((_, i) => (i + seed) % 3 === 0);
  }

  /* ============ 2) قاموس الترجمة ============ */
  const I18N = {
    ar: {
      page_title: "ملعبي | احجز ملعبك في دقيقة",
      brand: "ملعبي",
      nav_pitches: "الملاعب", nav_how: "كيف يعمل", nav_booking: "الحجز", nav_contact: "تواصل معنا", nav_cta: "احجز الآن",
      hero_eyebrow: "أكثر من 40 ملعب متاح الآن",
      hero_title_1: "احجز ملعبك،", hero_title_2: "وادخل تحت الأنوار.",
      hero_desc: "اختر الملعب، الوقت، وادفع بثواني. تذكرتك جاهزة قبل ما توصل.",
      hero_cta_1: "تصفح الملاعب", hero_cta_2: "كيف يعمل الحجز",
      stat_1: "حجز هذا الشهر", stat_2: "تقييم اللاعبين", stat_3: "حجز فوري",
      scoreboard_next: "المباراة القادمة", scoreboard_field: "ملعب النخبة · 7 لاعبين",
      trust_title: "ملاعب معتمدة من أفضل الأكاديميات والمراكز الرياضية",
      pitches_eyebrow: "الملاعب المتاحة", pitches_title: "اختر أرضك",
      pitches_desc: "ملاعب عشب صناعي بمواصفات احترافية، إضاءة ليلية، وغرف تبديل ملابس.",
      filter_all: "الكل", filter_5: "خماسي", filter_7: "سباعي", filter_11: "كرة 11",
      card_book: "احجز الآن", per_hour: "/ ساعة",
      how_eyebrow: "ثلاث خطوات فقط", how_title: "من الاختيار إلى الملعب",
      how_1_title: "اختر ملعبك", how_1_desc: "تصفح الملاعب القريبة منك حسب الحجم والسعر والتقييم.",
      how_2_title: "اختر الوقت", how_2_desc: "شوف الأوقات المتاحة على شكل لوحة نتيجة وحدد وقتك المفضل.",
      how_3_title: "ادفع واستلم تذكرتك", how_3_desc: "أكمل الدفع الإلكتروني واستلم تذكرة الحجز فورًا برمز تأكيد.",
      booking_eyebrow: "أكمل حجزك", booking_title: "اختر الوقت وادفع",
      booking_desc: "اختر ملعبًا من الأعلى، أو ابدأ من هنا مباشرة.",
      label_pitch: "الملعب المختار", label_date: "التاريخ", label_time: "الوقت المتاح",
      slot_free: "متاح", slot_taken: "محجوز", slot_active: "اختيارك",
      label_name: "الاسم الكامل", ph_name: "مثال: عبدالله الحربي",
      label_phone: "رقم الجوال", ph_phone: "05xxxxxxxx",
      label_players: "عدد اللاعبين",
      label_payment: "طريقة الدفع", pay_card: "بطاقة بنكية", pay_apple: "Apple Pay", pay_stc: "STC Pay",
      ph_card: "رقم البطاقة", ph_expiry: "MM/YY", ph_cvv: "CVV",
      btn_confirm: "تأكيد الحجز والدفع",
      ticket_pending: "قيد الإعداد", ticket_confirmed: "تم التأكيد",
      ticket_date: "التاريخ", ticket_time: "الوقت", ticket_players: "اللاعبون", ticket_total: "الإجمالي",
      ticket_code: "رمز الحجز", sar: "ر.س",
      reviews_eyebrow: "آراء اللاعبين", reviews_title: "ثقة آلاف اللاعبين أسبوعيًا",
      review_1: "\u0022احجز من جوالي بثلاث دقائق، والملعب دايم جاهز بدون أي تأخير.\u0022", review_1_name: "— فهد. س",
      review_2: "\u0022لوحة الأوقات واضحة جدًا، أعرف الفاضي من المحجوز أول ما أفتح الصفحة.\u0022", review_2_name: "— سلطان. م",
      review_3: "\u0022التذكرة الإلكترونية شكلها احترافي وأرسلها للفريق على طول.\u0022", review_3_name: "— عبدالرحمن. ق",
      footer_desc: "منصتك لحجز الملاعب الرياضية بسهولة وسرعة، على مدار الساعة.",
      footer_links: "روابط", footer_contact: "تواصل", footer_rights: "© 2026 ملعبي. جميع الحقوق محفوظة.",
      modal_title: "تم تأكيد حجزك!", modal_desc: "أرسلنا تفاصيل الحجز، جهّز فريقك ونشوفك في الملعب.", modal_close: "تمام",
      err_pitch: "اختر ملعبًا أولاً", err_date: "اختر تاريخ الحجز",
      err_slot: "اختر وقتًا متاحًا", err_name: "اكتب اسمك الكامل",
      err_phone: "اكتب رقم جوال صحيح", err_card: "أكمل بيانات البطاقة",
      type5: "خماسي", type7: "سباعي", type11: "كرة 11"
    },
    en: {
      page_title: "Mala3bi | Book Your Pitch In Minutes",
      brand: "Mala3bi",
      nav_pitches: "Pitches", nav_how: "How it works", nav_booking: "Booking", nav_contact: "Contact", nav_cta: "Book now",
      hero_eyebrow: "40+ pitches available right now",
      hero_title_1: "Book your pitch,", hero_title_2: "step under the lights.",
      hero_desc: "Pick a pitch, pick a time, pay in seconds. Your ticket is ready before you arrive.",
      hero_cta_1: "Browse pitches", hero_cta_2: "How booking works",
      stat_1: "Bookings this month", stat_2: "Player rating", stat_3: "Instant booking",
      scoreboard_next: "Next match", scoreboard_field: "Elite Arena · 7-a-side",
      trust_title: "Trusted pitches from top academies and sports centers",
      pitches_eyebrow: "Available pitches", pitches_title: "Pick your ground",
      pitches_desc: "Pro-grade artificial turf, night floodlights, and locker rooms.",
      filter_all: "All", filter_5: "5-a-side", filter_7: "7-a-side", filter_11: "11-a-side",
      card_book: "Book now", per_hour: "/ hour",
      how_eyebrow: "Just three steps", how_title: "From pick to pitch",
      how_1_title: "Choose your pitch", how_1_desc: "Browse nearby pitches by size, price and rating.",
      how_2_title: "Pick a time", how_2_desc: "See open slots on a scoreboard-style grid and lock in your time.",
      how_3_title: "Pay & get your ticket", how_3_desc: "Complete secure payment and receive your booking ticket instantly.",
      booking_eyebrow: "Finish your booking", booking_title: "Pick a time and pay",
      booking_desc: "Choose a pitch above, or start right here.",
      label_pitch: "Selected pitch", label_date: "Date", label_time: "Available time",
      slot_free: "Free", slot_taken: "Taken", slot_active: "Selected",
      label_name: "Full name", ph_name: "e.g. Abdullah Alharbi",
      label_phone: "Phone number", ph_phone: "05xxxxxxxx",
      label_players: "Number of players",
      label_payment: "Payment method", pay_card: "Bank card", pay_apple: "Apple Pay", pay_stc: "STC Pay",
      ph_card: "Card number", ph_expiry: "MM/YY", ph_cvv: "CVV",
      btn_confirm: "Confirm & pay",
      ticket_pending: "Pending", ticket_confirmed: "Confirmed",
      ticket_date: "Date", ticket_time: "Time", ticket_players: "Players", ticket_total: "Total",
      ticket_code: "Booking code", sar: "SAR",
      reviews_eyebrow: "Player reviews", reviews_title: "Trusted by thousands of players weekly",
      review_1: "\u0022I booked from my phone in three minutes and the pitch is always ready.\u0022", review_1_name: "— Fahad S.",
      review_2: "\u0022The time grid is super clear, I know what's free the second I open the page.\u0022", review_2_name: "— Sultan M.",
      review_3: "\u0022The e-ticket looks professional and I just forward it to the team.\u0022", review_3_name: "— Abdulrahman Q.",
      footer_desc: "Your platform to book sports pitches quickly, around the clock.",
      footer_links: "Links", footer_contact: "Contact", footer_rights: "© 2026 Mala3bi. All rights reserved.",
      modal_title: "Booking confirmed!", modal_desc: "We sent your booking details — round up the team, see you on the pitch.", modal_close: "Got it",
      err_pitch: "Choose a pitch first", err_date: "Pick a booking date",
      err_slot: "Select an available time", err_name: "Enter your full name",
      err_phone: "Enter a valid phone number", err_card: "Complete the card details",
      type5: "5-a-side", type7: "7-a-side", type11: "11-a-side"
    }
  };

  /* ============ 3) الحالة العامة ============ */
  const state = {
    lang: localStorage.getItem("mala3bi_lang") || "ar",
    theme: localStorage.getItem("mala3bi_theme") || "dark",
    filter: "all",
    selectedPitchId: PITCHES[0].id,
    selectedDate: "",
    selectedSlot: null,
    payMethod: "card"
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const t = (key) => I18N[state.lang][key] || key;

  /* ============ 4) تطبيق اللغة والاتجاه ============ */
  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    $("#langLabel").textContent = state.lang === "ar" ? "EN" : "AR";

    $$("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });

    renderPitches();
    renderPitchSelect();
    renderSlots();
    updateTicket();
  }

  /* ============ 5) تطبيق الثيم ============ */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    $("#iconMoon").style.display = state.theme === "dark" ? "none" : "block";
    $("#iconSun").style.display = state.theme === "dark" ? "block" : "none";
  }

  /* ============ 6) عرض بطاقات الملاعب ============ */
  function typeLabel(type5) {
    if (type5 === 5) return t("type5");
    if (type5 === 7) return t("type7");
    return t("type11");
  }

  function renderPitches() {
    const grid = $("#pitchesGrid");
    const list = PITCHES.filter((p) => state.filter === "all" || String(p.type5) === state.filter);
    grid.innerHTML = list.map((p) => `
      <article class="pitch-card">
        <div class="pitch-card__media">
          <img src="${p.img}" alt="${p.name[state.lang]}" loading="lazy">
          <span class="pitch-card__badge">${typeLabel(p.type5)}</span>
          <span class="pitch-card__rating">★ ${p.rating}</span>
        </div>
        <div class="pitch-card__body">
          <h3 class="pitch-card__name">${p.name[state.lang]}</h3>
          <p class="pitch-card__loc">📍 ${p.loc[state.lang]}</p>
          <div class="pitch-card__tags">
            ${p.tags[state.lang].map((tag) => `<span class="pitch-card__tag">${tag}</span>`).join("")}
          </div>
          <div class="pitch-card__foot">
            <div class="pitch-card__price">
              <strong>${p.price}</strong> <span>${t("sar")} ${t("per_hour")}</span>
            </div>
            <button class="btn btn--primary" data-book="${p.id}" type="button">${t("card_book")}</button>
          </div>
        </div>
      </article>
    `).join("");

    $$("[data-book]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedPitchId = btn.getAttribute("data-book");
        $("#selectPitch").value = state.selectedPitchId;
        renderSlots();
        updateTicket();
        $("#booking").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  /* ============ 7) قائمة اختيار الملعب ============ */
  function renderPitchSelect() {
    const sel = $("#selectPitch");
    sel.innerHTML = PITCHES.map((p) =>
      `<option value="${p.id}">${p.name[state.lang]} — ${typeLabel(p.type5)}</option>`
    ).join("");
    sel.value = state.selectedPitchId;
  }

  /* ============ 8) شبكة الأوقات ============ */
  function renderSlots() {
    const grid = $("#slotsGrid");
    const taken = takenSlotsFor(state.selectedPitchId);
    grid.innerHTML = ALL_SLOTS.map((slot) => {
      const isTaken = taken.includes(slot);
      const isActive = state.selectedSlot === slot;
      return `<button type="button" class="slot ${isTaken ? "is-taken" : ""} ${isActive ? "is-active" : ""}"
                ${isTaken ? "disabled" : ""} data-slot="${slot}">${slot}</button>`;
    }).join("");

    $$("[data-slot]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedSlot = btn.getAttribute("data-slot");
        renderSlots();
        updateTicket();
      });
    });
  }

  /* ============ 9) تحديث بطاقة التذكرة الحية ============ */
  function updateTicket() {
    const pitch = PITCHES.find((p) => p.id === state.selectedPitchId) || PITCHES[0];
    $("#ticketImg").src = pitch.img;
    $("#ticketImg").alt = pitch.name[state.lang];
    $("#ticketPitchName").textContent = pitch.name[state.lang];
    $("#ticketPitchType").textContent = `${typeLabel(pitch.type5)} · ${pitch.loc[state.lang]}`;
    $("#ticketDate").textContent = state.selectedDate || "—";
    $("#ticketTime").textContent = state.selectedSlot || "—";
    const players = $("#players").value || "10";
    $("#ticketPlayers").textContent = players;
    $("#ticketTotal").innerHTML = `${pitch.price} <span>${t("sar")}</span>`;
  }

  /* ============ 10) توليد رمز حجز ============ */
  function generateCode() {
    return Array.from({ length: 4 }, () => Math.floor(1000 + Math.random() * 9000)).join(" ");
  }

  /* ============ 11) التحقق والتأكيد ============ */
  function validateAndConfirm() {
    const errEl = $("#formError");
    errEl.textContent = "";

    if (!state.selectedPitchId) { errEl.textContent = t("err_pitch"); return; }
    if (!state.selectedDate) { errEl.textContent = t("err_date"); return; }
    if (!state.selectedSlot) { errEl.textContent = t("err_slot"); return; }

    const name = $("#fullName").value.trim();
    if (name.length < 3) { errEl.textContent = t("err_name"); return; }

    const phone = $("#phone").value.trim();
    if (!/^0\d{9}$/.test(phone) && !/^\+?\d{8,13}$/.test(phone)) { errEl.textContent = t("err_phone"); return; }

    if (state.payMethod === "card") {
      const num = $("#cardNumber").value.replace(/\s/g, "");
      const exp = $("#cardExpiry").value.trim();
      const cvv = $("#cardCVV").value.trim();
      if (num.length < 12 || exp.length < 4 || cvv.length < 3) { errEl.textContent = t("err_card"); return; }
    }

    $("#ticketStatus").textContent = t("ticket_confirmed");
    $("#ticketStatus").classList.add("is-confirmed");
    $("#ticketCode").textContent = generateCode();

    $("#successModal").classList.add("is-open");
  }

  /* ============ 12) ربط الأحداث ============ */
  function bindEvents() {
    // burger menu
    const burger = $("#burgerBtn");
    const panel = $("#mobilePanel");
    const overlay = $("#overlay");
    function closeMenu() {
      burger.classList.remove("is-open");
      panel.classList.remove("is-open");
      overlay.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
    burger.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("is-open");
      burger.classList.toggle("is-open", isOpen);
      overlay.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
    });
    overlay.addEventListener("click", closeMenu);
    $$(".mobile-panel__link, .mobile-panel__cta").forEach((el) => el.addEventListener("click", closeMenu));

    // theme toggle
    $("#themeToggle").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("mala3bi_theme", state.theme);
      applyTheme();
    });

    // language toggle
    $("#langToggle").addEventListener("click", () => {
      state.lang = state.lang === "ar" ? "en" : "ar";
      localStorage.setItem("mala3bi_lang", state.lang);
      applyLanguage();
    });

    // filters
    $("#filters").addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;
      $$(".filter-chip").forEach((c) => c.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.filter = btn.getAttribute("data-filter");
      renderPitches();
    });

    // pitch select
    $("#selectPitch").addEventListener("change", (e) => {
      state.selectedPitchId = e.target.value;
      state.selectedSlot = null;
      renderSlots();
      updateTicket();
    });

    // date
    const dateInput = $("#selectDate");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;
    state.selectedDate = today;
    dateInput.addEventListener("change", (e) => {
      state.selectedDate = e.target.value;
      updateTicket();
    });

    // players count live update
    $("#players").addEventListener("input", updateTicket);

    // payment method
    $("#payMethods").addEventListener("click", (e) => {
      const chip = e.target.closest(".pay-chip");
      if (!chip) return;
      $$(".pay-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      state.payMethod = chip.getAttribute("data-pay");
      $("#cardFields").style.display = state.payMethod === "card" ? "flex" : "none";
    });

    // card number formatting
    $("#cardNumber").addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 16);
      e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
    });
    $("#cardExpiry").addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
      e.target.value = v;
    });
    $("#cardCVV").addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
    });

    // confirm booking
    $("#confirmBtn").addEventListener("click", validateAndConfirm);

    // modal close
    $("#closeModal").addEventListener("click", () => {
      $("#successModal").classList.remove("is-open");
    });
    $("#successModal").addEventListener("click", (e) => {
      if (e.target.id === "successModal") $("#successModal").classList.remove("is-open");
    });

    // navbar shadow on scroll (subtle)
    window.addEventListener("scroll", () => {
      $("#navbar").style.boxShadow = window.scrollY > 10 ? "0 8px 24px -18px rgba(0,0,0,.4)" : "none";
    });
  }

  /* ============ 13) تشغيل التطبيق ============ */
  function init() {
    applyTheme();
    bindEvents();
    applyLanguage();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
