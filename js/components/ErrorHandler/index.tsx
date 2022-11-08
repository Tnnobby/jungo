import { useCallback, useState, createContext, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Error } from "./Error";
import { ErrorContextProps, ErrorLevel, ErrorTemplate } from "./types";

interface ErrorHandlerProps {
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    zIndex: 100,
  },
  messageContainer: {
    position: "relative",
    height: "100%",
    width: Dimensions.get("window").width,
  },
});

const TEST_ERRORS: ErrorTemplate[] = [
  {
    key: "error/email-already-in-use",
    level: "error",
    message: "Email Already In Use",
  },
];

const ErrorContext = createContext<ErrorContextProps>({ alert: () => {} });

const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  children,
  ...props
}: ErrorHandlerProps) => {
  const [errors, setErrors] = useState<ErrorTemplate[]>([]);

  const pop = (key: number) => {
    setErrors((prev) => {
      return prev.filter((val, index) => index !== key)
    })
  }
  const renderErrorMessages = useCallback(() => {
    let keys = {};
    return errors.map((val, index, array) => {
      console.log(val)
      return (
        <Error
          level={val.level}
          message={val.message}
          key={`${val.key}_${index}`}
          shouldClose={index > 0}
          onClose={() => pop(index)}
          // index={keys.includes(val.key) ? `${val.key}_1` : val.key}
        />
      );
    })
  }, [errors]);

  const alert = (error: ErrorTemplate) => {
    setErrors((prev) => {
      return [...prev, error]
    })
  };

  return (
    <ErrorContext.Provider value={{ alert }}>
      {children}
      <View style={styles.main} pointerEvents="box-none">
        {renderErrorMessages()}
      </View>
    </ErrorContext.Provider>
  );
};

export {
  ErrorContext,
  ErrorHandler
}
