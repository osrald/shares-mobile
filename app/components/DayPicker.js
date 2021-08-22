import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Days from "../localdata/Days";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const DayPicker = (props) => {
  const onPressItem = (day) => {
    props.changeDayModalVisibility(false);
    props.setDay(day);
  };

  const option = Days.getDays().map((day, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(day)}
        style={styles.dayOption}
      >
        <Text style={styles.dayTextValue}>{day.value}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.dayModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeDayModalVisibility(false)}
      >
        <View
          style={[styles.dayModal, { width: WIDTH - 20, height: HEIGHT / 2 }]}
        >
          <ScrollView>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dayModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  dayOption: {
    alignItems: "center",
  },
  dayTextValue: {
    margin: 15,
    fontSize: 15,
    fontWeight: "bold",
    borderWidth: 1,
    width: "95%",
    textAlign: "center",
    borderRadius: 5,
    borderColor: "#1f9ef2",
    color: "#7d71e3",
    padding: 15,
  },
});

export default DayPicker;
