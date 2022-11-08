import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    backgroundColor: "white",
    marginHorizontal: 20,
  },
});

export default function Rearrangeable({ name, data, renderData, ...props }) {
  const [state, setState] = useState({ state: "idle", activeIndex: null });
  const [itemOrder, setItemOrder] = useState(
    new Array(data.length).fill(" ").map((_, index) => index)
  );
  const [itemLayouts, setItemLayouts] = useState([]);
  const [itemRefs, setItemRefs] = useState([]);

  const responder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (ev, gs) =>
          state.state === "active" && Math.abs(gs.dy) > 10,
        onPanResponderGrant: (ev, gs) => {
          // itemRefs[state.activeIndex].setOffset(
          //   itemRefs[state.activeIndex]._value
          //   // 0
          // );
        },
        onPanResponderMove: Animated.event(
          [null, { dy: itemRefs[state.activeIndex] }],
          { useNativeDriver: false }
        ),
        onPanResponderRelease: (ev, gs) => {
          itemRefs[state.activeIndex].flattenOffset();
          setState((prev) => {
            return { ...prev, state: "idle", activeIndex: null };
          });
        },
      }),
    [state]
  );

  const layoutHandle = (index, layout) => {
    // This is working - not ready to implement yet
    // setItemLayouts((old) => {
    //   old[index] = layout;
    //   return old;
    // })
  };

  /**
   *
   * @param {*} index
   * @param {Animated.Value} animatedRef
   */
  const handleRefs = (index, animatedRef) => {
    animatedRef.addListener(({value}) => {
      // console.log('value', value);
    });
    
    setItemRefs((old) => {
      old[index] = animatedRef;
      return old;
    });
  };
  const triggerRearrange = (index) =>
    setState((prev) => {
      return {
        ...prev,
        state: "active",
        activeIndex: index,
      };
    });

  return (
    <View style={styles.main} {...responder.panHandlers}>
      {data.map((item, index) => {
        return (
          <RearrangeableWrapper
            key={`rearrangeable_${name}_${index}`}
            index={index}
            onLayout={(ev) => layoutHandle(index, ev.nativeEvent.layout)}
            sendRef={handleRefs}
            triggerRearrange={triggerRearrange}
            reordering={
              state.state === "active"
                ? state.activeIndex === index
                  ? 2
                  : 1
                : 0
            }
          >
            {renderData(item)}
          </RearrangeableWrapper>
        );
      })}
    </View>
  );
}

function RearrangeableWrapper({
  sendRef,
  reordering,
  children,
  index,
  triggerRearrange,
  ...props
}) {
  const position = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    sendRef(index, position);
  }, []);

  useEffect(() => {
    console.log(reordering);
    reordering === 0 &&
      Animated.timing(rise, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
  }, [reordering]);

  const longPressHandle = () => {
    position.setOffset(position._value)
    triggerRearrange(index);
    Animated.timing(rise, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [
          { translateY: position },
          {
            scale: rise.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.05],
            }),
          },
        ],
        elevation: rise.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 5],
        }),
        overflow: "visible",
      }}
      {...props}
    >
      <Pressable onLongPress={longPressHandle} delayLongPress={180}>
        {children}
      </Pressable>
    </Animated.View>
  );
}