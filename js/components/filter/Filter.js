import { StyleSheet, Text, View } from "react-native";
import GeneralStyles from "../GeneralStyles";
import FilterItem from "./FilterItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 20
  },
  textTitle: {
    fontFamily: 'Rubik_600',
    color: 'black',
    marginBottom: 20
  },
  filterCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  preferences: {
    backgroundColor: '#EAEAEA'
  }
})

export default function Filter ({filters, title}) {

  return (
    <View style={styles.container}>
      <Text style={GeneralStyles.header}>{title}</Text>
      <View style={styles.filterCont}>
        {filters.map((filter) => <FilterItem key={filter.id} {...filter}/>)}
      </View>
      
      <View style={styles.preferences}></View>
    </View>
  )
}