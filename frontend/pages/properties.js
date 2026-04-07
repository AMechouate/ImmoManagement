import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch, clearToken, getToken } from "../lib/api";
import { useRouter } from "next/router";

export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ city: "", minPrice: "", maxPrice: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
      return;
    }
    loadProperties();
  }, []);

  async function loadProperties() {
    setError("");
    try {
      const data = await apiFetch("/api/properties");
      setProperties(data);
    } catch (err) {
      setError("Immobilien konnten nicht geladen werden");
    }
  }

  async function applyFilter(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (filters.city) params.append("city", filters.city);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

    try {
      const data = await apiFetch(`/api/properties/filter?${params.toString()}`);
      setProperties(data);
    } catch (err) {
      setError("Filter konnte nicht angewendet werden");
    }
  }

  async function handleDelete(id) {
    try {
      await apiFetch(`/api/properties/${id}`, { method: "DELETE" });
      await loadProperties();
    } catch (err) {
      setError("Loeschen fehlgeschlagen");
    }
  }

  function logout() {
    clearToken();
    router.push("/login");
  }

  return (
    <main className="container">
      <div className="row">
        <h1>Immobilien Management</h1>
        <div className="row gap">
          <Link href="/add-property" className="button-link">Immobilie anlegen</Link>
          <button onClick={logout}>Abmelden</button>
        </div>
      </div>

      <form onSubmit={applyFilter} className="card form inline">
        <input
          placeholder="Stadt"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        <input
          placeholder="Preis ab"
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          placeholder="Preis bis"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <button type="submit">Filtern</button>
        <button type="button" onClick={loadProperties}>Zuruecksetzen</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {properties.map((property) => (
          <div className="card" key={property.id}>
            <div className="property-gallery" aria-label={`Bilder von ${property.title}`}>
              {(property.photos || []).length > 0 ? (
                (property.photos || []).map((photoUrl, index) => (
                  <a
                    key={`${property.id}-${index}`}
                    href={photoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="property-gallery-item"
                  >
                    <img
                      src={photoUrl}
                      alt={`Immobilie ${property.title} Bild ${index + 1}`}
                      className="property-gallery-image"
                    />
                  </a>
                ))
              ) : (
                <div className="property-gallery-item property-gallery-empty">
                  <span>Kein Bild verfuegbar</span>
                </div>
              )}
            </div>
            <h3>{property.title}</h3>
            <p>{property.address}</p>
            <p>{property.city}</p>
            <p>Preis: {property.price}</p>
            <p>Provision: {property.commissionPercent}%</p>
            <p>Bilder: {(property.photos || []).length}</p>
            <div className="row gap">
              <Link href={`/edit-property/${property.id}`} className="button-link">Bearbeiten</Link>
              <button onClick={() => handleDelete(property.id)}>Loeschen</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
