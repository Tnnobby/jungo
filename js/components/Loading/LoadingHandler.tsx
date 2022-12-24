import { createContext, useState } from "react";
import Loading from "./loading";

type LoadingContextType = {
  open: () => void;
  close: () => void;
  isLoadingOpen: () => boolean;
}

export const LoadingContext = createContext<LoadingContextType>({open: () => null, close: () => null, isLoadingOpen: () => false})

export default function LoadingHandler ({children}: {children?: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const isLoadingOpen = () => isOpen;

  return (
    <LoadingContext.Provider value={{open, close, isLoadingOpen}}>
      <Loading open={isOpen} />
      {children}
    </LoadingContext.Provider>
  )
}