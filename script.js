const products = [
  {id:1,name:"Design 001",type:"Neck",fabric:"Cotton",color:"Cream",work:"Machine Embroidery"},
  {id:2,name:"Design 002",type:"Front",fabric:"Cotton",color:"Black",work:"Machine Embroidery"},
  {id:3,name:"Design 003",type:"Neck",fabric:"Cotton",color:"Navy",work:"Machine Embroidery"},
  {id:4,name:"Design 004",type:"Front",fabric:"Cotton",color:"Beige",work:"Machine Embroidery"},
  {id:5,name:"Design 005",type:"Sleeve",fabric:"Cotton",color:"Cream",work:"Machine Embroidery"},
  {id:6,name:"Design 006",type:"Border",fabric:"Cotton",color:"Black",work:"Machine Embroidery"},
  {id:7,name:"Design 007",type:"Cuff",fabric:"Cotton",color:"Navy",work:"Machine Embroidery"},
  {id:8,name:"Design 008",type:"Border",fabric:"Cotton",color:"Beige",work:"Machine Embroidery"}
];

const productsEl = document.getElementById("products");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
let activeFilter = "All";
let selected = null;

function render(){
  const q = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(p => {
    const filterOk = activeFilter === "All" || p.type === activeFilter;
    const text = `${p.name} ${p.type} ${p.fabric} ${p.color} ${p.work}`.toLowerCase();
    return filterOk && text.includes(q);
  });
  productsEl.innerHTML = filtered.map(p => `
    <article class="product">
      <div class="product-img"><span class="tag">${p.type.toUpperCase()}</span></div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.color} • ${p.fabric}</p>
        <div class="product-actions">
          <button onclick="openProduct(${p.id})">View Design</button>
          <a class="order" href="${waLink(p)}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </article>
  `).join("");
  noResults.style.display = filtered.length ? "none" : "block";
}

function waLink(p){
  const msg = `Hello BIN USMAN, I want to enquire about ${p.name} (${p.type}, ${p.color}, ${p.fabric}).`;
  return "https://wa.me/919824441784?text=" + encodeURIComponent(msg);
}

window.openProduct = function(id){
  selected = products.find(p => p.id === id);
  if(!selected) return;
  document.getElementById("modalName").textContent = selected.name;
  document.getElementById("modalType").textContent = selected.type.toUpperCase() + " DESIGN";
  document.getElementById("modalMeta").textContent = `${selected.color} • ${selected.fabric}`;
  document.getElementById("modalFabric").textContent = selected.fabric;
  document.getElementById("modalColor").textContent = selected.color;
  document.getElementById("modalWork").textContent = selected.work;
  document.getElementById("modalOrder").href = waLink(selected);
  document.getElementById("productModal").classList.add("show");
  document.getElementById("productModal").setAttribute("aria-hidden","false");
};

document.getElementById("modalClose").onclick = () => {
  document.getElementById("productModal").classList.remove("show");
  document.getElementById("productModal").setAttribute("aria-hidden","true");
};
document.getElementById("productModal").addEventListener("click", e => {
  if(e.target.id === "productModal") document.getElementById("modalClose").click();
});

document.querySelectorAll(".chip").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  render();
}));

searchInput.addEventListener("input", render);

const drawer = document.getElementById("drawer");
document.getElementById("menuBtn").onclick = () => drawer.classList.add("open");
document.getElementById("drawerClose").onclick = () => drawer.classList.remove("open");
document.querySelectorAll(".drawer nav a").forEach(a => a.onclick = () => drawer.classList.remove("open"));

render();
