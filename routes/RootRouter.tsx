import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Recipe } from "../js/api/firebase";
import { ErrorHandler } from "../js/components/error-handler";
import SearchOverlay from "../js/components/hook-fullpage/SearchOverlay";
import LoadingHandler from "../js/components/Loading/LoadingHandler";
import FeedPage from "../js/Feed";
import Profile from "../js/profile";
import ViewRecipe from "../js/ViewRecipe";
import AddRecipeRouter from "./AddRecipeRouter";
import LoginRouter from "./LoginRouter";

export type RootStack = {
  login: undefined;
  home: undefined;
  profile: undefined;
  search: undefined;
  "view-recipe": { data: Recipe };
  "add-recipe": undefined;
};

const Stack = createNativeStackNavigator<RootStack>();

export default function NavigationRouter() {
  const unhandledHandle = (err) => {
    console.log("Unhandled Route:", err);
  };

  return (
    <ErrorHandler>
      <LoadingHandler>
        <SafeAreaProvider onLayout={(ev) => console.log('SafeAreaProvider:', ev.nativeEvent.layout)}>
          <NavigationContainer onUnhandledAction={unhandledHandle}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation:
                  Platform.OS === "ios" ? "simple_push" : "slide_from_right",
              }}
              initialRouteName="login"
            >
              <Stack.Screen name="login" component={LoginRouter} />
              <Stack.Screen name="home" component={FeedPage} />
              <Stack.Screen name="profile" component={Profile} />
              <Stack.Screen name="add-recipe" component={AddRecipeRouter} />
              <Stack.Group
                screenOptions={{
                  presentation: "fullScreenModal",
                  animation: "slide_from_bottom",
                  animationDuration: 150,
                  gestureEnabled: true,
                  gestureDirection: "vertical",
                }}
              >
                <Stack.Screen name="search" component={SearchOverlay} />
                <Stack.Screen name="view-recipe" component={ViewRecipe} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </LoadingHandler>
    </ErrorHandler>
  );
}
