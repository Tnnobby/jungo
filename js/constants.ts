import { Platform, StyleSheet } from "react-native";

const colors = {
  primary_color: "#498CF7",
  active_color: "#407ad6",
  button_color: "#009DFF",
};

const shadows = StyleSheet.create({
  elevation0:
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,

          elevation: 1,
        }
      : {
          elevation: 0,
        },
  elevation1:
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
        }
      : {
          elevation: 1,
        },
  elevation2:
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        }
      : {
          elevation: 2,
        },
  elevation3:
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
        }
      : {
          elevation: 3,
        },
  elevation4:
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
        }
      : {
          elevation: 4,
        },
  elevation5:
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }
      : {
          elevation: 5,
        },
});

export { colors, shadows };
