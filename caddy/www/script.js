/* ================================================================
   MARQUEE — application script (ภาษาไทย)
   ส่วนประกอบ: DATA -> HELPERS -> RENDERERS -> FILTER LOGIC -> MODAL -> INIT
   ================================================================ */

/* ---------------------------------------------------------------
   1. DATA
   ภาพยนตร์ทั้งหมดด้านล่างเป็นเรื่องสมมติที่สร้างขึ้นสำหรับเดโม/ต้นแบบนี้
   ภาพโปสเตอร์แสดงด้วยการไล่สี CSS + ไอคอน SVG แทนภาพจริง
   เพื่อให้ต้นแบบนี้ใช้งานได้ในตัวเองโดยไม่ต้องพึ่งไฟล์ภาพภายนอก
------------------------------------------------------------------ */
const MOVIES = [
  {
    id: 1,
    title: "Salt & Static",
    genre: "ไซไฟ",
    rating: 9.2,
    runtime: "128 นาที",
    year: 2026,
    director: "อิมารา วอสส์",
    cast: ["เดลฟีน อัคเทอร์เบิร์ก", "โคโจ เมนซาห์", "เอลิน รัสค์"],
    gradient: "linear-gradient(155deg,#233a5c,#0f1b2e 55%,#0a0f18)",
    glyph: "radio",
    featured: true,
    synopsis: "นักดาราศาสตร์วิทยุจับสัญญาณประหลาดที่ไม่ควรมีอยู่จริง — สัญญาณที่ดูเหมือนกำลังตอบกลับข้อความที่มนุษยชาติยังไม่เคยส่งออกไป เมื่อเธอไล่ตามแหล่งที่มาของมันไปตามชายฝั่งที่แห้งแล้ง เธอต้องตัดสินใจว่าจะเตือนโลก หรือปกป้องการค้นพบเพียงหนึ่งเดียวที่ทำให้ชีวิตทั้งชีวิตของเธอมีความหมาย",
    reviews: [
      { quote: "หนังไซไฟที่หาได้ยากซึ่งเชื่อมั่นในความเงียบพอๆ กับฉากตระการตา", source: "Frame & Focus" },
      { quote: "วอสส์กำกับด้วยความอดทนของคนที่รู้ว่าตอนจบคุ้มค่ากับการรอคอย", source: "The Reel Review" }
    ]
  },
  {
    id: 2,
    title: "The Long Weather",
    genre: "ดราม่า",
    rating: 8.6,
    runtime: "141 นาที",
    year: 2026,
    director: "โอเวน กัสเตยาโนส",
    cast: ["ปรียา นันทกุมาร", "มาร์คัส โลเวอ"],
    gradient: "linear-gradient(155deg,#4a3b2c,#231b14 55%,#120e0a)",
    glyph: "leaf",
    synopsis: "พี่น้องสามคนกลับมายังสวนผลไม้ของครอบครัวที่กำลังจะล้มเหลว เพื่อเก็บเกี่ยวครั้งสุดท้ายก่อนที่ที่ดินจะถูกขาย ตลอดหนึ่งฤดูกาล หนี้เก่า ทั้งทางการเงินและทางใจ ก็ถึงเวลาต้องชำระ และสวนผลไม้แห่งนี้กลายเป็นภาษาเดียวที่พวกเขายังพูดร่วมกันได้",
    reviews: [
      { quote: "เศร้าอย่างเงียบๆ แบบที่ค้างอยู่ในใจไปอีกหลายวัน", source: "Aperture Weekly" },
      { quote: "นันทกุมารแสดงได้ดีที่สุดในอาชีพของเธอ", source: "Frame & Focus" }
    ]
  },
  {
    id: 3,
    title: "Nocturne for Two",
    genre: "โรแมนติก",
    rating: 7.8,
    runtime: "104 นาที",
    year: 2026,
    director: "โซเฟีย เบร็กมัน",
    cast: ["เตโอ มาร์เก็ตติ", "ยูกิ โอเซอิ"],
    gradient: "linear-gradient(155deg,#5c2c46,#2c1424 55%,#150a12)",
    glyph: "heart",
    synopsis: "นักเปียโนแจ๊สกับล่ามกะดึกพลาดกันไปมาแค่ไม่กี่นาทีในเมืองเดียวกันมานานนับสิบปี จนกระทั่งไฟดับทั่วเมืองทำให้พวกเขาได้อยู่ในห้องเดียวกันในที่สุด เรื่องราวความรักที่เล่าทั้งหมดในยามค่ำคืน",
    reviews: [
      { quote: "หวานจนใจฟูโดยไม่เลี่ยนเกินไป", source: "The Reel Review" },
      { quote: "ใช้โครงเรื่องคืนเดียวได้อย่างยอดเยี่ยมจริงๆ", source: "Aperture Weekly" }
    ]
  },
  {
    id: 4,
    title: "Hollow Choir",
    genre: "สยองขวัญ",
    rating: 7.4,
    runtime: "97 นาที",
    year: 2026,
    director: "เปตรา ลินด์ควิสต์",
    cast: ["อีฟา เบรนแนน", "ซามูเอล โอคาฟอร์"],
    gradient: "linear-gradient(155deg,#1e2e28,#0c1512 55%,#070a09)",
    glyph: "mask",
    synopsis: "ผู้ควบคุมวงประสานเสียงรับงานที่โรงเรียนประจำห่างไกลซึ่งมีธรรมเนียมที่เธอไม่เข้าใจ ทุกปีเสียงของนักเรียนคนหนึ่งจะหายไปเฉยๆ เธอมีเวลาสามสัปดาห์ที่จะหาคำตอบก่อนการแสดงครั้งต่อไป",
    reviews: [
      { quote: "สร้างความหวาดหวั่นด้วยฝีมือจริง ไม่ใช่แค่ฉากสะดุ้ง", source: "Frame & Focus" },
      { quote: "การออกแบบเสียงเพียงอย่างเดียวก็คุ้มค่าตั๋วแล้ว", source: "The Reel Review" }
    ]
  },
  {
    id: 5,
    title: "Paper Tigers",
    genre: "คอมเมดี้",
    rating: 7.1,
    runtime: "99 นาที",
    year: 2026,
    director: "ดีเอโก เฟร์เรย์รา",
    cast: ["นาเดีย วอสส์", "เบน อัคเทอร์เบิร์ก", "โรซา ลินด์เกรน"],
    gradient: "linear-gradient(155deg,#5c4a1e,#2c220c 55%,#141006)",
    glyph: "mask-happy",
    synopsis: "บรรณาธิการหนังสือพิมพ์ท้องถิ่นคู่แข่งสองคนถูกบังคับให้รวมสำนักพิมพ์ที่กำลังจะล้มเหลวของตนเข้าด้วยกัน พร้อมกับการทะเลาะกันที่ยืดเยื้อมาหลายสิบปี เพื่อทำหน้าหนึ่งฉบับสุดท้ายก่อนที่แท่นพิมพ์จะปิดตัวลงตลอดกาล",
    reviews: [
      { quote: "คมคาย อบอุ่น และตลกจริงเกี่ยวกับอุตสาหกรรมที่กำลังตาย", source: "Aperture Weekly" },
      { quote: "หนังคอมเมดี้คู่ที่ดีที่สุดในรอบหลายปี", source: "Frame & Focus" }
    ]
  },
  {
    id: 6,
    title: "Vantablack",
    genre: "ระทึกขวัญ",
    rating: 8.3,
    runtime: "116 นาที",
    year: 2026,
    director: "เรนาตา โควัช",
    cast: ["อิดริส วานทงเกอเรน", "ลูเซีย เฟร์ราโร"],
    gradient: "linear-gradient(155deg,#241f2e,#100d16 55%,#07060a)",
    glyph: "eye",
    synopsis: "ผู้ตรวจสอบบัญชีองค์กรพบลายเซ็นของตัวเองในสัญญาที่เธอไม่เคยเซ็น และยิ่งขุดลึกเท่าไร บริษัทก็ยิ่งยืนยันว่าเธอต่างหากที่สับสน หนังระทึกขวัญหวาดระแวงว่าด้วยความน่ากลัวของการถูกลบตัวตนออกจากชีวิตตัวเองไปทีละน้อย",
    reviews: [
      { quote: "ตึงเครียดในแบบที่ค้างอยู่ในใจนานหลังจากเครดิตขึ้น", source: "The Reel Review" },
      { quote: "โควัชทำให้สเปรดชีตกลายเป็นความระทึกใจได้จริง ไม่ใช่เรื่องเล็กเลย", source: "Frame & Focus" }
    ]
  },
  {
    id: 7,
    title: "Marigold County",
    genre: "แอนิเมชัน",
    rating: 8.9,
    runtime: "92 นาที",
    year: 2026,
    director: "ฮารูกิ โอนิชิ",
    cast: ["พากย์เสียง: กามีย์ ดูวาล", "พากย์เสียง: เฟมี อาเดเยมี"],
    gradient: "linear-gradient(155deg,#8a5a1e,#472c0c 55%,#211405)",
    glyph: "flower",
    synopsis: "เรื่องราววาดมือของสุนัขจิ้งจอกบุรุษไปรษณีย์ที่ส่งจดหมายระหว่างสองหุบเขาที่บาดหมางกัน และค่อยๆ ตระหนักว่าเธอเป็นสิ่งมีชีวิตเพียงหนึ่งเดียวที่ยังข้ามพรมแดนระหว่างทั้งสองอยู่ หนังที่งดงามและอ่อนโยนเกี่ยวกับการกระทำเล็กๆ ที่ยึดโยงชุมชนไว้ด้วยกัน",
    reviews: [
      { quote: "แอนิเมชันวาดมือที่ประณีตขนาดนี้คือเหตุการณ์สำคัญอย่างแท้จริง", source: "Aperture Weekly" },
      { quote: "สะเทือนใจไม่แพ้หนังคนแสดงเรื่องใดในปีนี้", source: "The Reel Review" }
    ]
  },
  {
    id: 8,
    title: "The Quiet Insurgency",
    genre: "สารคดี",
    rating: 8.1,
    runtime: "109 นาที",
    year: 2026,
    director: "ฟาติมา อัล-ราชิด",
    cast: ["นำแสดงโดย: คนงานท่าเรือแห่งท่าเรือเอลารา"],
    gradient: "linear-gradient(155deg,#2c3a3c,#131b1c 55%,#080c0d)",
    glyph: "anchor",
    synopsis: "ตลอดสามปี สหกรณ์คนงานท่าเรือกลุ่มหนึ่งฟื้นฟูเมืองท่าที่กำลังล้มเหลวขึ้นมาใหม่จากศูนย์ โดยไม่มีการนัดหยุดงานครั้งใดขึ้นหน้าข่าวระดับประเทศเลย ภาพเล่าเรื่องอันใกล้ชิดของการรวมกลุ่มในฐานะการกระทำแห่งความอดทน",
    reviews: [
      { quote: "ควรค่าแก่การชม และไม่รู้สึกเหมือนการบ้านเลยสักนิด", source: "Frame & Focus" },
      { quote: "อัล-ราชิดมีสายตาที่ยอดเยี่ยมในการจับรายละเอียดสำคัญ", source: "Aperture Weekly" }
    ]
  },
  {
    id: 9,
    title: "Ricochet City",
    genre: "แอ็กชัน",
    rating: 7.6,
    runtime: "119 นาที",
    year: 2026,
    director: "มาร์คัส โลเวอ",
    cast: ["โคโจ เมนซาห์", "เอลิน รัสค์", "อิดริส วานทงเกอเรน"],
    gradient: "linear-gradient(155deg,#3c1e22,#1c0d0f 55%,#0a0506)",
    glyph: "bolt",
    synopsis: "ผู้ประสานงานสตันท์ที่เสื่อมเสียชื่อเสียงมีเวลาหนึ่งคืนเพื่อพิสูจน์ความบริสุทธิ์ของตัวเอง และหลักฐานเพียงอย่างเดียวกระจัดกระจายอยู่ทั่วฉากไล่ล่าบนหลังคาที่อันตรายที่สุดของเมืองในรอบสิบปี แอ็กชันจริงจัง เร้าใจ และไม่ขอโทษที่เป็นสไตล์คลาสสิก",
    reviews: [
      { quote: "หนังแอ็กชันแท้ๆ ที่ดีที่สุดของปีนี้ ไม่ต้องสงสัยเลย", source: "The Reel Review" },
      { quote: "ดัง กระฉับกระเฉง และมีเหตุผลอย่างน่าประหลาดใจ", source: "Frame & Focus" }
    ]
  },
  {
    id: 10,
    title: "Low Orbit",
    genre: "ไซไฟ",
    rating: 6.9,
    runtime: "122 นาที",
    year: 2026,
    director: "โซเฟีย เบร็กมัน",
    cast: ["เตโอ มาร์เก็ตติ", "ปรียา นันทกุมาร"],
    gradient: "linear-gradient(155deg,#1e2c4a,#0c1122 55%,#05070f)",
    glyph: "orbit",
    synopsis: "ช่างเทคนิคสามคนสุดท้ายบนสถานีอวกาศที่ถูกปลดระวางตระหนักว่ายานที่จะพากลับบ้านไม่มาแล้ว และก็จะไม่มีใครมารับใครอีกเลยตลอดกาล เรื่องราวเอาชีวิตรอดจังหวะช้าเกี่ยวกับสิ่งที่ผู้คนติดค้างกันเมื่อระบบต่างๆ หยุดทำงาน",
    reviews: [
      { quote: "ขนาดเล็กแต่ความรู้สึกยิ่งใหญ่", source: "Aperture Weekly" },
      { quote: "ไม่ค่อยสม่ำเสมอนัก แต่องก์สุดท้ายทำได้ดีจริงๆ", source: "The Reel Review" }
    ]
  },
  {
    id: 11,
    title: "Sundown Motel",
    genre: "ระทึกขวัญ",
    rating: 7.9,
    runtime: "101 นาที",
    year: 2026,
    director: "เรนาตา โควัช",
    cast: ["ลูเซีย เฟร์ราโร", "ซามูเอล โอคาฟอร์"],
    gradient: "linear-gradient(155deg,#3c2c1e,#1c130c 55%,#0a0705)",
    glyph: "key",
    synopsis: "พนักงานตรวจบัญชีกะดึกของโมเทลริมทางหลวงเริ่มพบธนบัตรใบเดิมยี่สิบดอลลาร์ในลิ้นชักเก็บเงินทุกครั้ง ไม่ว่าเธอจะใช้มันไปกี่ครั้งก็ตาม ปริศนาแสงนีออนที่มั่นใจในจังหวะเกี่ยวกับหนี้ที่ปฏิเสธจะถูกชำระ",
    reviews: [
      { quote: "แปลกประหลาดอย่างน่าหลงใหลและควบคุมจังหวะได้มั่นใจ", source: "Frame & Focus" },
      { quote: "หนึ่งในตอนจบหักมุมที่ดีที่สุดในความทรงจำเมื่อไม่นานนี้", source: "Aperture Weekly" }
    ]
  },
  {
    id: 12,
    title: "Everything, Slowly",
    genre: "ดราม่า",
    rating: 8.4,
    runtime: "133 นาที",
    year: 2026,
    director: "โอเวน กัสเตยาโนส",
    cast: ["อีฟา เบรนแนน", "เบน อัคเทอร์เบิร์ก", "นาเดีย วอสส์"],
    gradient: "linear-gradient(155deg,#2c2c3c,#12121c 55%,#07070c)",
    glyph: "hourglass",
    synopsis: "เล่าย้อนกลับทั้งเรื่อง ปีแห่งความแตกสลายอันเงียบงันของครอบครัวหนึ่งถูกตามรอยย้อนไปจนถึงวันอังคารธรรมดาวันหนึ่งที่ทุกอย่างเริ่มต้น ด้วยการทะเลาะกันเล็กๆ ที่ไม่มีใครคิดจะจดจำไว้จนกระทั่งสายเกินไป",
    reviews: [
      { quote: "การพนันเชิงโครงสร้างที่ประสบความสำเร็จอย่างเต็มที่", source: "The Reel Review" },
      { quote: "หนังที่แม่นยำทางอารมณ์ที่สุดของกัสเตยาโนสจนถึงตอนนี้", source: "Frame & Focus" }
    ]
  }
];

