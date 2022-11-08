import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GeneralStyles from "../GeneralStyles";
import CarouselItem from "./CarouselItem";

let BASE = {
  items: 4,
  size: 250,
  sizeStep: 20,
  elevation: 7,
  zIndex: 4,
  marginHorizontal: 20,
};

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "column",
    position: "relative",
  },
  title: {
    fontSize: 26,
    fontFamily: "Rubik_700",
  },
  carouselBody: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: BASE.size + 10,
    marginBottom: 10,
  },
});

const initialAnimation = { forward: [], reverse: [] };

export default function Carousel({ title, recipes }) {
  const [front, setFront] = useState(0);
  const [newAnimation, setNewAnimation] = useState(initialAnimation);
  const [animationState, setAnimationState] = useState("idle");
  const [panState, setPanState] = useState("idle");

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onPanResponderMove: (ev, gs) => {
          const triggerForward = gs.dx < -1 * (BASE.size / 2) || gs.vx < -1;

          const triggerReverse = gs.dx > BASE.size / 2 || gs.vx > 1;
          if (
            panState === "active" &&
            triggerForward &&
            animationState === "ready"
          ) {
            setPanState("triggered");
            setAnimationState("begin_forward");
          }
          if (
            panState === "active" &&
            triggerReverse &&
            animationState === "ready"
          ) {
            setPanState("triggered");

            setAnimationState("begin_reverse");
          }
        },
        onMoveShouldSetPanResponder: () => animationState !== "triggered",
        onPanResponderRelease: () => setPanState("idle"),
        onPanResponderGrant: () => setPanState("active"),
      }),
    [panState, animationState]
  );

  useEffect(() => {
    switch (animationState) {
      case "begin_forward":
        setAnimationState("moving_forward");
        Animated.parallel(newAnimation.forward).start((result) => {
          setAnimationState("stopping_forward");
          cycleFront();
        });

        break;
      case "begin_reverse":
        setAnimationState("moving_reverse");
        Animated.parallel(newAnimation.reverse).start((result) => {
          setAnimationState("stopping_reverse");
          cycleFront({ reverse: true });
        });
        break;
    }
  }, [animationState]);

  const itemStyles = useMemo(() => {
    const spacer =
      (Dimensions.get("window").width - BASE.marginHorizontal - BASE.size) /
      BASE.items;
    let _returnStyles = [
      {
        left: 0,
        size: BASE.size,
        elevation: BASE.elevation,
        zIndex: BASE.zIndex,
      },
    ];
    for (let i = 1; i < BASE.items; i++) {
      _returnStyles.push({
        left: BASE.size - (BASE.size - i * BASE.sizeStep) + i * spacer,
        size: BASE.size - BASE.sizeStep * i,
        elevation: BASE.elevation - i * 2,
        zIndex: BASE.zIndex - i,
      });
    }
    _returnStyles.push({
      ..._returnStyles[_returnStyles.length - 1],
      zIndex: 0,
    });
    return _returnStyles;
  }, [BASE.items]);

  /**
   *
   * @param {{reverse: boolean}} flags
   */
  const cycleFront = (flags) => {
    const _flags = {
      reverse: false,
      ...flags,
    };
    setNewAnimation(initialAnimation);
    if (!_flags.reverse) {
      if (front + 1 > recipes.length - 1) {
        setFront(0);
      } else {
        setFront(front + 1);
      }
      setAnimationState("done");
    } else {
      if (front - 1 < 0) {
        setFront(recipes.length - 1);
      } else {
        setFront(front - 1);
      }
      setAnimationState("done");
    }
  };
  const composeAnimations = (fw, rv) => {
    setNewAnimation((a) => {
      if (a.forward.length + 1 === recipes.length) {
        setAnimationState("ready");
      }
      return {
        ...a,
        forward: [...a.forward, fw],
        reverse: [...a.reverse, rv],
      };
    });
  };

  return (
    <View style={styles.main}>
      <Text style={GeneralStyles.header}>{title}</Text>
      {recipes ? (
        <View style={styles.carouselBody} {...panResponder.panHandlers}>
          {recipes.map((recipe, index) => {
            const _pos =
              index - front >= 0
                ? index - front
                : index - front + recipes.length;

            if (_pos >= 0 && itemStyles[_pos]) {
              return (
                <CarouselItem
                  key={`favorite-recipe_${recipe.id}`}
                  recipe={recipe}
                  index={index}
                  front={_pos === 0}
                  back={_pos === recipes.length - 1}
                  itemStyle={itemStyles[_pos]}
                  to={_pos !== 0 && itemStyles[_pos - 1]}
                  toReverse={
                    _pos !== recipes.length - 1 && itemStyles[_pos + 1]
                      ? itemStyles[_pos + 1]
                      : itemStyles[0]
                  }
                  compose={composeAnimations}
                />
              );
            } else return;
          })}
        </View>
      ) : (
        // IF NO RECIPES GIVEN
        <Text>No favorite recipes</Text>
      )}
    </View>
  );
}
