import * as Font from 'expo-font'
import { useState } from 'react';

export default function useFonts () {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const loadFonts = async () => {
    //console.log('NotoSans Loaded: ', Font.isLoaded('Rubik_400'));
    await Font.loadAsync({
      Rubik_300: require('../../assets/fonts/Rubik/Rubik-Light.ttf'),
      Rubik_300Italic: require('../../assets/fonts/Rubik/Rubik-LightItalic.ttf'),
      Rubik_400: require('../../assets/fonts/Rubik/Rubik-Regular.ttf'),
      Rubik_500: require('../../assets/fonts/Rubik/Rubik-Medium.ttf'),
      Rubik_500Italic: require('../../assets/fonts/Rubik/Rubik-MediumItalic.ttf'),
      Rubik_600: require('../../assets/fonts/Rubik/Rubik-SemiBold.ttf'),
      Rubik_600Italic: require('../../assets/fonts/Rubik/Rubik-SemiBoldItalic.ttf'),
      Rubik_700: {uri: require('../../assets/fonts/Rubik/Rubik-Bold.ttf')},
      Rubik_700Italic: require('../../assets/fonts/Rubik/Rubik-BoldItalic.ttf'),
      Rubik_800: require('../../assets/fonts/Rubik/Rubik-ExtraBold.ttf'),
      Rubik_800Italic: require('../../assets/fonts/Rubik/Rubik-ExtraBoldItalic.ttf'),
      Rubik_900: require('../../assets/fonts/Rubik/Rubik-Black.ttf'),
      Rubik_900Italic: require('../../assets/fonts/Rubik/Rubik-BlackItalic.ttf')
    });
    setFontsLoaded(true);
  }
  //console.log('NotoSans Loaded: ', Font.isLoaded('Fake'));
  loadFonts();

  return fontsLoaded;
}