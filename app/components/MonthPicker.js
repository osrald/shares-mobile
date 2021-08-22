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

import { Months } from "../localdata/Months";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const MonthPicker = (props) => {
  const onPressItem = (month) => {
    props.changeMonthModalVisibility(false);
    props.setMonth(month);
  };

  const option = Months.map((month, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(month)}
        style={styles.monthOption}
      >
        <Text style={styles.monthTextValue}>{month.longName}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.monthModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeMonthModalVisibility(false)}
      >
        <View
          style={[styles.monthModal, { width: WIDTH - 20, height: HEIGHT / 2 }]}
        >
          <ScrollView>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  monthModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  monthModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  monthOption: {
    alignItems: "center",
  },
  monthTextValue: {
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

export default MonthPicker;
