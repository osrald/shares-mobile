import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from "react-native";
import Constants from "expo-constants";

import Auth from "../Auth";

function LRNValidator(props) {
  const [lrn, setLrn] = useState("");
  const [lrnStat, setLrnStat] = useState({ value: "", timestamp: Date.now() });
  const [lrnMsg, setLrnMsg] = useState("LRN is empty. Please enter LRN.");
  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    fetch(
      Constants.manifest.extra.sysEnv === "PRODUCTION"
        ? `${Constants.manifest.extra.apiProdBaseURL}SharesAllConfig`
        : `${Constants.manifest.extra.apiDevBaseURL}SharesAllConfig`
    )
      .then((response) => response.json())
      .then((data) => setConfigs(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (/^\d{12}$/.test(lrn)) {
      switch (lrnStat.value) {
        case "":
          setLrnMsg("LRN Validation", "LRN is empty. Please enter LRN.");
          break;
        case "AR":
          if (props.route.params.source === "EarlyReg") {
            props.navigation.navigate("EarlyRegistrationInfo", { lrn: lrn });
          } else if (props.route.params.source === "Enrollment") {
            props.navigation.navigate("Enrollment", {
              id: null,
              lrn: lrn,
              lrnStat: "AR",
              currSy:
                Object.keys(configs).length > 0
                  ? configs.find(
                      (config) =>
                        config.cfMajor === "CFG" && config.cfMinor === "CSY"
                    ).cfGeneral1
                  : "",
              currSem:
                Object.keys(configs).length > 0
                  ? configs.find(
                      (config) =>
                        config.cfMajor === "CFG" && config.cfMinor === "SME"
                    ).cfGeneral1
                  : "",
              enrollDate:
                Object.keys(configs).length > 0
                  ? configs.find(
                      (config) =>
                        config.cfMajor === "CFG" && config.cfMinor === "DOE"
                    ).cfGeneral1
                  : "",
              schoolName:
                Object.keys(configs).length > 0
                  ? configs.find(
                      (config) =>
                        config.cfMajor === "CFG" && config.cfMinor === "SCN"
                    ).cfGeneral1
                  : "",
            });
          }
          break;
        case "CE":
          if (props.route.params.source === "EarlyReg") {
            setLrnMsg(
              "Your LRN is currently enrolled for this school year. Please enter another LRN."
            );
          } else if (props.route.params.source === "Enrollment") {
            props.navigation.navigate("EnrollmentInfo", { lrn: lrn });
          }
          break;
        case "NR":
          if (props.route.params.source === "EarlyReg") {
            setLrnMsg("This is a valid LRN.");
            Alert.alert(
              "LRN Validation",
              "Your LRN seems to be in the system, do you wish to register this LRN for the current school year.",
              [
                {
                  text: "Yes",
                  onPress: () =>
                    props.navigation.navigate("EarlyRegistration", {
                      id: null,
                      lrn: lrn,
                      lrnStat: "NR",
                    }),
                },
                { text: "No" },
              ]
            );
          } else if (props.route.params.source === "Enrollment") {
            setLrnMsg(
              "Your LRN seems to be in the system where it has been previously registered, please register it first for this school year."
            );
          }
          break;
        case "GR":
          setLrnMsg("Student already graduated. Please enter another LRN.");
          break;
        case "TR":
          setLrnMsg("Student already transferred. Please enter another LRN.");
          break;
        case "KO":
          setLrnMsg("Student was kicked-out. Please enter another LRN.");
          break;
        case "DR":
          setLrnMsg("Student is a dropout. Please enter another LRN.");
          break;
        case "DE":
          if (props.route.params.source === "EarlyReg") {
            setLrnMsg("");
            Alert.alert(
              "LRN Validation",
              "Your LRN is not yet in the system, do you wish to register this LRN for this current school year?",
              [
                {
                  text: "Yes",
                  onPress: () =>
                    props.navigation.navigate("EarlyRegistration", {
                      id: null,
                      lrn: lrn,
                      lrnStat: "DE",
                    }),
                },
                {
                  text: "No",
                  onPress: () => {
                    setLrnStat({ value: "", timestamp: Date.now() });
                    setLrnMsg("Please enter LRN.");
                  },
                },
              ]
            );
          } else if (props.route.params.source === "Enrollment") {
            setLrnMsg(
              "Your LRN is not yet in the system, you need to register it first for this current school year."
            );
          }
          break;
        default:
          setLrnMsg("We cannot determine your LRN. Please enter another LRN.");
          break;
      }
    }
  }, [lrnStat]);

  const processLrn = (lrn) => {
    Auth.getAuhorization().then((bearer) => {
      axios
        .get(
          Constants.manifest.extra.sysEnv === "PRODUCTION"
            ? `${Constants.manifest.extra.apiProdBaseURL}studentRegistrationStatus/${lrn}`
            : `${Constants.manifest.extra.apiDevBaseURL}studentRegistrationStatus/${lrn}`,
          {
            headers: {
              Authorization: bearer.data,
            },
          }
        )
        .then((response) => {
          setLrnStat({ value: response.data, timestamp: Date.now() });
        });
    });
  };

  const onPressValidateHandler = () => {
    if (/^\d{12}$/.test(lrn)) {
      processLrn(lrn);
    } else {
      setLrnMsg("LRN is invalid. Please input another LRN.");
    }
  };

  const onPressCancelHandler = () => {
    props.navigation.navigate("Home");
  };

  return (
    <ImageBackground
      style={styles.lrnValidatorAppBackground}
      source={require("../assets/shares-appbg.jpg")}
    >
      <SafeAreaView style={styles.lrnValidatorUpperContainer}>
        <View style={styles.lrnValidatorTextinputContainer}>
          <Text style={styles.textRegistrationLRN}>{lrnMsg}</Text>
          <TextInput
            keyboardType="numeric"
            placeholder={"Learner's Identification Number"}
            placeholderTextColor="#9da4b0"
            style={styles.textInputRegistrationLRN}
            value={lrn}
            onChangeText={(text) => setLrn(text)}
            textAlign="center"
            maxLength={12}
          ></TextInput>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.lrnValidatorLowerContainer}>
        <View style={styles.lrnValidatorButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressValidateHandler}
            style={styles.validateButtonContainer}
          >
            <Text style={styles.validateButtonText}>Validate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressCancelHandler}
            style={styles.cancelButtonContainer}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  lrnValidatorAppBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  lrnValidatorUpperContainer: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 15,
    width: "100%",
  },
  lrnValidatorLowerContainer: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "flex-start",
    top: 10,
  },
  lrnValidatorTextinputContainer: {
    width: "100%",
    alignItems: "center",
  },
  textRegistrationLRN: {
    color: "#fff",
    width: "70%",
    textAlign: "center",
  },
  textInputRegistrationLRN: {
    borderWidth: 2,
    borderColor: "skyblue",
    color: "#fff",
    textAlign: "center",
    width: "70%",
    borderRadius: 5,
    fontWeight: "bold",
  },
  lrnValidatorButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  validateButtonContainer: {
    elevation: 8,
    backgroundColor: "#3e85f7",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 100,
  },
  validateButtonText: {
    color: "#fff",
    alignSelf: "center",
  },
  cancelButtonContainer: {
    elevation: 8,
    backgroundColor: "#f08b48",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 100,
  },
  cancelButtonText: {
    color: "#fff",
    alignSelf: "center",
  },
});

export default LRNValidator;
