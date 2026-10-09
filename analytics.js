/* ====================================================================
   GA4 — Google Analytics 4
   >>> REEMPLAZA G-XXXXXXXXXX por TU Measurement ID (GA4 → Admin →
       Flujos de datos → Web). Hasta entonces, los eventos se disparan
       pero no llegan a ninguna propiedad real.
   ==================================================================== */
const GA4_ID = "G-P9T3WSJ4EW";

(function () {
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  // GA4 captura automáticamente los UTM de la URL de llegada (source/medium/campaign).
  gtag("config", GA4_ID);
})();

function _rcp() { return new URLSearchParams(location.search).get("rcp") || ""; }

/* Helpers de ecommerce. `rcp` viaja en cada evento para poder unir en BigQuery
   el evento de GA4 con la persona a la que tu sistema le envió el correo. */
window.ga4 = {
  viewItem(p) {
    gtag("event", "view_item", {
      currency: "PEN", value: p.price, rcp: _rcp(),
      items: [{ item_id: p.sku, item_name: p.name, item_category: p.cat, price: p.price }],
    });
  },
  addToCart(p) {
    gtag("event", "add_to_cart", {
      currency: "PEN", value: p.price, rcp: _rcp(),
      items: [{ item_id: p.sku, item_name: p.name, item_category: p.cat, price: p.price, quantity: 1 }],
    });
  },
  purchase(p, txId) {
    gtag("event", "purchase", {
      transaction_id: txId, currency: "PEN", value: p.price, rcp: _rcp(),
      items: [{ item_id: p.sku, item_name: p.name, item_category: p.cat, price: p.price, quantity: 1 }],
    });
  },
};
