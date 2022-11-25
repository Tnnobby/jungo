import { ErrorHandler } from "./js/components/ErrorHandler";
import FirebaseWrapper from "./js/context-providers/FirebaseProvider";

const withWrappers = (WrappedComponent) => {
  

  return (props) => {
    return (
      <FirebaseWrapper>
        <ErrorHandler>
          <WrappedComponent {...props} />
        </ErrorHandler>
      </FirebaseWrapper>
    );
  };
};
