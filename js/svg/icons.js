import AddCircleFilled from "./jsx/AddCircleFilled";
import Add from "./jsx/Add";
import ChefHat from "./jsx/ChefHat";
import Svg from "react-native-svg";
import People from "./jsx/IconPeople";
import NotificationBell from "./jsx/NotificationBell";

export default function SVGIcon ({ icon, ...props}) {

  const icons = {
    ChefHat: <ChefHat {...props} />,
    Add: <Add {...props} />,
    AddCircleFilled: <AddCircleFilled {...props} />,
    People: <People {...props} />,
    NotificationBell: <NotificationBell {...props} />
  }

  return icons[icon];
}

