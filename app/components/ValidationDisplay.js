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

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ValidationDisplay = (props) => {
  const onPressItem = () => {
    props.setIsValidationDisplayModalVisible(false);
  };

  const option = props.messages.map((message, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem()}
        style={styles.validationDisplayOption}
      >
        <Text style={styles.validationDisplayTextValue}>{message}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.validationDisplayModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.setIsValidationDisplayModalVisible(false)}
      >
        <View
          style={[
            styles.validationDisplayModal,
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
  validationDisplayModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  validationDisplayModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  validationDisplayOption: {
    alignItems: "center",
  },
  validationDisplayTextValue: {
    margin: 15,
    fontSize: 15,
    fontWeight: "bold",
    borderWidth: 1,
    width: "95%",
    textAlign: "center",
    borderRadius: 5,
    borderColor: "#f06e65",
    color: "#7d71e3",
    padding: 15,
  },
});

export default ValidationDisplay;
