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

import { CfgBarangays } from "../localdata/CfgBarangays";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const BarangayPicker = (props) => {
  const onPressItem = (barangay) => {
    props.changeBarangayModalVisibility(false);
    props.setBarangay({
      ...props.studentEntity,
      addrMakatiResidentBarangay: barangay,
    });
  };

  const option = CfgBarangays.map((barangay, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(barangay)}
        style={styles.barangayOption}
      >
        <Text style={styles.barangayTextValue}>{barangay.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.barangayModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeBarangayModalVisibility(false)}
      >
        <View
          style={[
            styles.barangayModal,
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
  barangayModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  barangayModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  barangayOption: {
    alignItems: "center",
  },
  barangayTextValue: {
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

export default BarangayPicker;
