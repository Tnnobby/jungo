import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "../../hooks/useNavigation";

const styles = StyleSheet.create({
  recipeImage: {
    borderRadius: 25,
    height: "100%",
    width: "100%",
  },
  itemMixin: {
    borderRadius: 25,
    position: "absolute",
  },
  titleContainer: {
    position: "absolute",
    height: 40,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignContent: "center",
  },
  recipeTitleText: {
    fontSize: 20,
    lineHeight: 30,
    opacity: 1,
    marginLeft: 10,
    color: "white",
    fontFamily: "Rubik_600",
  },
});

export default function CarouselItem({
  front,
  recipe,
  itemStyle,
  to,
  toReverse,
  compose,
  back,
}) {
  const size = useRef(new Animated.Value(itemStyle.size)).current,
    left = useRef(new Animated.Value(itemStyle.left)).current,
    zIndex = useRef(new Animated.Value(itemStyle.zIndex)).current;
  const { lastPage, toPage } = useNavigation();

  const pressHandle = () => {
    toPage({
      
    })
  };
  useEffect(() => {
    const fw = front
      ? Animated.sequence([
          // If front card
          Animated.timing(left, {
            toValue: -1 * itemStyle.size,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.parallel([
            Animated.timing(left, {
              toValue: 0,
              duration: 150,
              useNativeDriver: false,
            }),
            Animated.timing(size, {
              toValue: 100,
              duration: 150,
              useNativeDriver: false,
            }),
            Animated.timing(zIndex, {
              toValue: 0,
              duration: 150,
              useNativeDriver: false,
            }),
          ]),
        ])
      : Animated.parallel([
          // If not front card
          Animated.timing(size, {
            toValue: to.size,
            duration: 350,
            useNativeDriver: false,
          }),
          Animated.timing(left, {
            toValue: to.left,
            duration: 350,
            useNativeDriver: false,
          }),
          Animated.timing(zIndex, {
            toValue: to.zIndex,
            duration: 350,
            useNativeDriver: false,
          }),
        ]);

    const rv = back
      ? Animated.sequence([
          Animated.parallel([
            Animated.timing(left, {
              toValue: -175,
              duration: 150,
              useNativeDriver: false,
            }),
            Animated.timing(zIndex, {
              toValue: toReverse.zIndex,
              duration: 150,
              useNativeDriver: false,
            }),
          ]),
          Animated.parallel([
            Animated.timing(left, {
              toValue: toReverse.left,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(size, {
              toValue: toReverse.size,
              duration: 200,
              useNativeDriver: false,
            }),
          ]),
        ])
      : Animated.parallel([
          Animated.timing(size, {
            toValue: toReverse.size,
            duration: 350,
            useNativeDriver: false,
          }),
          Animated.timing(left, {
            toValue: toReverse.left,
            duration: 350,
            useNativeDriver: false,
          }),
          Animated.timing(zIndex, {
            toValue: toReverse.zIndex,
            duration: 350,
            useNativeDriver: false,
          }),
        ]);
    compose(fw, rv);
  }, [to]);

  return (
    <Animated.View
      style={{
        ...styles.itemMixin,
        height: size,
        width: size,
        zIndex,
        left,
      }}
    >
      <Pressable style={{ position: "relative" }} onPress={pressHandle}>
        <Image style={styles.recipeImage} source={{ uri: recipe.image_uri }} />
        {
          <LinearGradient
            style={styles.titleContainer}
            colors={[
              "rgba(191, 191, 191, 0.00)",
              "rgba(67, 67, 67, 0.50)",
              "rgba(0, 0, 0, 0.50)",
            ]}
            locations={[0.1, 0.5, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <Text style={styles.recipeTitleText}>{recipe.title}</Text>
          </LinearGradient>
        }
      </Pressable>
    </Animated.View>
  );
}
