import React from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

//https://expo.io/@osrald/projects/shares-mobile
function WelcomeScreen({ navigation }) {
  const onPressAboutHandler = () => {
    navigation.navigate("About");
  };

  const onPressRegisterHandler = () => {
    navigation.navigate("LRNValidator", {
      source: "EarlyReg",
    });
  };

  const onPressEnrollHandler = () => {
    navigation.navigate("LRNValidator", {
      source: "Enrollment",
    });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/shares-background.jpeg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/MHS.png")} />
        <Text style={styles.titleText}>Makati High School</Text>
        <Text style={styles.titleText}>SHARES-SYSTEM</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressAboutHandler}
        style={styles.aboutButtonContainer}
      >
        <Text style={styles.aboutButtonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressRegisterHandler}
        style={styles.registerButtonContainer}
      >
        <Text style={styles.registerButtonText}>Early Registration</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressEnrollHandler}
        style={styles.enrollButtonContainer}
      >
        <Text style={styles.enrollButtonText}>Enrollment</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 40,
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    color: "#2535c4",
    fontSize: 25,
  },
  aboutButtonContainer: {
    elevation: 8,
    backgroundColor: "#bc46f0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "95%",
    bottom: 60,
  },
  aboutButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  registerButtonContainer: {
    elevation: 8,
    backgroundColor: "#bc46f0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "95%",
    bottom: 40,
  },
  registerButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  enrollButtonContainer: {
    elevation: 8,
    backgroundColor: "#bc46f0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "95%",
    bottom: 20,
  },
  enrollButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default WelcomeScreen;
