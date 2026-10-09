/* Catálogo de la tienda demo. Los SKU deben coincidir con los que el correo pone en la URL
   (?sku=...) y con los item_id que verás en GA4 / BigQuery. */
const PRODUCTS = {
  "SKU-001": { sku: "SKU-001", name: "Camiseta básica de algodón", price: 49.90,  img: "img/p1.svg", cat: "Camisetas",
               desc: "Camiseta de algodón peinado, corte regular. Suave y transpirable para el día a día." },
  "SKU-002": { sku: "SKU-002", name: "Jeans slim fit",             price: 129.90, img: "img/p2.svg", cat: "Pantalones",
               desc: "Denim elástico de tiro medio, corte slim. Cómodo y con buena recuperación." },
  "SKU-003": { sku: "SKU-003", name: "Vestido midi plisado",       price: 159.90, img: "img/p3.svg", cat: "Vestidos",
               desc: "Vestido midi con falda plisada y cintura marcada. Ideal para ocasiones casuales y formales." },
  "SKU-004": { sku: "SKU-004", name: "Casaca denim clásica",       price: 199.90, img: "img/p4.svg", cat: "Abrigos",
               desc: "Casaca de denim resistente con botones metálicos y bolsillos frontales. Un básico atemporal." },
};
const ORDER = ["SKU-001", "SKU-002", "SKU-003", "SKU-004"];

/* ---- utilidades de URL: mantener el token rcp y los UTM al navegar ---- */
function getParam(n) { return new URLSearchParams(location.search).get(n); }
function getRcp()    { return getParam("rcp") || ""; }
const _TRACK_KEYS = ["rcp", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/* Construye un enlace a `page` conservando rcp + utm de la URL actual. */
function linkCon(page, extra) {
  const u = new URLSearchParams();
  const actual = new URLSearchParams(location.search);
  _TRACK_KEYS.forEach((k) => { const v = actual.get(k); if (v) u.set(k, v); });
  if (extra) Object.entries(extra).forEach(([k, v]) => u.set(k, v));
  const qs = u.toString();
  return qs ? `${page}?${qs}` : page;
}
function fmt(p) { return "S/ " + p.toFixed(2); }
