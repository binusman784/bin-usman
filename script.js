const products = [
  {id:1,name:"Jhubba Kurta — Geometric",type:"Kurta",fabric:"Premium Fabric",color:"Ice Blue",work:"Machine Embroidery",image:"product-kurta.jpg"},
  {id:2,name:"Embroidered Unstitched — Maroon",type:"Unstitched",fabric:"Premium Fabric",color:"White / Maroon",work:"Front Embroidery",image:"product-maroon.jpg"},
  {id:3,name:"Embroidered Unstitched — Gold",type:"Unstitched",fabric:"Premium Fabric",color:"White / Gold",work:"Front Embroidery",image:"product-gold.jpg"},
  {id:4,name:"Embroidered Unstitched — Mauve",type:"Unstitched",fabric:"Premium Fabric",color:"Mauve / White",work:"Front Embroidery",image:"product-mauve.jpg"}
];

const productsEl = document.getElementById("products");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
let selected = null;

function render(){
  const q = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(p => `${p.name} ${p.type} ${p.fabric} ${p.color} ${p.work}`.toLowerCase().includes(q));
  productsEl.innerHTML = filtered.map(p => `
    <article class="product">
      <div class="product-img"><img src="${p.image}" alt="${p.name}"><span class="tag">${p.type.toUpperCase()}</span></div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.color} • ${p.fabric}</p>
        <div class="product-actions">
          <button onclick="openProduct(${p.id})">View Product</button>
          <a class="order" href="${waLink(p)}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </article>
  `).join("");
  noResults.style.display = filtered.length ? "none" : "block";
}

function waLink(p){
  const msg = `Hello BIN USMAN, I want to enquire about ${p.name} (${p.type}, ${p.color}).`;
  return "https://wa.me/919824441784?text=" + encodeURIComponent(msg);
}

window.openProduct = function(id){
  selected = products.find(p => p.id === id);
  if(!selected) return;
  document.getElementById("modalName").textContent = selected.name;
  document.getElementById("modalType").textContent = selected.type.toUpperCase();
  document.getElementById("modalMeta").textContent = `${selected.color} • ${selected.fabric}`;
  document.getElementById("modalFabric").textContent = selected.fabric;
  document.getElementById("modalColor").textContent = selected.color;
  document.getElementById("modalWork").textContent = selected.work;
  document.getElementById("modalOrder").href = waLink(selected);
  const modalImage = document.getElementById("modalImage");
  modalImage.innerHTML = `<img src="${selected.image}" alt="${selected.name}">`;
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

searchInput.addEventListener("input", render);

const drawer = document.getElementById("drawer");
document.getElementById("menuBtn").onclick = () => drawer.classList.add("open");
document.getElementById("drawerClose").onclick = () => drawer.classList.remove("open");
document.querySelectorAll(".drawer nav a").forEach(a => a.onclick = () => drawer.classList.remove("open"));

render();
