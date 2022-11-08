import { View, StyleSheet, Text, Animated } from "react-native";
import NotificationBell from "../../svg/jsx/NotificationBell";
import SearchIcon from "../../svg/jsx/Search";
import { CircleButton } from "../buttons";
import ProfilePic from "../ProfilePic";

const styles = StyleSheet.create({
  main: {
    height: 70,
    flexDirection: "row",
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderColor: 'transparent'
  },
  searchCont: {
    height: 21,
    width: 21,
  },
  notificationCont: {
    height: 20,
    width: 20,
  },
  endGroup: {
    flexDirection: "row",
    backgroundColor: 'white'
  },
  frontGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'white'
  },
  headerText: {
    fontFamily: "Rubik_500",
    fontSize: 34,
    paddingLeft: 10,
  },
});

export default function LargeHeader({
  style,
  headerText,
  profilePic,
  searchButton,
  onSearchPress = () => {},
  onNotificationPress = () => {},
  notificationButton,
  ...props
}) {
  return (
    <Animated.View style={[style, styles.main]}>
      <View style={styles.frontGroup}>
        {profilePic && <ProfilePic />}
        {headerText && <Text style={styles.headerText}>{headerText}</Text>}
      </View>
      <View style={styles.endGroup}>
        {notificationButton && (
          <CircleButton
            icon={
              <View style={styles.notificationCont}>
                <NotificationBell fill="black" />
              </View>
            }
            onPress={onNotificationPress}
          />
        )}
        {searchButton && (
          <CircleButton
            style={{ marginLeft: 10 }}
            icon={
              <View style={styles.searchCont}>
                <SearchIcon />
              </View>
            }
            onPress={onSearchPress}
          />
        )}
      </View>
    </Animated.View>
  );
}
