import { LoginPageProps } from "../../../routes/routes";
import useAuth from "../../api/useAuth";
import { useAlert } from "../../hooks/useAlert";
import useLoading from "../../hooks/useLoading";
import LoginLayout from "./layout";

interface SignUpPageProps extends LoginPageProps<"signup-form"> {}

export default function SignUpPage({
  navigation,
  route,
  ...props
}: SignUpPageProps) {
  const { newUser } = useAuth();
  const { open, close } = useLoading();
  const alert = useAlert();

  const submitHandle = ({ username, password }) => {
    open();
    newUser({ method: "email", email: username, password })
      .then((val) => {
        close();
        navigation.navigate("signup-info");
      })
      .catch((reason) => {
        close();
        console.log(reason.code);
        switch (reason.code) {
          case "auth/email-already-in-use":
            alert.error({
              key: reason.code,
              message: "Email already in use",
            });
            break;
        }
      });
  };

  const backHandle = () => {
    navigation.navigate("splash");
  };

  return (
    <LoginLayout
      login={false}
      welcomeMessage="Welcome, let's get started."
      onSubmit={submitHandle}
      onError={() => null}
      onClosePress={backHandle}
      {...props}
    />
  );
}
