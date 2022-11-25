import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import constants from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as Haptics from "expo-haptics";
import {
  closeOverlay,
  setOverlayValue,
} from "../../../redux/reducers/overlayReducer";
import ActionRow from "./ActionRow";

const TEMP_BOUNDS = {
  high: 700,
  low: 0,
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    marginHorizontal: 15,
    flexDirection: "column",
    alignItems: "center",
  },
  dropdownSelector: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },
  dropdownText: {
    fontSize: 22,
    fontFamily: "Rubik_400",
  },
  tempSelector: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: "column",
  },
  tempContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tempText: {
    fontFamily: "Rubik_700",
    fontSize: 32,
  },
  fText: {
    fontFamily: "Rubik_400",
    fontSize: 32,
  },
  tickContainer: {
    width: TEMP_BOUNDS.high,
    justifyContent: "space-between",
    height: 30,
    flexDirection: "row",
    // transform: [{translateX: -TEMP_BOUNDS.high* 0.5}],
    // backgroundColor: 'red'
  },
  tempWheel: {
    flexDirection: "row",
    maxWidth: Dimensions.get("screen").width * 0.8,
    position: "relative",
    alignItems: "center",
    overflow: "hidden",
    height: 80,
    // backgroundColor: 'red'
  },
  wheelElement: {
    backgroundColor: "black",
    height: 30,
    width: 3,
    borderRadius: 10,
  },
  wheelElementCenter: {
    // borderWidth: 2,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -4 }],
    backgroundColor: constants.primary_color,
    height: 40,
    width: 4,
    borderRadius: 9,
    // marginHorizontal: 6,
    zIndex: 9,
  },
  beginFade: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: 70,
    zIndex: 10,
  },
  endFade: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    width: 70,
    zIndex: 10,
  },
});

export interface PreheatProps extends React.FC {
  children?: React.ReactNode;
  close?: () => void;
  cancel?: () => void;
  initialValue?: any
  onChange?: (value: any) => void
}

export default function Preheat({
  close,
  cancel,
  initialValue = 0,
  onChange,
  ...props
}: PreheatProps) {
  const [temp, setTemp] = useState(initialValue);
  const [startTemp, setStartTemp] = useState(temp);
  const progress = useRef(new Animated.Value(initialValue) as any).current;

  const sliderResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (ev, gs) => {
          // console.log('moving preheat')
          return Math.abs(gs.vy) < Math.abs(gs.vx);
        },
        onPanResponderGrant: () => progress.setOffset(progress._value),
        onPanResponderMove: (ev, gs: any) => {
          gs.odx = gs.dx;
          Animated.event([{ dx: progress }], {
            useNativeDriver: false,
            listener: (ev) => {
              const temp = Math.min(
                Math.max(TEMP_BOUNDS.low, Math.ceil(startTemp - gs.odx)),
                TEMP_BOUNDS.high
              );

              setTemp(temp);
              onChange(temp)
            },
          })({ ...gs, dx: -gs.dx });
        },
        onPanResponderRelease: (ev, gs) => {
          progress.flattenOffset();
          if (progress._value > TEMP_BOUNDS.high)
            progress.setValue(TEMP_BOUNDS.high);
          if (progress._value < TEMP_BOUNDS.low)
            progress.setValue(TEMP_BOUNDS.low);
          setStartTemp(progress._value);
          
        },
        onPanResponderTerminationRequest: () => false,
      }),
    [startTemp]
  );

  const doneHandle = () => {
    // console.log(temp)
    close();
  };
  const cancelHandle = () => {
    cancel()
  };

  return (
    <View style={styles.body}>
      <View style={styles.dropdownSelector}>
        <Text style={styles.dropdownText}>Preheat Oven</Text>
      </View>
      <View style={styles.tempSelector}>
        <View style={styles.tempContainer}>
          <Pressable style={styles.tempContainer}>
            <Text style={styles.tempText}>{temp}</Text>
            <Text style={styles.fText}>℉</Text>
          </Pressable>
        </View>
        <View style={styles.tempWheel} {...sliderResponder.panHandlers}>
          <LinearGradient
            style={styles.beginFade}
            colors={["white", "rgba(255,255,255,0)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
          <View style={styles.wheelElementCenter} />
          <Animated.View
            style={{
              ...styles.tickContainer,
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [TEMP_BOUNDS.low, TEMP_BOUNDS.high],
                    outputRange: [
                      TEMP_BOUNDS.low +
                        (Dimensions.get("screen").width * 0.8) / 2 -
                        4,
                      -TEMP_BOUNDS.high +
                        (Dimensions.get("screen").width * 0.8) / 2,
                    ],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            {new Array(Math.ceil(TEMP_BOUNDS.high / 20))
              .fill("")
              .map((n, index) => {
                return (
                  <View
                    key={`wheel-element-${index}`}
                    style={{
                      ...styles.wheelElement,
                    }}
                  />
                );
              })}
          </Animated.View>
          <LinearGradient
            style={styles.endFade}
            colors={["white", "rgba(255,255,255,0)"]}
            start={{ x: 1, y: 0.5 }}
            end={{ x: 0, y: 0.5 }}
          />
        </View>
      </View>
      <ActionRow doneHandle={doneHandle} cancelHandle={cancelHandle} />
    </View>
  );
}
