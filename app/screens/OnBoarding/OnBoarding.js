import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';

// constants
import {
  images,
  theme
} from "../../constants";

const {
  onboarding1,
  onboarding2,
  onboarding3
} = images;

// theme
const {
  COLORS,
  FONTS,
  SIZES
} = theme;

const onBoardings = [{
  title: "Let's Travelling",
  description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
  img: onboarding1
},
  {
    title: "Navigation",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding2
  },
  {
    title: "Destination",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding3
  }];

const OnBoarding = () => {
  const [completed,
    setCompleted] = React.useState(false);
  const scrollX = new Animated.Value(0);
  React.useEffect(() => {
    scrollX.addListener(({
      value
    }) => {
      //console.log(Math.floor(value / SIZES.width +1))
      if (Math.floor(value / SIZES.width+1) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  renderContent = () => {
    return(
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } },
        ],
          { useNativeDriver: false })}
        >
        {onBoardings.map((item, index) => (
          <View key={index} style={ { width: SIZES.width }}>
            <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={item.img} resizeMode="cover" style={ { width: "100%", height: "100%" }} />
            </View>
            <View style={ { position: 'absolute', bottom: '10%', left: 40, right: 40 }}>
              <Text style={ {
            ...FONTS.h1,
            color: COLORS.gray,
            textAlign: 'center'
          }}>
                {item.title}
              </Text>
              <Text style={ {
            ...FONTS.body3,
            color: COLORS.gray,
            textAlign: 'center',
            marginTop: SIZES.base
          }}>
                {item.description}
              </Text>
            </View>
            <View>
              {/* Button */}
                        <TouchableOpacity
            style={ {
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 150,
              height: 60,
              paddingLeft: 20,
              justifyContent: 'center',
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
              backgroundColor: COLORS.blue
            }}
            onPress={() => { console.log("Button on pressed") }}
            >
                            <Text style={ { ...FONTS.h1, color: COLORS.white }}>{completed ? "Let's Go": "Skip"}</Text>
                        </TouchableOpacity>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  renderDots = () => {

    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return(
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
        const opacity = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp"
        });

        const dotSize = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [SIZES.base, 17, SIZES.base],
          extrapolate: "clamp"
        });
        return(
          <Animated.View
            key={`dot-${index}`}
            opacity={opacity}
            style={[styles.dot, { width: dotSize, height: dotSize, }]}
            />
        );
      })}
      </View>
    );
  }

  return(
    <SafeAreaView style={ styles.container }>
      <View>
        {renderContent()}
      </View>
      <View style={styles.dotRootContainer}>
        {renderDots()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  dotRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '28%': '16%'
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2
  },
});

export default OnBoarding;