import { PressableProps, StyleSheet, Text } from "react-native";
import useFirebase from "../api/useFirebase";
import { SettingsListItem } from "./SettingsListItem";

interface SettingsLogOutProps extends PressableProps {}

export const SettingsLogoutButton: React.FC<SettingsLogOutProps> = ({
  children,
  ...props
}) => {
  const { actions } = useFirebase();

  const logoutHandle = () => actions.logout();

  return (
    <SettingsListItem style={styles.container} onPress={logoutHandle}>
      <Text style={styles.label}>Logout</Text>
    </SettingsListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CD4949",
  },
  label: {
    fontSize: 18,
    fontFamily: "Rubik_400",
    color: "white",
  },
});
