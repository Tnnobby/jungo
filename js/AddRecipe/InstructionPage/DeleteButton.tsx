import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  Pressable,
  StyleSheet,
  PressableProps
} from "react-native";
import DeleteIcon from "../../svg/jsx/DeleteIcon";

export interface DeleteButtonProps extends PressableProps {

}

export const DeleteButton = (props: DeleteButtonProps) => (
  <LinearGradient
    colors={["#EDEDED", "#FFFFFF"]}
    start={{ x: 1, y: 0.5 }}
    end={{ x: 0.7, y: 0.5 }}
    style={styles.backdrop}
  >
    <Pressable
      style={[
        styles.deletePressable,
      ]}
      {...props}
    >
      <DeleteIcon />
      <Text style={styles.deleteText}>Delete</Text>
    </Pressable>
  </LinearGradient>
);

const styles = StyleSheet.create({
  // Delete Styles
  backdrop: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    height: '100%',
    justifyContent: "flex-end",
    zIndex: 4,
    borderRadius: 5,
    width: '100%'
  },
  deletePressable: {
    paddingVertical: 2,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
  },
  deleteText: {
    color: "#EF3232",
    fontFamily: "Rubik_400",
    zIndex: 1,
    marginLeft: 3,
  },
})
