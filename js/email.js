
(function () {
  // ==============================
  // CONFIG — REPLACE THESE
  // ==============================
  const PUBLIC_KEY   = "YtIfTmOvshV6DHaM1";
  const SERVICE_ID  = "service_60pq9yi"; //
  const TEMPLATE_ID = "template_jpvamfd";

  // ==============================
  // INIT EMAILJS
  // ==============================
  emailjs.init(PUBLIC_KEY);

  // ==============================
  // BASIC BOT / DUPLICATE PROTECTION
  // ==============================
  if (navigator.webdriver) return; // block headless bots

  if (sessionStorage.getItem("email_sent")) return;
  sessionStorage.setItem("email_sent", "true");

  if (window.location.search.includes("owner=true")){ // don't send email if url includes ?owner=true
    console.log("no email sent");
  } return;

  console.log("email sent");
  // ==============================
  // WAIT 10s (filters bounce + bots)
  // ==============================
  setTimeout(() => {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      page: window.location.href,
      referrer: document.referrer || "Direct / None",
      user_agent: navigator.userAgent,
      time: new Date().toLocaleString()
    })
    .then(() => {
      console.log("✅ Visitor email sent");
    })
    .catch(err => {
      console.error("❌ EmailJS error:", err);
    });
  }, 10000);
})();
