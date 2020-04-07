import React from "react";
import { StyleSheet, View, Button, KeyboardAvoidingView } from "react-native";

import EventInput from "../components/EventInput";
import EventList from "../components/EventList";
import Header from "../components/Header";
import Colors from "../constants/colors"

const AppScreen = props => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      enabled={Platform.OS == "ios" ? true : false}
    >
      <View style={styles.screen}>

        <EventInput visible={props.isAdd} onAddEvent={props.inputButtonHandler} onCancelEvent={props.cancelEventHandler} />

        <View style={styles.header}>
          <Header text="THINGS TO DO" />
        </View>

        <View style={styles.body}>
          <EventList events={props.events} remove={props.removeEventHandler} />

          <View style={styles.addBtnContainer}>
            <Button title="Add new thing to do" color={Colors.accent} onPress={() => props.setIsAdd(true)} />
            {/*<Button title="Add" color={Colors.accent} onPress={() => props.inputButtonHandler("adasda")} />*/}
          </View>
        </View>

      </View >
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
  },

  addBtnContainer: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
  },

  header: {
    height: "15%",
  },

  body: {
    height: "85%",
  }
});

export default AppScreen;