import React from "react";
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";

import EventBlock from "./EventBlock";

const EventList = props => {

  return (

    <FlatList
      keyExtractor={(item, index) => item.id}
      style={styles.eventContainer}
      data={props.events}
      renderItem={intemData => <EventBlock
        id={intemData.item.id}
        onDelete={props.remove}
        text={intemData.item.value}
        creationTime={intemData.item.creationTime}
      />}
      ListEmptyComponent={
        <View style={styles.emptyTextContainer}>
          <Text style={{ color: "grey" }}>¡¡You have nothing pending to do!!</Text>
        </View>
      }
    />

  );
};

const styles = StyleSheet.create({
  eventContainer: {
    padding: 0,
    height: "100%",
  },

  emptyTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.7,
  },
});

export default EventList;