import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Animated, UIManager } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"

import Colors from "../constants/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

const EventBlock = props => {

  const leftActions = (progress, dragX) => {
    return (
      <View style={styles.leftAction}>
        <MaterialIcons name="delete" size={32} color="black" />
      </View>
    );
  };

  const width = Dimensions.get('window').width;

  const animatedValue = useRef(new Animated.Value(0)).current;

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {

    Animated.timing(animatedValue,
      {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true
      }
    ).start();
  });

  const translateAnimation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-width, 0, width]
  });

  const opacityAnimation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  });


  return (
    <Swipeable
      renderLeftActions={leftActions}
      leftThreshold={Dimensions.get('window').width / 2}
      onSwipeableLeftOpen={props.onDelete.bind(this, props.id)}
    >

      <Animated.View style={[styles.container, {
        transform: [{ translateX: translateAnimation }],
        opacity: opacityAnimation
      }]}>

        <Text style={styles.eventText}>{props.text}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{getElapsedTimeText(props.creationTime)}</Text>
        </View>
      </Animated.View>

    </Swipeable>
  );
}

const getElapsedTimeText = creationTime => {
  let elapsedSeconds = Math.floor((new Date().getTime() - creationTime) / 1000);

  if (elapsedSeconds < 60) {  //Less than a minute
    return elapsedSeconds.toString() + " seconds ago";
  }
  else if (elapsedSeconds < 3600) {  //Less than an hour
    return Math.floor(elapsedSeconds / 60) + " minutes ago";
  }
  else if (elapsedSeconds < 86400) {  //Less than a day
    return Math.floor(elapsedSeconds / 3600).toString() + " hours ago";
  }
  else if (elapsedSeconds < 604800) {  //Less than a week
    return Math.floor(elapsedSeconds / 86400).toString() + " days ago";
  }
  else if (elapsedSeconds < 2592000) {  //Less than a month
    return Math.floor(elapsedSeconds / 604800).toString() + " weeks ago";
  }
  else {  //More than a month
    return Math.floor(elapsedSeconds / 2592000).toString() + " months ago";
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderColor: "black",
    backgroundColor: Colors.primary,
    borderRadius: 6,

    ///*    iOS shadow options 
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    //*/

    elevation: 5,
  },

  eventText: {
    fontSize: 16,
    color: Colors.accent,
  },

  dateText: {
    fontSize: 12,
    color: "grey",
  },

  dateContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  leftAction: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
});

export default EventBlock;
