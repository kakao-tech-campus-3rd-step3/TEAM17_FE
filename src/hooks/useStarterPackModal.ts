import { useCallback, useState } from 'react';
import type { StarterPack } from '@/types/StarterPack';

export function useStarterPackModal() {
  const [selectedPack, setSelectedPack] = useState<StarterPack | null>(null);
  const open = useCallback((pack: StarterPack) => setSelectedPack(pack), []);
  const close = useCallback(() => setSelectedPack(null), []);
  return { selectedPack, open, close };
}
