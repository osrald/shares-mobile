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

const OPTIONS = [
  { code: "M", name: "Male" },
  { code: "F", name: "Female" },
];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const GenderPicker = (props) => {
  const onPressItem = (item) => {
    props.changeGenderModalVisibility(false);
    props.setGender(item);
  };

  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(item)}
        style={styles.genderOption}
      >
        <Text style={styles.genderTextValue}>{item.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.genderModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeGenderModalVisibility(false)}
      >
        <View
          style={[
            styles.genderModal,
            { width: WIDTH - 20, height: HEIGHT / 4 },
          ]}
        >
          <ScrollView>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  genderModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  genderModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  genderOption: {
    alignItems: "center",
  },
  genderTextValue: {
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

export default GenderPicker;
