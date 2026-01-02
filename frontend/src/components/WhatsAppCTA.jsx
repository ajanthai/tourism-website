import { buildWhatsAppLink } from "../utils/whatsapp";
import { FaWhatsapp } from "react-icons/fa";

// Accept `tour` and `source` as optional params so callers can customize the message
const WhatsAppCTA = ({ variant = "floating", tour = null, source = "website", title = null}) => {
    const href = buildWhatsAppLink({ tour, source });

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={variant === "floating" ? "whatsapp-float" : "whatsapp-inline"}
        >
            <FaWhatsapp size={20} color="#25d366" />
            <span style={{ marginLeft: 4 }}>
            {title || "Chat with us"}</span>
        </a>
    );
};

export default WhatsAppCTA;