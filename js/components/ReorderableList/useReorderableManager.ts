import { useRef, useState } from "react";
import { LayoutRectangle } from "react-native";

export type ReorderableElement = {
  id: string;
  layout: LayoutRectangle;
  val: any;
};
export type ElementState = {
  isMoving: boolean;
};
export type LayoutList = { [key: string]: LayoutRectangle };
export type LayoutGetter = (id: string) => LayoutRectangle;
export type LayoutSetter = (id: string, layout: LayoutRectangle) => void;
export type StateGetter = (id: string) => ElementState;
export type MovingSetter = (id?: string) => void;

export interface ReorderableManager {
  setLayout: LayoutSetter;
  getLayout: LayoutGetter;
  getState: StateGetter;
  setMoving: MovingSetter;
  setMovingEnded: MovingSetter;
  checkOverlap: (id: string, verticalOffset: number) => void;
  calculateOffset: () => number;
  isMoving: boolean
  elements: ReorderableElement[];
}

export default function useReorderableManager(list: any[]): ReorderableManager {
  const [elements, setElements] = useState<ReorderableElement[]>(
    list.map((el) => {
      const { id, ...val } = el;
      return { id, layout: null, val };
    })
  );
  const [moving, setMoving] = useState<boolean>(false);
  const movingState = useRef<{ start: number; current: number }>({
    start: null,
    current: null,
  });
  const tempOrder = useRef<ReorderableElement[]>([])

  const _moveElement = (from: number, to: number) => {
    movingState.current.current = to
    const _temp = elements.map((val, index, array) => {
      if (index !== from && index !== to) {
        return val;
      }
      if (index === from) {
        return array[to];
      }
      if (index === to) {
        return array[from];
      }
    });
    setElements(_temp);
  };

  const _setLayout: LayoutSetter = (id: string, layout: LayoutRectangle) => {
    setElements((old) => {
      const i = old.findIndex((val) => val.id === id);
      old[i] = { ...old[i], id, layout };
      return old;
    });
  };
  const _getLayout: LayoutGetter = (id: string) => elements[id];
  const _getState: StateGetter = (id: string) => {
    return {
      isMoving: moving,
    };
  };
  const _setMoving: MovingSetter = (id: string) => {
    movingState.current = {
      start: elements.findIndex((val) => val.id === id),
      current: elements.findIndex((val) => val.id === id),
    };
    tempOrder.current = [...elements]
    setMoving(true)
  };
  const _setMovingEnded: MovingSetter = () => setMoving(false);
  const _checkOverlap: (id: string, verticalOffset: number) => void = (
    id: string,
    verticalOffset: number
  ) => {
    const position = movingState.current.current;
    const { layout } = tempOrder.current[position];
    if (position !== 0) {
      // IF it is the top, don't check if it should go up
      if (
        layout.y + layout.height + verticalOffset <
        elements[position - 1].layout.y +
          elements[position - 1].layout.height - 10
      ) {
        _moveElement(position, position - 1);
        return;
      }
    }
    if (position !== elements.length - 1) {
      // IF it is the bottom, don't check if it should go down
      if (
        layout.y + verticalOffset >
        elements[position + 1].layout.y + 10
      ) {
        _moveElement(position, position + 1);
        return;
      }
    }
  };

  const calculateOffset = () => {
    let offset = 0
    if (movingState.current.current === movingState.current.start) return offset;
    const change = movingState.current.current - movingState.current.start;
    for (let i = 1; i < Math.abs(change) + 1; i++) {
      if (change < 0) {
        offset += tempOrder.current[movingState.current.start - i].layout.height
      } else {
        offset -= tempOrder.current[movingState.current.start + i].layout.height
      }
    }
    
    return offset
  };

  return {
    setLayout: _setLayout,
    getLayout: _getLayout,
    getState: _getState,
    setMoving: _setMoving,
    setMovingEnded: _setMovingEnded,
    checkOverlap: _checkOverlap,
    calculateOffset,
    isMoving: false,
    elements,
  };
}
