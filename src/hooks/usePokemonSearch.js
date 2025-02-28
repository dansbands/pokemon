import { useEffect, useState } from "react";

const usePokemonSearch = (searchTerm) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const fetchPokemon = async (term, accumulatedResults = [], page) => {
      setLoading(true);
      try {
        let url = `https://meowing-bristle-alamosaurus.glitch.me/api/pokemon/search/${term}`;
        if (page) {
          url += `?page=${page}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        const newResults = accumulatedResults.concat(data.pokemon);
        setResults(newResults);

        if (data.nextPage) {
          fetchPokemon(term, newResults, data.nextPage);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemon(searchTerm);
  }, [searchTerm]);

  return { results, loading, error };
};

export default usePokemonSearch;
