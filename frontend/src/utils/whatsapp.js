export function buildWhatsAppLink({
  tour,
  source = "website",
}) {
  const phone = "94774131314"; // Sri Lanka number, no +
  
  let message = `Hi Gravityland Tours 👋%0A`;

  if (tour) {
    message += `I'm interested in the ${tour}.%0A`;
  }

  message += `Please share more details.%0A%0A`;
  message += `Source: ${source}`;

  return `https://wa.me/${phone}?text=${message}`;
}
