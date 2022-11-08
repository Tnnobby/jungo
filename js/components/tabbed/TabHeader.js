import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import constants from "../../constants";
import SVGIcon from "../../svg/icons";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  tab: {
    paddingBottom: 6,
    paddingHorizontal: 5,
    flexDirection: 'row'
  },
  activeTab: {
    borderBottomColor: constants.primary_color,
    borderBottomWidth: 3
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Rubik_700'
  },
  iconCont: {
    marginRight: 6,
    height: 18,
    width: 18
  }
})

export default function TabHeader (props) {
  const [activeTab, setActiveTab] = useState(props.active)

  useEffect(() => {
    setActiveTab(props.activeTab);
  }, [props.activeTab])

  const layoutHandle = (e) => {
    //console.log(e);
  }

  return (
    <View style={styles.container}>
      {props.tabs.map((tab, index) => {
        return (
          <Pressable 
          style={activeTab === tab.id ? {...styles.tab, ...styles.activeTab} : styles.tab}
          {...tab.props}
          onLayout={layoutHandle}
          key={`tab_${index}`}
          >
            {tab.icon && <View style={styles.iconCont}>
              <SVGIcon icon={tab.icon} fill={activeTab === tab.id ? constants.primary_color : '#939393'} />
            </View>}
            <Text 
            style={{
              ...styles.tabText,
              color: activeTab === tab.id ? constants.primary_color : '#939393'
            }} 
            >
              {tab.text}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}