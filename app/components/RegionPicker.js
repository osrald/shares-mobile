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

import { CfgRegions } from "../localdata/CfgRegions";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const RegionPicker = (props) => {
  const onPressItem = (region) => {
    props.changeRegionModalVisibility(false);
    props.setRegion(region);
  };

  const option = CfgRegions.map((region, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(region)}
        style={styles.regionOption}
      >
        <Text style={styles.regionTextValue}>{region.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.regionModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeRegionModalVisibility(false)}
      >
        <View
          style={[
            styles.regionModal,
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
  regionModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  regionModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  regionOption: {
    alignItems: "center",
  },
  regionTextValue: {
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

export default RegionPicker;
