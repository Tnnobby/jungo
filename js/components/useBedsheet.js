import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, PanResponder, Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { Animated } from "react-native";
import { closeOverlay } from "../../redux/reducers/overlayReducer";
import Bedsheet from "./Bedsheet";

export default function useBedsheet() {
  const [value, setValue] = useState(null);
  const [props, setProps] = useState(null);


  const renderBedsheetWithChildren = (rc) => {
    return render(rc);
  }

  const render = (children) => (
    <Bedsheet setValue={setValue} >
      {props ? children.map((child) => React.cloneElement(child, props)) : children}
    </Bedsheet>
  )

  return {value, setProps, renderBedsheetWithChildren}
}