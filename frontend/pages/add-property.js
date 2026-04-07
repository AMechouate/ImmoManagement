import { useState } from "react";
import { useRouter } from "next/router";
import { apiFetch } from "../lib/api";

export default function AddPropertyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    address: "",
    city: "",
    price: "",
    commissionPercent: "",
    photos: ""
  });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await apiFetch("/api/properties", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          commissionPercent: Number(form.commissionPercent),
          photos: form.photos
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean)
        })
      });
      router.push("/properties");
    } catch (err) {
      setError("Could not create property");
    }
  }

  return (
    <main className="container">
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit} className="card form">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input
          placeholder="Commission Percent"
          type="number"
          value={form.commissionPercent}
          onChange={(e) => setForm({ ...form, commissionPercent: e.target.value })}
        />
        <input
          placeholder="Photos (comma separated URLs)"
          value={form.photos}
          onChange={(e) => setForm({ ...form, photos: e.target.value })}
        />
        <button type="submit">Create</button>
        <button type="button" onClick={() => router.push("/properties")}>Cancel</button>
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}
