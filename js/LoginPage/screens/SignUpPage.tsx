import { LoginPageProps } from "../../../routes/LoginRouter";
import useAuth from "../../api/useAuth";
import { useAlert } from "../../hooks/useAlert";
import { useNavigation } from "../../hooks/useNavigation";
import LoginLayout from "./layout";

interface SignUpPageProps extends LoginPageProps<'signup-form'> {

}

export default function SignUpPage({ navigation, route, ...props }: SignUpPageProps) {
  const { newUser } = useAuth();
  const { toPage, openLoading, dismissLoading } = useNavigation();
  const alert = useAlert()

  const submitHandle = ({ username, password }) => {
    openLoading();
    newUser({ method: "email", email: username, password })
      .then((val) => {
        dismissLoading();
        console.log(val)
        toPage({
          toRoute: "login_userinfo",
          data: val.user.toJSON(),
        });
      })
      .catch((reason) => {
        dismissLoading();
        console.log(reason.code)
        switch(reason.code) {
          case 'auth/email-already-in-use':
            alert.error({
              key: reason.code,
              message: 'Email already in use'
            })
            break;
        }
      });
  };

  const backHandle = () => {
    navigation.navigate('splash')
  }

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
