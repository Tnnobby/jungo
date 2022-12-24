import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ActivitySetting } from "../components/form/FormRadioGroup";
import { JungoUser } from "./FirebaseProvider";
import useFirebase from "../api/useFirebase";

type LoginContextValue = {
  user: JungoUser;
  birthday: Date | null;
  firstName: string;
  lastName: string;
  activitySetting: ActivitySetting<string>;
  username: string;
  invalidFields: string[];
  setBirthday: (birthday: Date | null) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setActivitySetting: (activitySetting: ActivitySetting<string>) => void;
  setUsername: (username: string) => void;
  addInvalidFields: (fields: string[] | string) => void;
};

// Create a context for the data
const LoginContext = React.createContext<LoginContextValue>({
  user: null,
  birthday: null,
  firstName: "",
  lastName: "",
  activitySetting: {index: null, value: ''},
  username: "",
  invalidFields: [],
  setBirthday: () => {},
  setFirstName: () => {},
  setLastName: () => {},
  setActivitySetting: () => {},
  setUsername: () => {},
  addInvalidFields: () => {},
});

type LoginProviderProps = {
  children: ReactNode;
};

// Create a provider for the context
const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  // Use state to store the data
  const { user } = useFirebase()
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [activitySetting, setActivitySetting] = useState({index: null, value: ''});
  const [username, setUsername] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const checkFields = () => {
    const invalidFields = [];

    if (!birthday) {
      invalidFields.push("birthday");
    }
    if (!firstName) {
      invalidFields.push("firstName");
    }
    if (!lastName) {
      invalidFields.push("lastName");
    }
    if (!username) {
      invalidFields.push("username");
    }
    if (!activitySetting) {
      invalidFields.push("activitySetting");
    }

    setInvalidFields(invalidFields);
  };

  useEffect(() => {
    checkFields();
  }, [username, firstName, lastName, birthday, activitySetting]);

  const addInvalidFields = (fields: string[] | string) => {
    if (typeof fields === "string")
      setInvalidFields([...invalidFields, fields]);
    else setInvalidFields([...invalidFields, ...fields]);
  };

  return (
    // Provide the data and setter functions to the context consumers
    <LoginContext.Provider
      value={{
        user,
        birthday,
        firstName,
        lastName,
        activitySetting,
        username,
        invalidFields,
        setBirthday,
        setFirstName,
        setLastName,
        setActivitySetting,
        setUsername,
        addInvalidFields,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => {
  // Use the useContext hook to access the context
  const contextValue = useContext(LoginContext);

  // Return the context value
  return contextValue;
};

export { LoginProvider, LoginContext, useLoginContext };
