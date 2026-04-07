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
      setError("Unable to load properties");
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
      setError("Unable to filter properties");
    }
  }

  async function handleDelete(id) {
    try {
      await apiFetch(`/api/properties/${id}`, { method: "DELETE" });
      await loadProperties();
    } catch (err) {
      setError("Delete failed");
    }
  }

  function logout() {
    clearToken();
    router.push("/login");
  }

  return (
    <main className="container">
      <div className="row">
        <h1>Properties</h1>
        <div className="row gap">
          <Link href="/add-property" className="button-link">Add Property</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <form onSubmit={applyFilter} className="card form inline">
        <input
          placeholder="City"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        <input
          placeholder="Min Price"
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          placeholder="Max Price"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <button type="submit">Filter</button>
        <button type="button" onClick={loadProperties}>Reset</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {properties.map((property) => (
          <div className="card" key={property.id}>
            <h3>{property.title}</h3>
            <p>{property.address}</p>
            <p>{property.city}</p>
            <p>Price: {property.price}</p>
            <p>Commission: {property.commissionPercent}%</p>
            <p>Photos: {(property.photos || []).length}</p>
            <div className="row gap">
              <Link href={`/edit-property/${property.id}`} className="button-link">Edit</Link>
              <button onClick={() => handleDelete(property.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
