import { useState } from "react";
import supabase from "../../utils/supabaseClient";

export default function AdminTours() {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    location: "",
    price: "",
    duration: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function saveTour(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Not authenticated");
      }

      const res = await fetch("/api/admin/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          slug: form.slug,
          title: form.title,
          description: form.description,
          location: form.location,
          price: Number(form.price),
          duration: form.duration,
          image_url: form.image_url,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save tour");
      }

      setStatus("success");
      setForm({
        slug: "",
        title: "",
        description: "",
        location: "",
        price: "",
        duration: "",
        image_url: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Add New Tour</h2>

      <form onSubmit={saveTour}>
        <input name="slug" placeholder="Slug (sigiriya-rock)" value={form.slug} onChange={handleChange} required />
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="duration" placeholder="Duration (2 Days)" value={form.duration} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Saving..." : "Save Tour"}
        </button>
      </form>

      {status === "success" && <p>Tour added successfully!</p>}
      {status === "error" && <p>Failed to add tour.</p>}
    </div>
  );
}
