import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { Recipe } from "../js/api/firebase";
import SearchOverlay from "../js/components/hook-fullpage/SearchOverlay";
import FeedPage from "../js/Feed";
import useFirebase from "../js/api/useFirebase";
import Profile from "../js/profile";
import ViewRecipe from "../js/ViewRecipe";
import AddRecipeRouter from "./AddRecipeRouter";
import LoginRouter from "./LoginRouter";
import { SettingsPage } from "../screens/settings/settings";
import { SettingsEdit } from "../screens/settings/settings-edit";

export type SettingsEditTypes = "multiplechoice" | "date" | "number" | "text";

export type RootStack = {
  login: undefined;
  home: undefined;
  profile: { uid?: string };
  search: undefined;
  "view-recipe": { data: Recipe };
  "add-recipe": undefined;
  settings: undefined;
  "settings-edit": { type: SettingsEditTypes; data: any; setting: string };
};

const Stack = createNativeStackNavigator<RootStack>();

export default function NavigationRouter() {
  const { user } = useFirebase();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === "ios" ? "simple_push" : "slide_from_right",
        }}
        initialRouteName="login"
      >
        {!user?.hasDoc ? (
          <Stack.Screen name="login" component={LoginRouter} />
        ) : (
          <>
            <Stack.Screen name="home" component={FeedPage} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="add-recipe" component={AddRecipeRouter} />
            <Stack.Screen name="settings" component={SettingsPage} />
            <Stack.Group
              screenOptions={{
                presentation: "fullScreenModal",
                gestureEnabled: true,
                gestureDirection: "vertical",
              }}
            >
              <Stack.Screen name="search" component={SearchOverlay} />
              <Stack.Screen name="view-recipe" component={ViewRecipe} />
              <Stack.Screen name="settings-edit" component={SettingsEdit} />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
