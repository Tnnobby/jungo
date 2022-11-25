import { SafeAreaView } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import useReorderableManager from "./useReorderableManager";
import ReorderableItem from "./reorderable-item";
import { useEffect } from "react";

export type ItemBase = {
  id: string;
  [key: string]: any;
};

export type ReordererRender<Item> = (info: {
  item: Readonly<Item>;
}) => React.ReactNode;

export interface ReorderableProps<Item extends ItemBase> extends SafeAreaViewProps {
  data: Item[];
  renderItems: ReordererRender<Item>;
  onChange?: (value: any[]) => void;
}

export default function Reorderable<T extends ItemBase>({
  style,
  data,
  renderItems,
  onChange
}: ReorderableProps<T>) {
  const manager = useReorderableManager(data);

  // TODO Add support for onReorder and onChange seperately
  useEffect(() => {
    if (manager.elements && onChange) onChange(manager.elements)
  }, [manager.elements])

  return (
    <SafeAreaView style={style}>
      <Animated.View>
        {manager.elements &&
          manager.elements.map(({ id, val }, index) => {
            console.log(id)
            return (
              <ReorderableItem key={id} id={id} manager={manager}>
                {renderItems({ item: val })}
              </ReorderableItem>
            );
          })}
      </Animated.View>
    </SafeAreaView>
  );
}
