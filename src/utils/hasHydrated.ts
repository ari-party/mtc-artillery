import { useEffect, useState } from 'react';

export default function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
}
