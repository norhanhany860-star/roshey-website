var WA = "201021300854";   
var IG = "ro_shey333";     

var BAGS = [
  { n: "Spiral Shell Hobo", p: 500, old: 600, c: [["Terracotta", "#E2725B"], ["White", "#FFFFFF"], ["Beige", "#E5D9B6"], ["Denim Blue", "#6A8CAF"], ["Olive Green", "#708238"]], img: "assets/1.jpeg" },
  { n: "Heart-Studded Flap", p: 450, c: [["Hot Pink", "#FF1493"], ["Light Pink", "#F7C6DA"], ["White", "#FFFFFF"], ["Silver", "#C0C0C0"], ["Light Beige", "#E5D9B6"]], img: "assets/2.jpeg" },
  { n: "Flora & Pearl", p: 350, c: [["Butter Yellow", "#F8D26B"], ["White", "#FFFFFF"], ["Light Beige", "#E5D9B6"], ["Denim Blue", "#6A8CAF"]], img: "assets/3.jpeg" },
  { n: "Butterfly Duo", p: 300, c: [["Hot Pink", "#FF1493"], ["Orange", "#FFA500"], ["White", "#FFFFFF"], ["Gold", "#FFD700"], ["Light Beige", "#E5D9B6"]], img: "assets/4.jpeg" },
  { n: "Ribbed Shell", p: 450, c: [["Sky Blue", "#8EC5E8"], ["White", "#FFFFFF"], ["Light Beige", "#E5D9B6"], ["Soft Pink", "#F7C6DA"]], img: "assets/5.jpeg" },
  { n: "Pearl-Dotted Sleeve", p: 380, old: 450, c: [["Hot Pink", "#FF1493"], ["Pink", "#F7C6DA"], ["White", "#FFFFFF"], ["Soft Grey", "#C0C0C0"], ["Denim Blue", "#6A8CAF"]], img: "assets/6.jpeg" },
  { n: "Shell-Scatter Shoulder", p: 580, c: [["Pink", "#F7C6DA"], ["White", "#FFFFFF"], ["Denim Blue", "#6A8CAF"], ["Soft Grey", "#C0C0C0"], ["Light Beige", "#E5D9B6"]], img: "assets/7.jpeg" },
  { n: "Flora & Pearls", p: 400, c: [["Pink", "#F7C6DA"], ["Yellow", "#F8D26B"], ["White", "#FFFFFF"], ["Denim Blue", "#6A8CAF"], ["Light Beige", "#E5D9B6"]], img: "assets/8.jpeg" },
  { n: "Braided Palm", p: 520, c: [["Beige", "#E5D9B6"], ["Brown", "#6B4F3F"], ["White", "#FFFFFF"], ["Olive Green", "#708238"], ["Denim Blue", "#6A8CAF"]], img: "assets/9.jpeg" },
  { n: "Half-Moon", p: 200, c: [["Pink", "#F7C6DA"], ["White", "#FFFFFF"], ["Denim Blue", "#6A8CAF"], ["Soft Grey", "#C0C0C0"]], img: "assets/10.jpeg" },
  { n: "Loop & Bloom", p: 300, old: 450, c: [["Sage Green", "#87A96B"], ["White", "#FFFFFF"], ["Beige", "#E5D9B6"], ["Butter Yellow", "#F8D26B"], ["Dusty Rose", "#DCAE96"]], img: "assets/11.jpeg" },
  { n: "Shell-Charm Mesh", p: 550, c: [["Light Beige", "#E5D9B6"], ["White", "#FFFFFF"], ["Denim Blue", "#6A8CAF"], ["Olive Green", "#708238"]], img: "assets/12.jpeg" },
  { n: "Floral Strap", p: 400, c: [["Sage Green", "#87A96B"], ["Sky Blue", "#8EC5E8"], ["White", "#FFFFFF"], ["Beige", "#E5D9B6"], ["Butter Yellow", "#F8D26B"]], img: "assets/13.jpeg" },
  { n: "Classic Knit", p: 450, old: 550, c: [["Pink", "#F7C6DA"], ["White", "#FFFFFF"], ["Denim Blue", "#6A8CAF"], ["Grey", "#808080"], ["Soft Yellow", "#FFF2B2"]], img: "assets/14.jpeg" },
  { n: "The Bow", p: 550, c: [["Butter Yellow", "#F8D26B"], ["White", "#FFFFFF"], ["Denim Blue", "#6A8CAF"], ["Lilac", "#C8A2C8"]], img: "assets/15.jpeg" },
  { n: "Chic & Cozy", p: 450, c: [["Brown", "#6B4F3F"], ["Beige", "#E5D9B6"], ["Off-White", "#FAF9F6"], ["Olive Green", "#708238"], ["Denim Blue", "#6A8CAF"], ["Burgundy", "#800020"]], img: "assets/16.jpeg" },
  { n: "Starfish Chic", p: 600, old: 750, c: [["Black", "#000000"], ["Beige", "#E5D9B6"], ["White", "#FFFFFF"], ["Denim Blue", "#6A8CAF"], ["Olive Green", "#708238"], ["Camel", "#C19A6B"]], img: "assets/17.jpeg" }
];