const GENRES = ["ทั้งหมด", ...Array.from(new Set(MOVIES.map(m => m.genre))).sort()];

/* current filter state, kept in one place for clarity */
const state = {
  search: "",
  genre: "ทั้งหมด",
  minRating: 0
};

/* ---------------------------------------------------------------
   2. HELPERS
------------------------------------------------------------------ */

// คลังไอคอน SVG ขนาดเล็กใช้แทนภาพโปสเตอร์จริง
// แต่ละไอคอนวาดด้วยโทนสีครีม/ทองให้เข้ากับพื้นหลังไล่สีทุกแบบด้านบน
function glyphSVG(name, size = 64){
  const stroke = "rgba(242,238,230,0.9)";
  const common = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"`;
  const paths = {
    radio: `<circle cx="12" cy="14" r="5"/><path d="M12 9V3M8 3l4 4 4-4"/>`,
    leaf: `<path d="M5 20c8 0 13-5 13-13-8 0-13 5-13 13Z"/><path d="M5 20c2-6 5-9 9-11"/>`,
    heart: `<path d="M12 20s-7-4.4-9.5-8.9C.6 7.9 2.7 4.5 6.2 4.2c2-.2 3.6.9 4.8 2.6 1.2-1.7 2.8-2.8 4.8-2.6 3.5.3 5.6 3.7 3.7 6.9C19 15.6 12 20 12 20Z"/>`,
    mask: `<path d="M4 5h16v9a8 8 0 0 1-16 0V5Z"/><path d="M8 12h.01M16 12h.01M9 16c1 1 5 1 6 0"/>`,
    "mask-happy": `<circle cx="12" cy="12" r="9"/><path d="M8 10h.01M16 10h.01M8 14c1.5 2 6.5 2 8 0"/>`,
    eye: `<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
    flower: `<circle cx="12" cy="12" r="2.6"/><path d="M12 2c1.8 2 1.8 5.4 0 7-1.8-1.6-1.8-5 0-7Zm0 13c1.8 2 1.8 5.4 0 7-1.8-1.6-1.8-5 0-7ZM2 12c2-1.8 5.4-1.8 7 0-1.6 1.8-5 1.8-7 0Zm13 0c2-1.8 5.4-1.8 7 0-1.6 1.8-5 1.8-7 0Z"/>`,
    anchor: `<circle cx="12" cy="5" r="2"/><path d="M12 7v14M5 13a7 7 0 0 0 14 0M5 13H2m20 0h-3"/>`,
    bolt: `<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>`,
    orbit: `<circle cx="12" cy="12" r="2.4"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(30 12 12)"/>`,
    key: `<circle cx="8" cy="8" r="4"/><path d="m11 11 9 9m-5-5 2-2m-6 2 2-2"/>`,
    hourglass: `<path d="M6 3h12M6 21h12M6 3c0 6 12 6 12 12-0-6-12-6-12 12M18 3c0 6-12 6-12 12 0-6 12-6 12 12"/>`
  };
  return `<svg ${common} aria-hidden="true">${paths[name] || paths.radio}</svg>`;
}

