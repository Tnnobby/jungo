import useAuth from "../../api/useAuth";
import LoginLayout from "./layout";
import { Keyboard } from "react-native";
import { useAlert } from "../../hooks/useAlert";
import useLoading from "../../hooks/useLoading";
import { LoginPageProps } from "../../../routes/routes";
import useFirebase from "../../api/useFirebase";

interface LoginMainPageProps extends LoginPageProps<"login-form"> {}
export default function LoginMainPage({ navigation }: LoginMainPageProps) {
  const { loginUser } = useAuth();
  const { user, actions } = useFirebase();
  const loading = useLoading();
  const { error } = useAlert();

  const onSubmit = ({ username, password }) => {
    loading.open();
    Keyboard.dismiss();
    loginUser({
      method: "email",
      email: username,
      password,
    })
      .then((val) => {
        // val && dispatch(setUserInfo(val));
        loading.close();
        const listener = actions.addListener("DONE_FETCHING", (success) => {
          if (!success) {
            console.log('Fetching Result:', success)
            console.log('User Has Doc:', user.hasDoc)
            listener.remove()
            navigation.navigate("signup-info");
            
          }
        });
      })
      .catch((e) => {
        switch (e.code) {
          case "auth/missing-email":
            error({ key: e.code, message: "No Email" });
            break;
          case "auth/invalid-email":
            error({ key: e.code, message: "Invalid Email" });
            break;
          case "auth/wrong-password":
            error({ key: e.code, message: "Incorrect Email or Password" });
            break;
          default:
            console.error(error);
            break;
        }
        loading.close();
      });
  };

  const closeHandle = () => {
    navigation.navigate("splash");
  };

  return (
    <LoginLayout
      login={true}
      welcomeMessage="It's nice to see you again."
      onSubmit={onSubmit}
      onClosePress={closeHandle}
    />
  );
}
