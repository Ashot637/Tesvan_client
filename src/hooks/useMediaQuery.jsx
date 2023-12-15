import { useEffect, useState } from 'react';

export default function useMediaQuery(query) {
  const getMatches = (query) => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query)?.matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(getMatches(query));
    };

    handleChange();

    if (matchMedia?.addEventListener) {
      matchMedia?.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia?.removeEventListener) {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return !matches;
}