// แต่ละเรื่องได้ภาพถ่ายที่คงที่ (ไม่เปลี่ยนทุกครั้งที่โหลดหน้า) โดยอิงจาก id
// ภาพเหล่านี้เป็นภาพถ่ายทั่วไปที่ใช้แทนโปสเตอร์จริง (ไม่มีโปสเตอร์จริงสำหรับหนังสมมติเหล่านี้)
function posterPhotoURL(m, w, h){
  return `https://picsum.photos/seed/marquee-${m.id}/${w}/${h}`;
}

function truncate(text, n){
  return text.length > n ? text.slice(0, n - 1).trimEnd() + "…" : text;
}

function escapeHTML(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------------------------------------------------------
   3. RENDERERS
------------------------------------------------------------------ */

function renderHero(){
  const m = MOVIES.find(x => x.featured);
  const heroText = document.getElementById("heroText");
  const heroPoster = document.getElementById("heroPoster");

  heroText.innerHTML = `
    <p class="hero-eyebrow">สิงหาคม 2026 &middot; คัดสรรโดยทีมงาน</p>
    <h1 class="hero-title">หนังเด่นประจำเดือน: <span class="accent">${escapeHTML(m.title)}</span></h1>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 18px;">
      <span class="rating-badge">★ ${m.rating.toFixed(1)}</span>
      <span class="meta-chip">${escapeHTML(m.genre)}</span>
      <span class="meta-chip">${escapeHTML(m.runtime)}</span>
      <span class="meta-chip">${m.year}</span>
    </div>
    <p class="hero-sub">${escapeHTML(m.synopsis)}</p>
    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:26px;">
      <button class="btn btn-gold" data-open-modal="${m.id}">
        ▶ ดูตัวอย่างหนัง
      </button>
      <button class="btn btn-ghost" data-open-modal="${m.id}">ดูรายละเอียดทั้งหมด</button>
    </div>
  `;

  heroPoster.innerHTML = `
    <div class="poster" style="max-width:340px;margin-inline:auto;">
      <img class="poster-img" src="${posterPhotoURL(m, 500, 750)}" alt="" loading="lazy" />
      <div class="poster-tint" style="background:${m.gradient};"></div>
      <div class="glyph-badge">${glyphSVG(m.glyph, 20)}</div>
      <span class="frame-label">${escapeHTML(m.title)}</span>
    </div>
  `;
}

function renderGenreChips(){
  const wrap = document.getElementById("genreChips");
  wrap.innerHTML = GENRES.map(g => `
    <button class="chip" data-genre="${escapeHTML(g)}" aria-pressed="${g === state.genre}">${escapeHTML(g)}</button>
  `).join("");
}

function movieCardHTML(m){
  return `
    <article class="card" tabindex="0" role="button" aria-label="ดูรายละเอียดของ ${escapeHTML(m.title)}" data-open-modal="${m.id}">
      <div class="card-poster">
        <img class="poster-img" src="${posterPhotoURL(m, 480, 720)}" alt="" loading="lazy" />
        <div class="poster-tint" style="background:${m.gradient};"></div>
        <div class="card-rating-float">★ ${m.rating.toFixed(1)}</div>
        <div class="card-glyph-badge">${glyphSVG(m.glyph, 16)}</div>
      </div>
      <div class="tear"></div>
      <div class="card-body">
        <p class="card-genre">${escapeHTML(m.genre)} &middot; ${escapeHTML(m.runtime)}</p>
        <h3 class="card-title">${escapeHTML(m.title)}</h3>
        <p class="card-synopsis">${escapeHTML(truncate(m.synopsis, 110))}</p>
        <div class="card-footer">
          <span class="card-link">รายละเอียด
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
      </div>
    </article>
  `;
}

function getFilteredMovies(){
  const q = state.search.trim().toLowerCase();
  return MOVIES.filter(m => {
    const matchesSearch = !q || m.title.toLowerCase().includes(q);
    const matchesGenre = state.genre === "ทั้งหมด" || m.genre === state.genre;
    const matchesRating = m.rating >= state.minRating;
    return matchesSearch && matchesGenre && matchesRating;
  });
}

function renderGrid(){
  const grid = document.getElementById("movieGrid");
  const emptyState = document.getElementById("emptyState");
  const resultCount = document.getElementById("resultCount");

  const filtered = getFilteredMovies();

  resultCount.textContent = `${filtered.length} จาก ${MOVIES.length} เรื่อง`;

  if (filtered.length === 0){
    grid.innerHTML = "";
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  grid.innerHTML = filtered.map(movieCardHTML).join("");
}

/* ---------------------------------------------------------------
   4. FILTER LOGIC (search / genre chips / rating select)
------------------------------------------------------------------ */

function debounce(fn, delay){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function initFilters(){
  renderGenreChips();

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", debounce((e) => {
    state.search = e.target.value;
    renderGrid();
  }, 180));

  document.getElementById("genreChips").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-genre]");
    if (!btn) return;
    state.genre = btn.dataset.genre;
    document.querySelectorAll("#genreChips .chip").forEach(c => c.setAttribute("aria-pressed", c === btn));
    renderGrid();
  });

  document.getElementById("ratingSelect").addEventListener("change", (e) => {
    state.minRating = parseFloat(e.target.value);
    renderGrid();
  });

  document.getElementById("clearFiltersBtn").addEventListener("click", () => {
    state.search = ""; state.genre = "ทั้งหมด"; state.minRating = 0;
    searchInput.value = "";
    document.getElementById("ratingSelect").value = "0";
    document.querySelectorAll("#genreChips .chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.genre === "ทั้งหมด"));
    renderGrid();
  });
}

