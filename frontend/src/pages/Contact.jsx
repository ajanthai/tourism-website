import { useState, useEffect } from "react";
import { setSEO } from "../utils/seo";

export default function Contact() {
  const TOURS = [
  "Not sure yet",
  "Sri Lanka Highlights",
  "Cultural Triangle Tour",
  "Hill Country Experience",
  "Wildlife & Safari Tour",
  "Beach & Relaxation Tour",
  "Custom Tour"
];

const [formData, setFormData] = useState({
  name: "",
  email: "",
  whatsapp: "",
  tour: "Not sure yet",
  month: "",
  travelers: "",
  country: "",
  message: ""
});

const [errors, setErrors] = useState({});
const [success, setSuccess] = useState(false);

  const [status, setStatus] = useState(null); // success | error | null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSEO({
      title: "Contact Gravity Tours | Sri Lanka Travel Experts",
      description:
        "Contact Gravity Tours to plan your perfect Sri Lanka holiday. Fast responses and custom itineraries.",
    });
  }, []);
  
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const validate = () => {
  const newErrors = {};

  if (!formData.name.trim()) newErrors.name = "Full name is required";
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    newErrors.email = "Invalid email address";
  }

  if (!formData.whatsapp.trim())
    newErrors.whatsapp = "WhatsApp number is required";

  if (!formData.message.trim())
    newErrors.message = "Message is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);
  setSuccess(false);

  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error("Failed");

    setSuccess(true);
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      tour: "Not sure yet",
      month: "",
      travelers: "",
      country: "",
      message: ""
    });
  } catch (err) {
    setErrors({ submit: "Something went wrong. Please try again." });
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="+94..."
          value={formData.whatsapp}
          onChange={handleChange}
          required
        />
        {errors.whatsapp && <p className="error">{errors.whatsapp}</p>}

        <select name="tour" value={formData.tour} onChange={handleChange}>
          {TOURS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {success === true && (
        <p style={{ color: "green" }}>
          ✅ Thanks! We’ll contact you soon.
        </p>
      )}

      {errors === true && (
        <p style={{ color: "red" }}>
          ❌ Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
