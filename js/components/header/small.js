import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import BackChevron from "../../svg/jsx/BackChevron";
import CloseX from "../../svg/jsx/CloseX";
import { useDispatch } from "react-redux";
import { backPage } from "../../../redux/reducers/navigationReducer";
import { useNavigation } from "../../hooks/useNavigation";

const styles = StyleSheet.create({
  navMain: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 5, // Experimental
    backgroundColor: "white",
    justifyContent: "space-between",
    backgroundColor: 'white',
    zIndex: 10
  },
  backText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "Rubik_500",
    marginLeft: 6,
  },
  backIcon: {
    height: 40,
    width: 30,
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'red',
    padding: 4
  },
  closeContainer: {
    height: 21,
    width: 21,
    marginRight: 5
  },
  closePressable: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerTextContainer: {},
  headerText: {
    fontSize: 20,
    fontFamily: "Rubik_600",
  },
  piece: {
    flex: 1,
    flexDirection: "row",
  },
});

export default function SmallHeader({
  backButton = true,
  backText = 'Back',
  closeButton = false,
  headerText = null,
  onBackPress,
  onClosePress,
  ...props
}) {
  const { lastPage } = useNavigation()

  const closeButtonHandle = () => lastPage()

  return (
    <View
      style={{
        ...styles.navMain,
        width: Dimensions.get("window").width,
      }}
      {...props}
    >
      <View style={{ ...styles.piece, justifyContent: "flex-start" }}>
        {backButton && (
          <Pressable 
            style={styles.backContainer}
            onPress={onBackPress}
          >
            <BackChevron />
            <Text style={styles.backText}>{backText}</Text>
          </Pressable>
        )}
      </View>

      <View style={{ ...styles.piece, justifyContent: "center", flex: 2 }}>
        {headerText && (
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{headerText}</Text>
          </View>
        )}
      </View>

      <View style={{ ...styles.piece, justifyContent: "flex-end" }}>
        {closeButton && (
          <Pressable onPress={onClosePress ? onClosePress : closeButtonHandle} style={styles.closePressable}>
            <View style={styles.closeContainer}>
              <CloseX />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
}
