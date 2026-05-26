import { useContext } from 'react';
import { StoreContext } from './Store';

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be utilized within a StoreProvider layer");
  }
  return context;
}