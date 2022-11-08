type DelayFunc = (callback: () => void, delay: number, options?: { repeat?: boolean }) => () => void

export const useDelay = () => {
  
  const set: DelayFunc = (callback, delay, options) => {
    
    if (!options?.repeat) {
      const ref = setTimeout(callback, delay)
      return () => clearTimeout(ref)
    } else {
      const ref = setInterval(callback, delay)
      return () => clearInterval(ref)
    }
  }
  
  return set
}