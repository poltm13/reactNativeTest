import React, { useState, useEffect } from "react";
import { LayoutAnimation, AsyncStorage } from "react-native";

import LoadingScreen from "./screens/LoadingScreen";
import AppScreen from "./screens/AppScreen"

export default function App() {

  const [events, setEvents] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const _setStorage = () => {
    AsyncStorage.setItem("eventList", JSON.stringify(events));
  }

  const inputButtonHandler = (eventTxt) => {
    setEvents(events => [...events, { id: Math.random().toString(), value: eventTxt, creationTime: new Date().getTime() }]);
    setIsAdd(false);
    _setStorage();
  }

  const cancelEventHandler = () => {
    setIsAdd(false);
  }

  const removeEventHandler = eventId => {
    setEvents(events => events.filter(e => e.id !== eventId));
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        100,  //Duration
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    _setStorage();
  }

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("eventList");
      if (value !== null) {
        setEvents(JSON.parse(value));
        setIsLoading(false)
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  let content = <LoadingScreen load={_retrieveData} />

  if (!isLoading) {
    content = <AppScreen
      inputButtonHandler={inputButtonHandler}
      cancelEventHandler={cancelEventHandler}
      removeEventHandler={removeEventHandler}
      events={events}
      isAdd={isAdd}
      setIsAdd={setIsAdd}
    />
  }

  return (
    content
  );
}
