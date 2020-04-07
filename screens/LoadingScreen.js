import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/colors"

const LoadingScreen = props => {

  useEffect(() => {
    props.load();
  });

  return (
    <View style={styles.screen}>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
});

export default LoadingScreen;