import React, { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

import Auth from "../Auth";

import StudentEntity from "../localdata/StudentEntity";

function EarlyRegistrationInfoScreen({ navigation, route }) {
  const [configs, setConfigs] = useState([]);
  const [studentEntity, setStudentEntity] = useState(StudentEntity.intialize());

  useEffect(() => {
    fetchSharesConfig();
    getRegisteredRecord(route.params.lrn);
  }, []);

  const fetchSharesConfig = () => {
    return fetch(
      Constants.manifest.extra.sysEnv === "PRODUCTION"
        ? `${Constants.manifest.extra.apiProdBaseURL}SharesAllConfig`
        : `${Constants.manifest.extra.apiDevBaseURL}SharesAllConfig`
    )
      .then((response) => response.json())
      .then((data) => setConfigs(data))
      .catch((error) => console.log(error));
  };

  const getRegisteredRecord = (lrn) => {
    Auth.getAuhorization().then((bearer) => {
      axios
        .get(
          Constants.manifest.extra.sysEnv === "PRODUCTION"
            ? `${Constants.manifest.extra.apiProdBaseURL}studentByLRN/${lrn}`
            : `${Constants.manifest.extra.apiDevBaseURL}studentByLRN/${lrn}`,
          {
            headers: {
              Authorization: bearer.data,
            },
          }
        )
        .then((response) => {
          setStudentEntity(response.data);
        });
    });
  };

  const onPressRegisterAnotherHandler = () => {
    navigation.navigate("LRNValidator", {
      source: "EarlyReg",
    });
  };

  const onPressExitHandler = () => {
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      style={styles.earlyRegistrationAppBackground}
      source={require("../assets/shares-appbg.jpg")}
    >
      <SafeAreaView style={styles.earlyRegistrationSafeAreaView}>
        <ScrollView style={styles.earlyRegistrationScrollView}>
          <View style={styles.earlyRegistrationAllItems}>
            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text multiline style={styles.earlyRegistrationHeaderLabel}>
                {`Your LRN[${
                  route.params.lrn
                }] has been registered for this current school year: ${
                  Object.keys(configs).length > 0
                    ? configs.find(
                        (config) =>
                          config.cfMajor === "CFG" && config.cfMinor === "CSY"
                      ).cfGeneral1
                    : ""
                }.`}
              </Text>
            </View>
            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Note: Visit https://www.shares-system.com if you want to print
                this form
              </Text>
            </View>
            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                1. Student Info.
              </Text>
              <Text style={styles.earlyRegistrationTextLabel}>Lastname</Text>
              <TextInput
                style={styles.textInputRegistration}
                maxLength={30}
                editable={false}
                value={studentEntity.lastname}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>Firstname</Text>
              <TextInput
                style={styles.textInputRegistration}
                maxLength={30}
                editable={false}
                value={studentEntity.firstname}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>Middlename</Text>
              <TextInput
                style={styles.textInputRegistration}
                maxLength={30}
                editable={false}
                value={studentEntity.middlename}
              />
            </View>
            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                2. Other Info.
              </Text>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                First choice school
              </Text>
              <TextInput
                style={styles.textInputRegistration}
                editable={false}
                value={studentEntity.shsSchoolFirstChoice.name}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Other school name
              </Text>
              <TextInput
                style={styles.textInputRegistration}
                editable={false}
                maxLength={255}
                value={
                  studentEntity.shsSchoolFirstChoice.code === "999"
                    ? studentEntity.shsSchoolFirstChoiceOthersNm
                    : "N/A"
                }
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Other school address
              </Text>
              <TextInput
                style={styles.textInputRegistration}
                editable={false}
                maxLength={255}
                value={
                  studentEntity.shsSchoolFirstChoice.code === "999"
                    ? studentEntity.shsSchoolFirstChoiceOthersAddr
                    : "N/A"
                }
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>Track</Text>
              <TextInput
                style={styles.textInputRegistration}
                editable={false}
                value={studentEntity.shsTrackFirstChoice.name}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Strand/Specialization
              </Text>
              <TextInput
                style={styles.textInputRegistration}
                editable={false}
                value={studentEntity.shsStrSpecFirstChoice.name}
              />
              <View style={styles.earlyRegistrationGapperSM} />
            </View>
            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationButtonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPressRegisterAnotherHandler}
                  style={styles.earlyRegistrationSubmitButtonContainer}
                >
                  <Text style={styles.earlyRegistrationButtonText}>
                    Register Another
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPressExitHandler}
                  style={styles.earlyRegistrationCancelButtonContainer}
                >
                  <Text style={styles.earlyRegistrationButtonText}>Exit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.earlyRegistrationGapperM} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  earlyRegistrationHeaderLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  earlyRegistrationSubmitButtonContainer: {
    elevation: 8,
    backgroundColor: "#3e85f7",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
  },
  earlyRegistrationButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  earlyRegistrationButtonText: {
    color: "#fff",
    alignSelf: "center",
  },
  earlyRegistrationCancelButtonContainer: {
    elevation: 8,
    backgroundColor: "#f08b48",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
  },
  earlyRegistrationSafeAreaView: {
    width: "100%",
  },
  earlyRegistrationScrollView: {
    width: "100%",
  },
  earlyRegistrationAllItems: {
    width: "90%",
    alignSelf: "center",
  },
  earlyRegistrationGapperM: {
    height: 20,
  },
  earlyRegistrationGapperSM: {
    height: 10,
  },
  earlyRegistrationTextChoiceLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
  earlyRegistrationTextLabel: {
    color: "#fff",
  },
  earlyRegistrationItem: {
    width: "100%",
  },
  earlyRegistrationTextItemTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    height: 30,
  },
  textInputRegistration: {
    borderWidth: 2,
    borderColor: "skyblue",
    color: "#fff",
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
  },
  earlyRegistrationAppBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default EarlyRegistrationInfoScreen;