/* ---------------------------------------------------------------
   5. MODAL (detail view: trailer mock, synopsis, cast, reviews)
------------------------------------------------------------------ */

let lastFocusedEl = null;

function openModal(movieId){
  const m = MOVIES.find(x => x.id === Number(movieId));
  if (!m) return;

  lastFocusedEl = document.activeElement;

  document.getElementById("modalTrailer").style.background = "none";
  document.getElementById("modalTrailer").innerHTML = `
    <img src="${posterPhotoURL(m, 900, 506)}" alt="" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;" />
    <div style="position:absolute;inset:0;z-index:1;mix-blend-mode:color;opacity:0.65;background:${m.gradient};"></div>
    <div class="play-btn" role="button" aria-label="เล่นตัวอย่างหนัง (จำลอง — ไม่มีวิดีโอแนบในเดโมนี้)" tabindex="0" style="z-index:2;">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5v14l11-7L8 5Z" fill="#f2eee6"/></svg>
    </div>
  `;

  document.getElementById("modalBody").innerHTML = `
    <p class="section-eyebrow" style="margin-bottom:6px;">${escapeHTML(m.genre)} &middot; ${m.year} &middot; ${escapeHTML(m.runtime)}</p>
    <h2 id="modalTitle" class="font-display" style="font-size:2rem;margin:0 0 12px;">${escapeHTML(m.title)}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
      <span class="rating-badge">★ ${m.rating.toFixed(1)} / 10</span>
      <span class="meta-chip">กำกับโดย ${escapeHTML(m.director)}</span>
    </div>

    <p style="color:var(--cream);line-height:1.85;font-size:0.98rem;margin-bottom:22px;">${escapeHTML(m.synopsis)}</p>

    <p style="font-size:0.8rem;font-weight:700;color:var(--muted-dim);margin-bottom:8px;">นักแสดง</p>
    <p style="color:var(--muted);font-size:0.88rem;margin-bottom:26px;">${m.cast.map(escapeHTML).join(" &middot; ")}</p>

    <p style="font-size:0.8rem;font-weight:700;color:var(--muted-dim);margin-bottom:10px;">รีวิวจากนักวิจารณ์</p>
    <div style="display:grid;gap:10px;">
      ${m.reviews.map(r => `
        <div class="review-card">
          <p class="review-quote">“${escapeHTML(r.quote)}”</p>
          <p class="review-source">— ${escapeHTML(r.source)}</p>
        </div>
      `).join("")}
    </div>
  `;

  const overlay = document.getElementById("modalOverlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("modalScroll").scrollTop = 0;
  document.getElementById("modalCloseBtn").focus();
}

function closeModal(){
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  if (lastFocusedEl) lastFocusedEl.focus();
}

function initModal(){
  // event delegation: any element with data-open-modal opens that movie
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-modal]");
    if (trigger){ openModal(trigger.dataset.openModal); return; }

    if (e.target.id === "modalOverlay" || e.target.closest("#modalCloseBtn")){
      closeModal();
    }
  });

  // keyboard: Enter/Space on a focused card opens it; Escape closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.getElementById("modalOverlay").classList.contains("open")){
      closeModal();
    }
    if ((e.key === "Enter" || e.key === " ") && e.target.matches(".card[data-open-modal]")){
      e.preventDefault();
      openModal(e.target.dataset.openModal);
    }
  });
}

