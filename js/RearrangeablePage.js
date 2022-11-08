import { StyleSheet, Text, View } from "react-native";
// import DraggableFlatList from "react-native-draggable-flatlist";
import Rearrangeable from "./components/rearrangeable";

const DATA = ["Item 1", "Item 2"];

const styles = StyleSheet.create({
  itemMain: {
    paddingVertical: 12,
    backgroundColor: "gray",
    borderRadius: 6,
  },
  itemTxt: {
    fontSize: 16,
    marginLeft: 16,
    fontFamily: "Rubik_500",
  },
});

const RearrangeablePage = () => (
  <View>
    {/* <DraggableFlatList 
      data={DATA}
      renderItem={(data) => (
        <View style={styles.itemMain}>
          <Text style={styles.itemTxt}>{data}</Text>
        </View>
      )}
    /> */}
    <Rearrangeable
      name="testing"
      data={DATA}
      renderData={(data) => <View style={styles.itemMain}><Text style={styles.itemTxt}>{data}</Text></View>}
    />
  </View>
);

export default RearrangeablePage;
