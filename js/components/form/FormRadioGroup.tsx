import { useState } from "react";
import { StyleSheet, View } from "react-native";
import FormRadio from "./FormRadio";

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    width: "100%",
  },
});

export type ActivitySetting<T> = {
  value: T;
  index: number;
};

type FormRadioGroupProps<T> = {
  items: T[];
  onActiveChange?: (value: ActivitySetting<T>) => void;
};

export function FormRadioGroup<T>({
  items,
  onActiveChange,
}: FormRadioGroupProps<T>) {
  const [active, setActive] = useState(null);

  const toggleHandle = (i: number) => {
    setActive(i);
    onActiveChange && onActiveChange({ value: items[i], index: i });
  };

  return (
    <View style={styles.main}>
      {items.map((item, index) => (
        <FormRadio
          active={active === index}
          label={item}
          index={index}
          toggleTrigger={toggleHandle}
          key={`radio_${index}`}
        />
      ))}
    </View>
  );
}
