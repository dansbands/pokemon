import { useEffect, useState, useRef } from "react";

const usePokemonSearch = (searchTerm, chaosMode) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const latestRequestRef = useRef(0);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const fetchPokemon = async (
      term,
      accumulatedResults = [],
      page,
      retries = 3
    ) => {
      setLoading(true);
      const requestId = ++latestRequestRef.current;
      try {
        let url = `https://meowing-bristle-alamosaurus.glitch.me/api/pokemon/search/${term}`;
        const params = new URLSearchParams();

        if (chaosMode) {
          params.append("chaos", "true");
        }
        if (page) {
          params.append("page", page);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const newResults = accumulatedResults.concat(data.pokemon);

        if (requestId === latestRequestRef.current) {
          setResults(newResults);
        }

        if (data.nextPage) {
          fetchPokemon(term, newResults, data.nextPage);
        } else {
          setLoading(false);
        }
      } catch (err) {
        if (retries > 0) {
          fetchPokemon(term, accumulatedResults, page, retries - 1);
        } else {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchPokemon(searchTerm);
  }, [searchTerm, chaosMode]);

  return { results, loading, error };
};

export default usePokemonSearch;
