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
  { code: "Y", name: "Yes" },
  { code: "N", name: "No" },
];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const YesNoPicker = (props) => {
  const onPressItem = (item) => {
    props.changeYesNoVisibility(false);
    props.setYesNo(item);
  };

  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(item)}
        style={styles.yesNoOption}
      >
        <Text style={styles.yesNoTextValue}>{item.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.yesNoModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeYesNoVisibility(false)}
      >
        <View
          style={[styles.yesNoModal, { width: WIDTH - 20, height: HEIGHT / 4 }]}
        >
          <ScrollView>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  yesNoModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  yesNoModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  yesNoOption: {
    alignItems: "center",
  },
  yesNoTextValue: {
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

export default YesNoPicker;
