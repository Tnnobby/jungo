import { useState, useEffect, useRef } from "react";
import { useNavigation } from "./useNavigation";

type BedsheetSetter = (arg1: {
  route?: string;
  element?: JSX.Element;
  onChange?: any;
  initialValue?: any;
}) => void;

type UseOverlayReturn = {
  value: any,
  setBedsheet: BedsheetSetter,
  valueRef: any
}

export function useOverlay(): UseOverlayReturn {
  const [value, setValue] = useState<any>(null);
  const valueRef = useRef<any>(null)
  const { openOverlay } = useNavigation();

  const oldSetBedsheet: BedsheetSetter = ({
    route,
    element,
    onChange,
    initialValue = null,
    ...props
  }) => {
    setValue(initialValue);
    if (route)
      openOverlay({
        type: "bedsheet",
        overlayRoute: route,
        onChange: onChange || setValue,
        initialValue,
      });
    else if (element)
      openOverlay({
        type: "bedsheet",
        overlayElement: element,
        onChange: onChange || setValue,
        initialValue,
      });
  };

  const set = (val: any) => {
    setValue(val)
    valueRef.current = val
  }

  const setBedsheet: BedsheetSetter = ({
    element,
    route,
    initialValue,
    onChange,
    ...additionalProps
  }) => {
    set(initialValue)
    if (route) {
      openOverlay({
        type: 'bedsheet',
        overlayRoute: route,
        onChange: onChange || set,
        initialValue,
        additionalProps
      })
    } else if (element) {
      openOverlay({
        type: 'bedsheet',
        overlayElement: element,
        onChange: onChange || set,
        initialValue,
        additionalProps
      })
    }
  };

  return {
    value,
    valueRef: valueRef,
    setBedsheet
  };
}
