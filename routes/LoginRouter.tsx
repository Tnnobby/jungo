import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../js/LoginPage/screens/LoginPage";
import LoginSplash from "../js/LoginPage/screens/LoginSplash";
import SignUpPage from "../js/LoginPage/screens/SignUpPage";
import UserInfoPage from "../js/LoginPage/screens/UserInfoPage";
import { Platform } from "react-native";
import useFirebase from "../js/hooks/useFirebase";
import { RootPageProps } from "./routes";
import { BedsheetProps } from "./AddRecipeRouter";
import { DatePicker } from "../js/components/bedsheets/DatePicker";
import { LoginProvider } from "../js/context-providers/LoginContextType";

export type LoginStack = {
  splash: undefined;
  "login-form": undefined;
  "signup-form": undefined;
  "signup-info": undefined;
  "date-bedsheet": BedsheetProps<Date>;
};

type LoginRouterProps = RootPageProps<"login">;

const Login = createNativeStackNavigator<LoginStack>();

export default function LoginRouter({ navigation, route }: LoginRouterProps) {
  const { user } = useFirebase();

  // useEffect(() => {
  //   // Redirects to home page as soon as user is verified
  //   if (user) navigation.reset({index: 0, routes: [{name: 'home'}]})
  // }, [user])

  return (
    <LoginProvider>
      <Login.Navigator
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === "ios" ? "simple_push" : "slide_from_right",
        }}
      >
        <Login.Screen name="splash" component={LoginSplash} />
        <Login.Screen name="login-form" component={LoginPage} />
        <Login.Screen name="signup-form" component={SignUpPage} />
        <Login.Screen name="signup-info" component={UserInfoPage} />
        <Login.Group
          screenOptions={{
            animation: "none",
            presentation: "transparentModal",
            headerShown: false,
          }}
        >
          <Login.Screen name="date-bedsheet" component={DatePicker} />
        </Login.Group>
      </Login.Navigator>
    </LoginProvider>
  );
}
