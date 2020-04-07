import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Button, Modal, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import Constants from "expo-constants";

const EventInput = props => {

  const [eventTxt, setEventTxt] = useState("");

  const addEventHandler = () => {
    if (eventTxt.length === 0) {
      return;
    }
    props.onAddEvent(formatText(eventTxt));
    setEventTxt("");
  };

  const formatText = (text) => {
    //Deletes blank spaces in the beginning and ending of the string
    let txt = text.split(" ").filter(x => x !== "").join(" ");
    //Returns capitalized 
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }

  const cancelHandler = () => {
    props.onCancelEvent();
    setEventTxt("");
  };

  return (
    <Modal animationType="fade" visible={props.visible} transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.background} />
          <View styles={styles.contentContainer}>
            <View>
              <TextInput
                placeholder="New event"
                style={styles.txtInput}
                onChangeText={text => setEventTxt(text)}
                onSubmitEditing={addEventHandler}
                value={eventTxt}
                enablesReturnKeyAutomatically={true}
              />
            </View>
            <View style={styles.btnContainer}>
              <View style={styles.btn}><Button title="Cancel" color="red" onPress={cancelHandler} /></View>
              <View style={styles.btn}><Button title="ADD" color="rgb(126,216,247)" onPress={addEventHandler} /></View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: .7,
    zIndex: 0,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },

  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  txtInput: {
    borderColor: "rgb(126,216,247)",
    borderWidth: 0.5,
    padding: 3,
    paddingLeft: 6,
    width: Dimensions.get('window').width * 0.7,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 15,
    color: "white",

  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    width: "70%"
  },

  btn: {
    width: "40%",
  }
});

export default EventInput;