var grid = document.getElementById("grid");
var ov = document.getElementById("ov");
var cur = null;    // product shown in the popup
var sel = 0;       // selected color index in the popup
var last = null;   // element to focus after closing

function paint(i, k) {
  var b = BAGS[i];
  b.k = k;

  document.querySelectorAll("#d" + i + " .dot").forEach(function (d, j) {
    d.setAttribute("aria-pressed", j === k);
  });
}

BAGS.forEach(function (b, i) {
  var card = document.createElement("div");
  card.setAttribute("class", "card");
  
  var sale;
  if (b.old) {sale = Math.round((1 - b.p / b.old) * 100);} 
  else {sale = 0;}

  card.innerHTML =
    '<div class="im">' +
      (sale ? '<span class="sale-tag"> <b>' + sale + '%</b><small>OFF</small>  </span>' : '') 
      +
      '<img src="' + b.img + '" alt="' + b.n + '">' +
    '</div>' 
    +
    '<div class="b">' +
      '<h3>' + b.n + '</h3>' +
      '<div class="pr">' + (sale ? '<s class="old-price">' + b.old + ' EGP</s> ' : '') + b.p + ' EGP</div>' +
      '<div class="colors-label">' + (b.c.length ? 'Available colors:' : '') + '</div>' +
      '<div class="dots" id="d' + i + '"> </div>' +
      '<button class="btn">Order now</button>' +
    '</div>';

  grid.appendChild(card);

  var dotsBox = card.querySelector(".dots");

  b.c.forEach(
    function (x, k) {
    var dot = document.createElement("button");
    dot.className = "dot";
    dot.style.background = x[1];
    dot.setAttribute("aria-label", x[0]);
    dot.onclick = function () { paint(i, k); };
    dotsBox.appendChild(dot);
  }
);

  card.querySelector(".btn").onclick = function (e) {
    openModal(b, b.k || 0, e.currentTarget);
  };

  paint(i, 0);
});



function popupDots() {
  var box = document.getElementById("cd");
  box.innerHTML = "";

  cur.c.forEach(function (x, k) {
    var dot = document.createElement("button");
    dot.className = "dot";
    dot.style.background = x[1];
    dot.setAttribute("aria-label", x[0]);
    dot.setAttribute("aria-pressed", k == sel);
    dot.onclick = function () { sel = k; popupDots(); };
    box.appendChild(dot);
  }
  );
}

function openModal(b, k, from) {
  cur = b;
  sel = k;
  last = from;

  document.getElementById("mt").textContent = "BAG: " + b.n;
  document.getElementById("mp").textContent = b.p ? "PRICE: " + b.p + " EGP" : "";
  document.getElementById("cw").style.display = b.c.length ? "block" : "none";
  document.getElementById("nl").textContent = b.p ? "Describe your bag:" : "Customize it: ";
  document.getElementById("nt").value = "";
  document.getElementById("hint").textContent = "if using Instagram message copied. Paste it in our Instagram chat.";

  if (b.c.length) popupDots();

  ov.classList.add("on");
  document.getElementById("cl").focus();
}

function closeModal() {
  ov.classList.remove("on");
  if (last) last.focus();
}

document.getElementById("cl").onclick = closeModal;
ov.onclick = function (e) { if (e.target == ov) closeModal(); };

document.getElementById("cust").onclick = function (e) {
  openModal({ n: "Custom bag", p: 0, c: [] }, 0, e.currentTarget);
};


function msg() {
  var notes = document.getElementById("nt").value.trim();
  var color = cur.c.length ? " in " + cur.c[sel][0] : "";

  return "Hi ROSHEY! I’d like to order: " + cur.n + color + "." +
    (notes ? " Details: " + notes : "");
}

document.getElementById("wa").onclick = function () {
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg()), "_blank", "noopener,noreferrer");
};

document.getElementById("ig").onclick = function () {
  var m = msg();
  navigator.clipboard.writeText(m);
  window.open("https://ig.me/m/" + IG, "_blank", "noopener,noreferrer");
};
