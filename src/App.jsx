import { useState } from "react";
import "./App.css";
import usePokemonSearch from "./hooks/usePokemonSearch";

function App() {
  const [search, setSearch] = useState("");
  const [chaosMode, setChaosMode] = useState(false);
  const { results, loading, error } = usePokemonSearch(search, chaosMode);

  const handleToggleChaosMode = () => {
    setChaosMode((prevChaosMode) => !prevChaosMode);
  };

  return (
    <>
      <h1>Pokedex</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a Pokemon"
      />
      <button onClick={handleToggleChaosMode}>
        {chaosMode ? "Disable Chaos Mode" : "Enable Chaos Mode"}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error - {error}</p>}
      {search.length > 0 && !results.length && <p>No Results</p>}
      {search.length === 0 && <p>Start typing to search for a Pokemon</p>}
      <ul>
        {results.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
