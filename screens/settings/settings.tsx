import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SmallHeader } from "../../js/components/header";
import NavigationPage from "../../js/components/NavigationPage";
import { SettingsLabel } from "../../js/components/SettingsLabel";
import { SettingsListButton } from "../../js/components/SettingsListButton";
import { SettingsLogoutButton } from "../../js/components/SettingsLogoutButton";
import { RootPageProps } from "../../routes/routes";

interface SettingsPageProps extends RootPageProps<"settings"> {}

export const SettingsPage: React.FC<SettingsPageProps> = ({ navigation }) => (
  <NavigationPage>
    <SmallHeader backButtonShown={true} headerText="Settings" />
    <ScrollView style={styles.container}>
      <Pressable style={{ flex: 1 }}>
        {/* Health and Diet */}
        <SettingsLabel>Health and Diet</SettingsLabel>
        <SettingsListButton title="Specific Diet" value="Keto" />
        <SettingsListButton title="Sex" value="Male" editType="multiplechoice" editData={['Male', 'Female', 'Prefer not to Say']}/>
        <SettingsListButton title="Weight" value="138.5 lbs." />

        {/* Goals */}
        <SettingsLabel>Goals</SettingsLabel>
        <SettingsListButton title="Weight Change by" value="-2 lbs./Week" />
        <SettingsListButton title="Activity Goals" value="4 times/Week" />
        <SettingsListButton title="Nutrition Goals" value="Calories/Macros" />

        {/* Connections */}
        <SettingsLabel>Connections</SettingsLabel>
        <SettingsListButton title="Grocery Store Service" value="Walmart" />
        <SettingsListButton title="Fitness App" value="Fitbit" />
        <SettingsListButton title="Apple Watch" value="Connected" />
        <SettingsListButton title="Facebook" value="Linked" />
        <SettingsListButton title="Phone Number" value="Not Linked" />
        <SettingsLogoutButton />
        <View style={{ height: 30 }} />
      </Pressable>
    </ScrollView>
  </NavigationPage>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 20,
    flex: 1,
  },
});
