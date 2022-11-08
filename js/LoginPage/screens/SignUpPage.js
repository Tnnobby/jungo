import useAuth from "../../api/useAuth";
import { useAlert } from "../../hooks/useAlert";
import { useNavigation } from "../../hooks/useNavigation";
import LoginLayout from "./layout";

export default function SignUpPage({ ...props }) {
  const { newUser } = useAuth();
  const { toPage, openLoading, dismissLoading } = useNavigation();
  const alert = useAlert()

  const submitHandle = ({ email, password }) => {
    openLoading();
    newUser({ method: "email", email, password })
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

  return (
    <LoginLayout
      login={false}
      welcomeMessage="Welcome, let's get started."
      onSubmit={submitHandle}
      {...props}
    />
  );
}
