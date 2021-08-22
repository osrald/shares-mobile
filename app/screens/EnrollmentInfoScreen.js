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

function EnrollmentInfoScreen({ navigation, route }) {
  const [configs, setConfigs] = useState([]);
  const [studentEntity, setStudentEntity] = useState(
    StudentEntity.initializeExtended()
  );

  useEffect(() => {
    fetchSharesConfig();
    getEnrolledRecord(route.params.lrn);
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

  const getEnrolledRecord = (lrn) => {
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

  const onPressEnrollAnotherHandler = () => {
    navigation.navigate("LRNValidator", {
      source: "Enrollment",
    });
  };

  const onPressExitHandler = () => {
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      style={styles.enrollmentAppBackground}
      source={require("../assets/shares-appbg.jpg")}
    >
      <SafeAreaView style={styles.enrollmentSafeAreaView}>
        <ScrollView style={styles.enrollmentScrollView}>
          <View style={styles.enrollmentAllItems}>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text multiline style={styles.enrollmentHeaderLabel}>
                {`Your LRN[${
                  route.params.lrn
                }] has been enrolled for this current school year (${
                  Object.keys(configs).length > 0
                    ? configs.find(
                        (config) =>
                          config.cfMajor === "CFG" && config.cfMinor === "CSY"
                      ).cfGeneral1
                    : ""
                }). This will be processed and validated by the school.`}
              </Text>
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextLabel}>
                Note: To check your enrollment status, regularly visit this site
                https://www.shares-system.com where you can also print your
                enrollment form if required.
              </Text>
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>
                1. Student Info.
              </Text>
              <Text style={styles.enrollmentTextLabel}>Lastname</Text>
              <TextInput
                style={styles.textInputRegistration}
                maxLength={30}
                editable={false}
                value={studentEntity.lastname}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Firstname</Text>
              <TextInput
                style={styles.textInputRegistration}
                maxLength={30}
                editable={false}
                value={studentEntity.firstname}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Middlename</Text>
              <TextInput
                style={styles.textInputRegistration}
                maxLength={30}
                editable={false}
                value={studentEntity.middlename}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>
                2. Enrollment Info.
              </Text>
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Senior High School Track Applied For
              </Text>
              <TextInput
                style={styles.textInputRegistration}
                editable={false}
                value={
                  studentEntity.shsTrackEnrolled &&
                  `${studentEntity.shsTrackEnrolled.code} - ${studentEntity.shsTrackEnrolled.name}`
                }
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Senior High School Strand/Specialization Applied For
              </Text>
              <TextInput
                style={styles.textInputRegistration}
                editable={false}
                maxLength={255}
                value={
                  studentEntity.shsStrSpecEnrolled &&
                  `${studentEntity.shsStrSpecEnrolled.code} - ${studentEntity.shsStrSpecEnrolled.name}`
                }
              />
              <View style={styles.enrollmentGapperSM} />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentButtonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPressEnrollAnotherHandler}
                  style={styles.enrollmentSubmitButtonContainer}
                >
                  <Text style={styles.enrollmentButtonText}>
                    Enroll Another
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPressExitHandler}
                  style={styles.enrollmentCancelButtonContainer}
                >
                  <Text style={styles.enrollmentButtonText}>Exit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.enrollmentGapperM} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  enrollmentHeaderLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  enrollmentSubmitButtonContainer: {
    elevation: 8,
    backgroundColor: "#3e85f7",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
  },
  enrollmentButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  enrollmentButtonText: {
    color: "#fff",
    alignSelf: "center",
  },
  enrollmentCancelButtonContainer: {
    elevation: 8,
    backgroundColor: "#f08b48",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
  },
  enrollmentSafeAreaView: {
    width: "100%",
  },
  enrollmentScrollView: {
    width: "100%",
  },
  enrollmentAllItems: {
    width: "90%",
    alignSelf: "center",
  },
  enrollmentGapperM: {
    height: 20,
  },
  enrollmentGapperSM: {
    height: 10,
  },
  earlyRegistrationTextChoiceLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
  enrollmentTextLabel: {
    color: "#fff",
  },
  enrollmentItem: {
    width: "100%",
  },
  enrollmentTextItemTitle: {
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
  enrollmentAppBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default EnrollmentInfoScreen;
