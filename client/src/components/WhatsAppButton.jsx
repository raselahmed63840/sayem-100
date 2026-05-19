const WhatsAppButton = () => {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || "8801719632705";

  return (
    <a
      className="whatsapp-btn"
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
    >
      WhatsApp
    </a>
  );
};

export default WhatsAppButton;
