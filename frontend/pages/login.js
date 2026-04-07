import { useState } from "react";
import { useRouter } from "next/router";
import { setToken } from "../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "admin", password: "admin" });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Ungueltige Zugangsdaten");
      }

      const data = await response.json();
      setToken(data.token);
      router.push("/properties");
    } catch (err) {
      setError(err.message || "Anmeldung fehlgeschlagen");
    }
  }

  return (
    <main className="container">
      <h1 className="login-title">Immobilien Management</h1>
      <form onSubmit={handleSubmit} className="card form login-form">
        <label>
          Benutzername
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </label>
        <label>
          Passwort
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <div className="login-actions">
          <button type="submit" className="login-button">Anmelden</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}
