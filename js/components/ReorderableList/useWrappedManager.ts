import { ReorderableManager } from "./useReorderableManager";
import { LayoutRectangle } from 'react-native'

interface WrappedReorderableManager {
  setLayout: (layout: LayoutRectangle) => void;
  getLayout: () => LayoutRectangle;
  setMoving: () => void;
  checkOverlap: (verticalOffset: number) => void;
  setMovingEnded: () => void;
  calculateOffset: () => number
}

export default function useWrappedManager (manager: ReorderableManager, id: string): WrappedReorderableManager {
  const setLayout = (layout: LayoutRectangle) => {
    manager.setLayout(id, layout);
  };
  const getLayout = () => manager.getLayout(id);
  const checkOverlap = (verticalOffset: number) => {
    manager.checkOverlap(id, verticalOffset);
  };
  const setMoving = () => manager.setMoving(id);
  const setMovingEnded = () => manager.setMovingEnded()
  const calculateOffset = () => manager.calculateOffset()

  return {
    setMoving,
    setLayout,
    getLayout,
    checkOverlap,
    setMovingEnded,
    calculateOffset
  }
}