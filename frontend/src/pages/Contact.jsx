import { useState, useEffect } from "react";
import { setSEO } from "../utils/seo";
import WhatsAppCTA from "../components/WhatsAppCTA";
import "../styles/Contact.css";

export default function Contact() {
  const TOURS = [
    "Not sure yet",
    "Sri Lanka Highlights",
    "Cultural Triangle Tour",
    "Hill Country Experience",
    "Wildlife & Safari Tour",
    "Beach & Relaxation Tour",
    "Custom Tour",
  ];

  const COUNTRIES = [
    "Sri Lanka",
    "India",
    "United Kingdom",
    "Australia",
    "United States",
    "Germany",
    "France",
    "Other",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    pax: "",
    startDate: "",
    endDate: "",
    budget: "",
    tour: "Not sure yet",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setSEO({
      title: "Contact Gravity Tours | Sri Lanka Travel Experts",
      description:
        "Plan your Sri Lanka holiday with Gravity Tours. Get a custom itinerary in 24 hours.",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};

    if (!formData.name) e.name = "Name is required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      e.email = "Valid email required";
    if (!formData.whatsapp) e.whatsapp = "WhatsApp number required";
    if (!formData.country) e.country = "Country required";
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate)
      e.dates = "End date must be after start date";
    if (!formData.message) e.message = "Message required";
    if ( formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate))
      e.dates = "End date must be after start date";
    if (!/^\+?[1-9]\d{7,14}$/.test(formData.whatsapp))
      e.whatsapp = "Enter a valid WhatsApp number with country code";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        country: "",
        pax: "",
        startDate: "",
        endDate: "",
        budget: "",
        tour: "Not sure yet",
        message: "",
      });
    } catch {
      setErrors({ submit: "Submission failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <form className="contact-card" onSubmit={handleSubmit}>
        <h1>Contact Us</h1>

        <div className="grid">
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required/>
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
          
            <input type="tel" name="whatsapp" placeholder="+94XXXXXXXXX" value={formData.whatsapp}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9+]/g, "");
                setFormData((prev) => ({ ...prev, whatsapp: value }));
              }}
              inputMode="tel"
              pattern="^\+?[1-9]\d{7,14}$"
              required
            />

            <select name="country" value={formData.country} onChange={handleChange} required>
              <option value="">Country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          <select name="pax" value={formData.pax} onChange={handleChange} required>
            <option value="">Travelers</option>
            <option value="1-2">1–2</option>
            <option value="3-5">3–5</option>
            <option value="6-10">6–10</option>
            <option value="10+">10+</option>
          </select>

          <select name="budget" value={formData.budget} onChange={handleChange}>
            <option value="">Budget (USD)</option>
            <option value="under-500">Under $500</option>
            <option value="500-1000">$500–$1,000</option>
            <option value="1000-2000">$1,000–$2,000</option>
            <option value="2000+">$2,000+</option>
          </select>

          <div className="date-field">
            <label>Start date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={today}
            />
          </div>

          <div className="date-field">
            <label>End date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || today}
            />
          </div>

          <div>
            <label>Tour of Interest</label>
            <select name="tour" value={formData.tour} onChange={handleChange} className="full">
              {TOURS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          name="message"
          placeholder="Tell us about your trip plans"
          value={formData.message}
          onChange={handleChange}
        />

        {errors.dates && <p className="error">{errors.dates}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send Inquiry"}
        </button>

        <WhatsAppCTA variant="inline" tour={formData.tour} title="Chat with us" />

        {success && <p className="success">✅ Inquiry sent successfully</p>}
      </form>
    </div>
  );
}
