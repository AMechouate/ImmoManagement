import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiFetch } from "../../lib/api";

export default function EditPropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({
    title: "",
    address: "",
    city: "",
    price: "",
    commissionPercent: "",
    photos: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      loadProperty(id);
    }
  }, [id]);

  async function loadProperty(propertyId) {
    try {
      const data = await apiFetch(`/api/properties/${propertyId}`);
      setForm({
        title: data.title || "",
        address: data.address || "",
        city: data.city || "",
        price: data.price || "",
        commissionPercent: data.commissionPercent || "",
        photos: (data.photos || []).join(", ")
      });
    } catch (err) {
      setError("Immobilie konnte nicht geladen werden");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await apiFetch(`/api/properties/${id}`, {
        method: "PUT",
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
      setError("Immobilie konnte nicht aktualisiert werden");
    }
  }

  return (
    <main className="container">
      <h1>Immobilie bearbeiten</h1>
      <form onSubmit={handleSubmit} className="card form">
        <input placeholder="Titel" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Adresse" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input placeholder="Stadt" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <input placeholder="Preis" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input
          placeholder="Provision in Prozent"
          type="number"
          value={form.commissionPercent}
          onChange={(e) => setForm({ ...form, commissionPercent: e.target.value })}
        />
        <input
          placeholder="Bild-URLs (mit Komma getrennt)"
          value={form.photos}
          onChange={(e) => setForm({ ...form, photos: e.target.value })}
        />
        <button type="submit">Speichern</button>
        <button type="button" onClick={() => router.push("/properties")}>Abbrechen</button>
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}
