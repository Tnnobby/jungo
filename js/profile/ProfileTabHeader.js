import { useState } from "react";
import { Text } from "react-native";
import TabHeader from "../components/tabbed/TabHeader";
import KitchenBody from "./KitchenBody";

export default function ProfileTabHeader(props) {
  const [activeTab, setActiveTab] = useState("kitchen");

  const tabPressHandle = (data) => setActiveTab(data);

  return (
    <TabHeader
      tabs={[
        {
          text: "Kitchen",
          icon: 'ChefHat',
          active: activeTab === "kitchen",
          id: "kitchen",
          props: {
            onPress: () => tabPressHandle("kitchen"),
          },
          element: <KitchenBody />,
        },
        {
          text: "Community",
          icon: 'People',
          active: activeTab === "community",
          id: "community",
          props: {
            onPress: () => tabPressHandle("community"),
          },
          element: <Text>In Progress</Text>,
        },
      ]}
      activeTab={activeTab}
    />
  );
}
