import { LinearGradient } from "expo-linear-gradient"
import { useRef, useState } from "react"
import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native"

const BASE = {
  height: 250,
  width: 250,
  elevation: 4,
  zIndex: 4,
  marginLeft: 20,
  spacer: (Dimensions.get('window').width - 40 - 250) / 3
}

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'column',

  },
  title: {
    fontSize: 26,
    fontFamily: 'Rubik_700'
  },
  carouselBody: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: BASE.height + 20
  },
  recipeBody: {
    borderRadius: 20,
  },
  recipeImage: {
    borderRadius: 20,
  },
  titleContainer: {
    position: "absolute",
    height: 40,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignContent: "center"
  },
  recipeTitleText: {
    fontSize: 18,
    lineHeight: 30,
    opacity: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Rubik_600'
  }
})


export default function RecipeCarousel (props) {
  const [front, setFront] = useState(0);
  const topCardSlide = useRef(new Animated.Value(0)).current;

  const recipePressHandle = (id) => {
    Animated.timing(topCardSlide, {
      toValue: BASE.width * 2,
      duration: 1000
    }).start();
  }

  return (
    <View style={styles.main}>
      <Text style={styles.title}>
        {props.title}
      </Text>
        {props.recipes ? 
          <Pressable
          style={styles.carouselBody}
          >
          {props.recipes.map((recipe, index) => {
            if (index > front + 3) return
            const frontStyle = {
              ...styles.recipeBody,
              left: topCardSlide,
              position: 'relative',
              elevation: BASE.elevation,
              zIndex: BASE.zIndex
            }
            const backStyle = {
              ...styles.recipeBody,
              position: 'absolute',
              elevation: BASE.elevation - index * 2,
              zIndex: BASE.zIndex - index * 1,
              left: BASE.width - (BASE.width - index * 20) + (index * BASE.spacer)
            }
            const imageStyle = {
              ...styles.recipeImage,
              height: BASE.height - index * 20,
              width: BASE.width - index * 20,
            }

            return (
              <Animated.View
                key={`favorite-recipe_${index}`}
                style={front === index ? frontStyle : backStyle}
              >
                <Pressable
                  onPress={() => recipePressHandle(recipe.id)}
                >
                  <View style={{position: 'relative'}}>
                    <Image
                      style={imageStyle}
                      source={{uri:recipe.image_uri}}
                    />
                    {front === index && <LinearGradient
                      style={styles.titleContainer}
                      colors={['rgba(191, 191, 191, 0.00)', 'rgba(67, 67, 67, 0.50)', 'rgba(0, 0, 0, 0.50)']}
                      locations={[0.1, 0.5, 1]}
                      start={{x: 0.5, y: 0}}
                      end={{x: 0.5, y: 1}}
                    >
                      <Text style={styles.recipeTitleText}>
                        {recipe.title}
                      </Text>
                    </LinearGradient>}
                  </View>
                </Pressable>
              </Animated.View>
              
            )
            
          })}
          </Pressable>
        : // IF NO RECIPES GIVEN
          <Text>
            No favorite recipes
          </Text>
        }
    </View>
  )
}