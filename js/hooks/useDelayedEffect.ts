import { useEffect } from "react"



interface UseDelayedEffectProps {
  callback: () => void;
  delay: number,
  deps: any[]
}

type UseDelayedEffect = () => void

/** UNFINISHED */
const useDelayedEffect = (callback, delay, deps) => {
  useEffect(() => {

  }, deps)
}