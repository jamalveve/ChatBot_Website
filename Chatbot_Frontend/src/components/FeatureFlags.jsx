import { useState, useEffect } from "react";

export function useFeatureFlags() {
  const [flags, setFlags] = useState({});


  useEffect(() => {
    fetch("http://localhost:9098/api/feature-flags")
      .then(res => res.json())
      .then(data => setFlags(data))
      .catch(() => setFlags({}));
  }, []);

  return flags;
}
