import React, {useState} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type Props = {
  tabs: string[];
};

const TabMenu = ({tabs}: Props) => {
  const [layoutCount, setLayoutCount] = useState(0);
  const underlineAnimation = new Animated.Value(0);
  const tabWidths = React.useRef(tabs.map(() => 0));
  const tabPositions = React.useRef(tabs.map(() => 0));

  const animateUnderline = (index: number) => {
    Animated.timing(underlineAnimation, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleTabPress = (index: number) => {
    animateUnderline(index);
  };

  const onTabLayout = (event: LayoutChangeEvent, index: number) => {
    const {width} = event.nativeEvent.layout;
    tabWidths.current[index] = width;
    // Calculate the position of each tab based on the width of the tabs
    // [width1, width1 + width2, width1 + width2 + width3, ...]
    tabPositions.current = tabWidths.current.map((_, anIndex: number) =>
      tabWidths.current.slice(0, anIndex + 1).reduce((acc, curr) => acc + curr),
    );
    tabPositions.current.unshift(0);
    tabPositions.current.pop();
    // Force a re-render after all tabs have been laid out
    setLayoutCount(layoutCount + 1);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        style={[styles.tab]}
        onLayout={event => onTabLayout(event, index)}
        onPress={() => handleTabPress(index)}>
        <Text style={styles.tabText}>{tab}</Text>
      </TouchableOpacity>
    ));
  };

  const underlinePosition = underlineAnimation.interpolate({
    inputRange: tabPositions.current.map((_, index) => index),
    outputRange: tabPositions.current.map(position => position),
  });
  const underlineWidth = underlineAnimation.interpolate({
    inputRange: tabWidths.current.map((_, index) => index),
    outputRange: tabWidths.current.map(width => width),
  });

  return (
    <>
      {renderTabs()}
      <Animated.View
        style={[
          styles.underline,
          {left: underlinePosition, width: underlineWidth},
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  tabText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  underline: {
    backgroundColor: '#0b0',
    bottom: 0,
    height: 6,
    position: 'absolute',
    width: 100,
  },
});

export default TabMenu;
