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

import Years from "../localdata/Years";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const YearPicker = (props) => {
  const onPressItem = (year) => {
    props.changeYearModalVisibility(false);
    props.setYear(year);
  };

  const option = Years.getYears().map((year, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(year)}
        style={styles.yearOption}
      >
        <Text style={styles.yearTextValue}>{year.value}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.yearModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeYearModalVisibility(false)}
      >
        <View
          style={[styles.yearModal, { width: WIDTH - 20, height: HEIGHT / 2 }]}
        >
          <ScrollView>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  yearModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  yearModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  yearOption: {
    alignItems: "center",
  },
  yearTextValue: {
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

export default YearPicker;
