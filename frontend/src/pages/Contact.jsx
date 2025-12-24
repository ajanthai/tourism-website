import { useState, useEffect } from "react";
import { setSEO } from "../utils/seo";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // success | error | null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSEO({
      title: "Contact Gravity Tours | Sri Lanka Travel Experts",
      description:
        "Contact Gravity Tours to plan your perfect Sri Lanka holiday. Fast responses and custom itineraries.",
    });
  }, []);
  
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Inquiry error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {status === "success" && (
        <p style={{ color: "green" }}>
          ✅ Thanks! We’ll contact you soon.
        </p>
      )}

      {status === "error" && (
        <p style={{ color: "red" }}>
          ❌ Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
