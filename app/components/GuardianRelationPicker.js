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

const OPTIONS = ["Parent", "Relative", "Non-Relative"];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const GuardianRelationPicker = (props) => {
  const onPressItem = (item) => {
    props.changeGuardianRelationVisibility(false);
    props.setGuardianRelation({
      ...props.studentEntity,
      sdtStudentOtherInfo: {
        ...props.studentEntity.sdtStudentOtherInfo,
        guardianRelation: item,
      },
    });
  };

  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(item)}
        style={styles.guardianOption}
      >
        <Text style={styles.guardianTextValue}>{item}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.guardianModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeGuardianRelationVisibility(false)}
      >
        <View
          style={[
            styles.guardianModal,
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
  guardianModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  guardianModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  guardianOption: {
    alignItems: "center",
  },
  guardianTextValue: {
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

export default GuardianRelationPicker;
