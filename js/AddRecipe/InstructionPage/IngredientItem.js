import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DeleteIcon from "../../svg/jsx/DeleteIcon";

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    marginVertical: 1,
  },
  row: {
    flexDirection: "row",
    marginHorizontal: 5,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 5,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 5,
  },
  // ingredientText: {
  //   fontSize: 18,
  //   fontFamily: "Rubik_500",
  // },
  deleteText: {
    color: "#EF3232",
    fontFamily: "Rubik_400",
    zIndex: 1,
    marginLeft: 3,
  },
  backdrop: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    zIndex: 4,
    borderRadius: 5,
  },
  deletePressable: {
    paddingVertical: 2,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
  },
  input: {
    color: "black",
    fontFamily: "Rubik_500",
    fontSize: 18,
    lineHeight: 20,
    // backgroundColor: 'red',
    width: "100%",
    height: 28,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  focus: {
    borderBottomColor: "#383838",
    borderBottomWidth: 1,
    marginVertical: 3,
  },
  pressableInput: {
    // backgroundColor: 'red',
    width: "100%",
  },
  placeholder: {
    height: 35,
    width: "100%",
    backgroundColor: "red",
    zIndex: 1,
  },
});

/**
 *
 * @param {{ newIngredient: boolean }} param0
 * @returns
 */
export default function IngredientItem({
  deleteIngredient,
  updateIngredient,
  addIngredient,
  cancelAdd,
  newIngredient,
  ingredient,
  index,
  offsetPage,
  resetPage,
  reordering,
  setReordering,
  ...props
}) {
  const offset = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [isEditing, setIsEditing] = useState(newIngredient ? true : false);
  const [deletePressing, setDeletePressing] = useState(false);
  const [value, setValue] = useState(ingredient);
  const [yPosition, setYPosition] = useState(null);
  const valueRef = useRef(ingredient);
  const inputRef = useRef();

  console.log(reordering);

  const ingredientPan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (ev, gs) =>
        Math.abs(gs.dx) > 20 || Math.abs(gs.dy) > 20,
      onPanResponderGrant: (ev, gs) => console.log("Granting"),
      onPanResponderMove: Animated.event(
        [null, { dx: offset.x, dy: offset.y }],
        {
          useNativeDriver: false,
        }
      ),
      onPanResponderRelease: (ev, gs) => {
        if (gs.dx <= -60 || gs.vx < -0.5) {
          toLeft();
        } else {
          toInitial();
        }
      },
      // onPanResponderTerminationRequest: () => false,
    })
  ).current;

  /**
   *
   * @param {*} callback
   * @param {{fast: boolean}} flags
   */
  const toLeft = (callback = () => {}, flags = {}) => {
    const defaultFlags = {
      fast: false,
    };
    flags = {
      ...defaultFlags,
      ...flags,
    };

    Animated.spring(offset, {
      toValue: { x: -100, y: 0 },
      useNativeDriver: true,
    }).start(callback);
  };

  /**
   *
   * @param {*} callback
   * @param {{fast: boolean}} flags
   */
  const toInitial = (callback = () => {}, flags = {}) => {
    const defaultFlags = {
      fast: false,
    };
    flags = {
      ...defaultFlags,
      ...flags,
    };
    if (flags.fast) {
      Animated.timing(offset, {
        toValue: { x: 0, y: 0 },
        duration: 200,
        useNativeDriver: true,
      }).start(callback);
    } else {
      Animated.spring(offset, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start(callback);
    }
  };

  useEffect(() => {
    if (isEditing) {
      toInitial(() => inputRef.current.focus(), { fast: true });
      const _openListener = Keyboard.addListener("keyboardDidShow", () => {});

      const _closeListener = Keyboard.addListener("keyboardDidHide", () => {
        console.log(valueRef.current);
        setIsEditing(false);
        if (newIngredient) {
          if (valueRef.current) addIngredient(index, valueRef.current);
          else cancelAdd();
        } else {
          if (valueRef.current) updateIngredient(index, valueRef.current);
        }

        _closeListener.remove();
      });
      return () => {
        if (newIngredient) cancelAdd();
        _closeListener.remove();
      };
    }
  }, [isEditing]);

  const deleteHandles = {
    onPressIn: () => setDeletePressing(true),
    onPressOut: () => setDeletePressing(false),
    onPress: () => deleteIngredient(index),
  };

  const inputChangeHandle = (val) => {
    setValue(() => {
      valueRef.current = val;
      return val;
    });
  };
  const editTrigger = () => setIsEditing(true);

  const inputFocusHandle = () => setIsEditing(true);
  const layoutHandle = (e) => {
    console.log(e.nativeEvent.layout);
  };
  const longPressHandle = (e) => {
    if (!reordering) setReordering(true);
  };

  // todo: Fine tune animations for everything here
  return (
    <>
      <Animated.View
        style={{
          ...styles.main,
          transform: [{ translateY: reordering ? offset.y : 0 }],
        }}
        onLayout={layoutHandle}
      >
        <Animated.View
          style={{
            ...styles.row,
            transform: [{ translateX: !reordering ? offset.x : 0 }],
            paddingVertical: isEditing ? 3 : 6,
          }}
          {...ingredientPan.panHandlers}
        >
          <Pressable
            style={styles.pressableInput}
            onPress={editTrigger}
            onLongPress={longPressHandle}
          >
            <TextInput
              style={
                isEditing ? { ...styles.input, ...styles.focus } : styles.input
              }
              ref={inputRef}
              selectionColor="black"
              defaultValue={value}
              editable={isEditing}
              onChangeText={inputChangeHandle}
              onFocus={inputFocusHandle}
            />
          </Pressable>

          {/* {isEditing ? (
            <TextInput
              style={styles.input}
              ref={inputRef}
              selectionColor="black"
              onChangeText={inputChangeHandle}
            />
          ) : (
            <Text style={styles.ingredientText}>{value}</Text>
          )} */}
        </Animated.View>
        <LinearGradient
          colors={["#EDEDED", "#FFFFFF"]}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0.7, y: 0.5 }}
          style={styles.backdrop}
        >
          <Pressable
            style={{
              ...styles.deletePressable,
            }}
            {...deleteHandles}
          >
            <DeleteIcon />
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </LinearGradient>
      </Animated.View>
      {/* {reordering && <View style={styles.placeholder}></View>} */}
    </>
  );
}