/* ---------------------------------------------------------------
   6. MISC UI (mobile nav toggle)
------------------------------------------------------------------ */

function initMobileNav(){
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("desktopNav");
  btn.addEventListener("click", () => {
    const isOpen = nav.style.display === "flex";
    nav.style.display = isOpen ? "none" : "flex";
    nav.style.flexDirection = "column";
    nav.style.position = "absolute";
    nav.style.top = "60px";
    nav.style.right = "20px";
    nav.style.background = "var(--surface)";
    nav.style.border = "1px solid var(--line-strong)";
    nav.style.borderRadius = "12px";
    nav.style.padding = "14px 20px";
    nav.style.gap = "14px";
    btn.setAttribute("aria-expanded", String(!isOpen));
  });

  // show nav as inline flex row on wider screens, hide the toggle
  const mq = window.matchMedia("(min-width: 900px)");
  function applyLayout(e){
    if (e.matches){
      nav.style.cssText = "display:flex;gap:30px;";
      btn.style.display = "none";
    } else {
      nav.style.display = "none";
      btn.style.display = "inline-flex";
    }
  }
  mq.addEventListener("change", applyLayout);
  applyLayout(mq);
}

/* ---------------------------------------------------------------
   7. INIT
------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  initFilters();
  renderGrid();
  initModal();
  initMobileNav();
});
