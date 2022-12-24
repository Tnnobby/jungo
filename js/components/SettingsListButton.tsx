import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Pressable,
  PressableProps,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { RootStack, SettingsEditTypes } from "../../routes/RootRouter";
import { useAlert } from "../hooks/useAlert";
import BackChevron from "../svg/jsx/BackChevron";
import { SettingsListItem } from "./SettingsListItem";

interface SettingsButtonProps extends PressableProps {
  title: string;
  value: string;
  editType?: SettingsEditTypes;
  editData?: any;
}

export const SettingsListButton: React.FC<SettingsButtonProps> = ({
  title,
  value,
  editData,
  editType,
}) => {
  const navigation = useNavigation<NavigationProp<RootStack>>();
  const { error } = useAlert()

  const pressHandle = () => {
    if (editData && editType)
      navigation.navigate("settings-edit", { type: editType, data: editData, setting: title });
    else error({message: 'Unable to edit this Setting'})
  };

  return (
    <SettingsListItem style={styles.container} onPress={pressHandle}>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      <View style={styles.endGroup}>
        <Text style={[styles.text, styles.value]}>{value}</Text>
        <BackChevron
          style={{ transform: [{ rotate: "180deg" }], marginLeft: 10 }}
        />
      </View>
    </SettingsListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EAEAEA",
    marginBottom: 10,
  },
  text: {
    color: "#292929",
  },
  title: {
    fontFamily: "Rubik_400",
    fontSize: 18,
  },
  value: {
    fontFamily: "Rubik_300",
  },
  endGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
});
