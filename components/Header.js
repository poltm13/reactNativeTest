import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";

import Colors from "../constants/colors";

const Header = props => {

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    paddingTop: 30 + Constants.statusBarHeight,
    backgroundColor: Colors.primary,
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 20,
    color: Colors.accent,
    fontWeight: "bold",
  },
});

export default Header;