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

import { CfgSchools } from "../localdata/CfgSchools";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SchoolPicker = (props) => {
  const onPressItem = (school) => {
    props.changeSchoolModalVisibility(false);
    props.setSchool(school);
  };

  const option = CfgSchools.map((school, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(school)}
        style={styles.schoolOption}
      >
        <Text style={styles.schoolTextValue}>{school.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.schoolModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeSchoolModalVisibility(false)}
      >
        <View
          style={[
            styles.schoolModal,
            { width: WIDTH - 20, height: HEIGHT / 2 },
          ]}
        >
          <ScrollView>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  schoolModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  schoolModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  schoolOption: {
    alignItems: "center",
  },
  schoolTextValue: {
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

export default SchoolPicker;
