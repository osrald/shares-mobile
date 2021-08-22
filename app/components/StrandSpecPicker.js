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

import { CfgStrandSpecs } from "../localdata/CfgStrandSpecs";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const StrandSpecPicker = (props) => {
  const onPressItem = (strandSpec) => {
    props.changeStrandSpecModalVisibility(false);
    props.setStrandSpec(strandSpec);
  };

  const option = CfgStrandSpecs.filter(
    (strandSpec) =>
      strandSpec.chId === props.selectedSchool.id &&
      strandSpec.ctId === props.selectedTrack.id
  ).map((strandSpec, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(strandSpec)}
        style={styles.strandSpecOption}
      >
        <Text style={styles.strandSpecTextValue}>{strandSpec.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.strandSpecModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeStrandSpecModalVisibility(false)}
      >
        <View
          style={[
            styles.strandSpecModal,
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
  strandSpecModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  strandSpecModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  strandSpecOption: {
    alignItems: "center",
  },
  strandSpecTextValue: {
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

export default StrandSpecPicker;
