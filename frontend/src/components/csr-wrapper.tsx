'use client';

import { useEffect, useState } from 'react';

export function CSRWrapper({ children }: { readonly children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Renderiza apenas no lado cliente
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

export default CSRWrapper;
