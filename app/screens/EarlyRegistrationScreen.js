import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";

import axios from "axios";
import Constants from "expo-constants";

import { CfgStatuses } from "../localdata/CfgStatuses";
import { Months } from "../localdata/Months";
import GenderPicker from "../components/GenderPicker";
import RegionPicker from "../components/RegionPicker";
import YesNoPicker from "../components/YesNoPicker";
import SchoolPicker from "../components/SchoolPicker";
import TrackPicker from "../components/TrackPicker";
import StrandSpecPicker from "../components/StrandSpecPicker";
import MonthPicker from "../components/MonthPicker";
import DayPicker from "../components/DayPicker";
import YearPicker from "../components/YearPicker";
import StudentEntity from "../localdata/StudentEntity";
import Validate from "../validators/EarlyRegistrationScreenValidator";
import ValidationDisplay from "../components/ValidationDisplay";
import Auth from "../Auth";

function EarlyRegistrationScreen({ navigation, route }) {
  const [configs, setConfigs] = useState([]);
  const [studentEntity, setStudentEntity] = useState(StudentEntity.intialize());
  const [errors, setErrors] = useState({});
  const [isValidationDisplayModalVisible, setIsValidationDisplayModalVisible] =
    useState(false);
  const [submitWasPressed, setSubmitWasPressed] = useState(false);

  /* 1. Name of Student */
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");

  /* 2. Gender */
  const [gender, setGender] = useState({ code: "", name: "" });
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  /* 3. Date of birth */
  const [dobMonth, setDobMonth] = useState({
    code: "00",
    shortName: "",
    longName: "",
  });
  const [isDobMonthModalVisible, setIsDobMonthModalVisible] = useState(false);
  const [dobDay, setDobDay] = useState({
    key: "0000",
    value: "",
  });
  const [isDobDayModalVisible, setIsDobDayModalVisible] = useState(false);
  const [dobYear, setDobYear] = useState({
    key: "0000",
    value: "",
  });
  const [isDobYearModalVisible, setIsDobYearModalVisible] = useState(false);

  /* 4. Place of birth */
  const [birthPlace, setBirthPlace] = useState("");

  /* 5. Nationality */
  const [nationality, setNationality] = useState("");

  /* 6. LRN */

  /* 7. Elementary School */
  const [elemSchoolName, setElemSchoolName] = useState("");
  const [elemSchoolAddress, setElemSchoolAddress] = useState("");
  const [elemMonthCompletion, setElemMonthCompletion] = useState({
    code: "00",
    shortName: "",
    longName: "",
  });
  const [
    isElemMonthCompletionModalVisible,
    setIsElemMonthCompletionModalVisible,
  ] = useState(false);
  const [elemYearCompletion, setElemYearCompletion] = useState({
    key: "0000",
    value: "",
  });
  const [
    isElemYearCompletionModalVisible,
    setIsElemYearCompletionModalVisible,
  ] = useState(false);
  const [elemRegion, setElemRegion] = useState({ code: "", name: "" });
  const [isElemRegionModalVisible, setIsElemRegionModalVisible] =
    useState(false);
  const [elemPeptPasser, setElemPeptPasser] = useState({ code: "", name: "" });
  const [isElemPeptPasserModalVisible, setIsElemPeptPasserModalVisible] =
    useState(false);
  const [elemMonthPeptPasser, setElemMonthPeptPasser] = useState({
    code: "00",
    shortName: "",
    longName: "",
  });
  const [
    isElemMonthPeptPasserModalVisible,
    setIsElemMonthPeptPasserModalVisible,
  ] = useState(false);
  const [elemYearPeptPasser, setElemYearPeptPasser] = useState({
    key: "0000",
    value: "",
  });
  const [
    isElemYearPeptPasserModalVisible,
    setIsElemYearPeptPasserModalVisible,
  ] = useState(false);
  const [elemAePasser, setElemAePasser] = useState({ code: "", name: "" });
  const [isElemAePasserModalVisible, setIsElemAePasserModalVisible] =
    useState(false);
  const [elemMonthAePasser, setElemMonthAePasser] = useState({
    code: "00",
    shortName: "",
    longName: "",
  });
  const [isElemMonthAePasserModalVisible, setIsElemMonthAePasserModalVisible] =
    useState(false);
  const [elemYearAePasser, setElemYearAePasser] = useState({
    key: "0000",
    value: "",
  });
  const [isElemYearAePasserModalVisible, setIsElemYearAePasserModalVisible] =
    useState(false);

  /* 8. Junior High School */
  const [jhsSchoolName, setJhsSchoolName] = useState("");
  const [jhsSchoolAddress, setJhsSchoolAddress] = useState("");
  const [jhsMonthCompletion, setJhsMonthCompletion] = useState({
    code: "00",
    shortName: "",
    longName: "",
  });
  const [
    isJhsMonthCompletionModalVisible,
    setIsJhsMonthCompletionModalVisible,
  ] = useState(false);
  const [jhsYearCompletion, setJhsYearCompletion] = useState({
    key: "0000",
    value: "",
  });
  const [isJhsYearCompletionModalVisible, setIsJhsYearCompletionModalVisible] =
    useState(false);
  const [jhsRegion, setJhsRegion] = useState({ code: "", name: "" });
  const [isJhsRegionModalVisible, setIsJhsRegionModalVisible] = useState(false);
  const [jhsPeptPasser, setJhsPeptPasser] = useState({ code: "", name: "" });
  const [isJhsPeptPasserModalVisible, setIsJhsPeptPasserModalVisible] =
    useState(false);
  const [jhsMonthPeptPasser, setJhsMonthPeptPasser] = useState({
    code: "00",
    shortName: "",
    longName: "",
  });
  const [
    isJhsMonthPeptPasserModalVisible,
    setIsJhsMonthPeptPasserModalVisible,
  ] = useState(false);
  const [jhsYearPeptPasser, setJhsYearPeptPasser] = useState({
    key: "0000",
    value: "",
  });
  const [isJhsYearPeptPasserModalVisible, setIsJhsYearPeptPasserModalVisible] =
    useState(false);
  const [jhsAePasser, setJhsAePasser] = useState({ code: "", name: "" });
  const [isJhsAePasserModalVisible, setIsJhsAePasserModalVisible] =
    useState(false);
  const [jhsMonthAePasser, setJhsMonthAePasser] = useState({
    code: "00",
    shortName: "",
    longName: "",
  });
  const [isJhsMonthAePasserModalVisible, setIsJhsMonthAePasserModalVisible] =
    useState(false);
  const [jhsYearAePasser, setJhsYearAePasser] = useState({
    key: "0000",
    value: "",
  });
  const [isJhsYearAePasserModalVisible, setIsJhsYearAePasserModalVisible] =
    useState(false);

  /* 9. Senior High School applied for */
  /* First Choice  */
  const [schoolFirstChoice, setSchoolFirstChoice] = useState({
    id: 0,
    code: "",
    name: "",
  });
  const [isSchoolFirstChoiceModalVisible, setIsSchoolFirstChoiceModalVisible] =
    useState(false);
  const [schoolFirstChoiceOthersName, setSchoolFirstChoiceOthersName] =
    useState("");
  const [schoolFirstChoiceOthersAddress, setSchoolFirstChoiceOthersAddress] =
    useState("");
  const [trackFirstChoice, setTrackFirstChoice] = useState({
    id: 0,
    chId: 0,
    code: "",
    name: "",
  });
  const [isTrackFirstChoiceModalVisible, setIsTrackFirstChoiceModalVisible] =
    useState(false);
  const [strandSpecFirstChoice, setStrandSpecFirstChoice] = useState({
    id: 0,
    chId: 0,
    ctId: 0,
    code: "",
    name: "",
  });
  const [
    isStrandSpecFirstChoiceModalVisible,
    setIsStrandSpecFirstChoiceModalVisible,
  ] = useState(false);

  /* Second Choice  */
  const [schoolSecondChoice, setSchoolSecondChoice] = useState({
    id: 0,
    code: "",
    name: "",
  });
  const [
    isSchoolSecondChoiceModalVisible,
    setIsSchoolSecondChoiceModalVisible,
  ] = useState(false);
  const [schoolSecondChoiceOthersName, setSchoolSecondChoiceOthersName] =
    useState("");
  const [schoolSecondChoiceOthersAddress, setSchoolSecondChoiceOthersAddress] =
    useState("");
  const [trackSecondChoice, setTrackSecondChoice] = useState({
    id: 0,
    chId: 0,
    code: "",
    name: "",
  });
  const [isTrackSecondChoiceModalVisible, setIsTrackSecondChoiceModalVisible] =
    useState(false);
  const [strandSpecSecondChoice, setStrandSpecSecondChoice] = useState({
    id: 0,
    chId: 0,
    ctId: 0,
    code: "",
    name: "",
  });
  const [
    isStrandSpecSecondChoiceModalVisible,
    setIsStrandSpecSecondChoiceModalVisible,
  ] = useState(false);

  useEffect(() => {
    if (route.params.lrnStat === "NR") {
      Auth.getAuhorization().then((bearer) => {
        axios
          .get(
            Constants.manifest.extra.sysEnv === "PRODUCTION"
              ? `${Constants.manifest.extra.apiProdBaseURL}studentByLRN/${route.params.lrn}`
              : `${Constants.manifest.extra.apiDevBaseURL}studentByLRN/${route.params.lrn}`,
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
    }

    fetchSharesConfig();
  }, []);

  const onRegister = () => {
    Auth.getAuhorization().then((bearer) => {
      if (route.params.lrnStat === "DE") {
        axios
          .post(
            Constants.manifest.extra.sysEnv === "PRODUCTION"
              ? `${Constants.manifest.extra.apiProdBaseURL}studentRegisterNew`
              : `${Constants.manifest.extra.apiDevBaseURL}studentRegisterNew`,
            studentEntity,
            {
              headers: {
                Authorization: bearer.data,
              },
            }
          )
          .then((response) =>
            navigation.navigate("EarlyRegistrationInfo", {
              lrn: response.data.lrnNo,
            })
          );
      } else if (route.params.lrnStat === "NR") {
        axios
          .put(
            Constants.manifest.extra.sysEnv === "PRODUCTION"
              ? `${Constants.manifest.extra.apiProdBaseURL}studentRegisterExisting/${studentEntity.id}`
              : `${Constants.manifest.extra.apiDevBaseURL}studentRegisterExisting/${studentEntity.id}`,
            studentEntity,
            {
              headers: {
                Authorization: bearer.data,
              },
            }
          )
          .then((response) =>
            navigation.navigate("EarlyRegistrationInfo", {
              lrn: response.data.lrnNo,
            })
          );
      }
    });
  };

  useEffect(() => {
    if ("status" in studentEntity) {
      if (studentEntity.status.code !== "") {
        if (errors.messages && Object.keys(errors.messages).length > 0) {
          setIsValidationDisplayModalVisible(true);
        }

        if (
          errors.messages &&
          Object.keys(errors.messages).length === 0 &&
          submitWasPressed
        ) {
          Alert.alert(
            "Confirm Registration",
            "This will register the indicated student, please confirm.",
            [
              {
                text: "Yes",
                onPress: () => onRegister(),
              },
              { text: "No" },
            ]
          );
        }
      }
    }
  }, [errors]);

  useEffect(() => {
    if (route.params.lrnStat === "NR") {
      assignStudentEntityToVarStates(studentEntity);
    }

    setErrors(Validate(studentEntity));
  }, [studentEntity]);

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

  const assignStudentEntityToVarStates = (studentEntity) => {
    setLastName(studentEntity.lastname);
    setFirstName(studentEntity.firstname);
    setMiddleName(studentEntity.middlename);

    setGender(
      gender.code === "M"
        ? { code: "M", name: "Male" }
        : { code: "F", name: "Female" }
    );

    if (studentEntity.dob !== "") {
      setDobDay({
        key: studentEntity.dob.slice(8, 10),
        value: studentEntity.dob.slice(8, 10),
      });
      setDobMonth(
        Months.find((month) => month.code === studentEntity.dob.slice(5, 7))
      );
      setDobYear({
        key: studentEntity.dob.slice(0, 4),
        value: studentEntity.dob.slice(0, 4),
      });
    }

    setNationality(studentEntity.nationality);
    setBirthPlace(studentEntity.birthplace);
    setElemSchoolName(studentEntity.elemName);
    setElemSchoolAddress(studentEntity.elemSchoolAddr);

    if (studentEntity.elemCompMonth !== "") {
      setElemMonthCompletion(
        Months.find((month) => month.shortName === studentEntity.elemCompMonth)
      );
      setElemYearCompletion({
        key: studentEntity.elemCompYear,
        value: studentEntity.elemCompYear,
      });
    }
    setElemRegion(studentEntity.elemRegion);
    setElemPeptPasser(
      studentEntity.elemPeptPasser === "Y"
        ? { code: "Y", name: "Yes" }
        : { code: "N", name: "No" }
    );

    if (studentEntity.elemPeptPasser === "Y") {
      setElemMonthPeptPasser(
        Months.find((month) => month.shortName === studentEntity.elemPeptMonth)
      );
      setElemYearPeptPasser({
        key: studentEntity.elemPeptYear,
        value: studentEntity.elemPeptYear,
      });
    }
    setElemAePasser(
      studentEntity.elemAePasser === "Y"
        ? { code: "Y", name: "Yes" }
        : { code: "N", name: "No" }
    );

    if (studentEntity.elemAePasser === "Y") {
      setElemMonthAePasser(
        Months.find((month) => month.shortName === studentEntity.elemAeMonth)
      );
      setElemYearAePasser({
        key: studentEntity.elemAeYear,
        value: studentEntity.elemAeYear,
      });
    }

    setJhsSchoolName(studentEntity.jhsName);
    setJhsSchoolAddress(studentEntity.jhsAddr);
    setJhsRegion(studentEntity.jhsRegion);

    if (studentEntity.jhsCompMonth !== "") {
      setJhsMonthCompletion(
        Months.find((month) => month.shortName === studentEntity.jhsCompMonth)
      );
      setJhsYearCompletion({
        key: studentEntity.jhsCompYear,
        value: studentEntity.jhsCompYear,
      });
    }
    setJhsPeptPasser(
      studentEntity.jhsPeptPasser === "Y"
        ? { code: "Y", name: "Yes" }
        : { code: "N", name: "No" }
    );

    if (studentEntity.jhsPeptPasser === "Y") {
      setJhsMonthPeptPasser(
        Months.find((month) => month.shortName === studentEntity.jhsPeptMonth)
      );
      setJhsYearPeptPasser({
        key: studentEntity.jhsPeptYear,
        value: studentEntity.jhsPeptYear,
      });
    }

    setJhsAePasser(
      studentEntity.jhsAePasser === "Y"
        ? { code: "Y", name: "Yes" }
        : { code: "N", name: "No" }
    );

    if (studentEntity.jhsAePasser === "Y") {
      setJhsMonthAePasser(
        Months.find((month) => month.shortName === studentEntity.jhsAeMonth)
      );
      setJhsYearAePasser({
        key: studentEntity.jhsAeYear,
        value: studentEntity.jhsAeYear,
      });
    }

    setSchoolFirstChoice(studentEntity.shsSchoolFirstChoice);
    setSchoolFirstChoiceOthersName(studentEntity.shsSchoolFirstChoiceOthersNm);
    setSchoolFirstChoiceOthersAddress(
      studentEntity.shsSchoolFirstChoiceOthersAddr
    );
    setTrackFirstChoice(studentEntity.shsTrackFirstChoice);
    setStrandSpecFirstChoice(studentEntity.shsStrSpecFirstChoice);

    setSchoolSecondChoice(studentEntity.shsSchoolSecondChoice);
    setSchoolSecondChoiceOthersName(
      studentEntity.shsSchoolSecondChoiceOthersNm
    );
    setSchoolSecondChoiceOthersAddress(
      studentEntity.shsSchoolSecondChoiceOthersAddr
    );
    setTrackSecondChoice(studentEntity.shsTrackSecondChoice);
    setStrandSpecSecondChoice(studentEntity.shsStrSpecSecondChoice);
  };

  const assignStudentData = () => {
    setStudentEntity({
      ...studentEntity,
      lrnNo: route.params.lrn,
      lastname: lastName,
      firstname: firstName,
      middlename: middleName,
      gender: gender.code,
      dob: `${dobYear.value}-${dobMonth.code}-${dobDay.value}`,
      nationality: nationality,
      birthplace: birthPlace,
      status:
        Object.keys(configs).length > 0
          ? CfgStatuses.find((status) => status.code === "REG")
          : null,
      registrationDate:
        Object.keys(configs).length > 0
          ? configs.find(
              (config) => config.cfMajor === "CFG" && config.cfMinor === "DOR"
            ).cfGeneral1
          : "",
      elemName: elemSchoolName,
      elemSchoolAddr: elemSchoolAddress,
      elemCompMonth: elemMonthCompletion.shortName,
      elemCompYear: elemYearCompletion.value,
      elemRegion: elemRegion,
      elemPeptPasser: elemPeptPasser.code,
      elemPeptMonth: elemMonthPeptPasser.shortName,
      elemPeptYear: elemYearPeptPasser.value,
      elemAePasser: elemAePasser.code,
      elemAeMonth: elemMonthAePasser.shortName,
      elemAeYear: elemYearAePasser.value,
      jhsName: jhsSchoolName,
      jhsAddr: jhsSchoolAddress,
      jhsRegion: jhsRegion,
      jhsCompMonth: jhsMonthCompletion.shortName,
      jhsCompYear: jhsYearCompletion.value,
      jhsPeptPasser: jhsPeptPasser.code,
      jhsPeptMonth: jhsMonthPeptPasser.shortName,
      jhsPeptYear: jhsYearPeptPasser.value,
      jhsAePasser: jhsAePasser.code,
      jhsAeMonth: jhsMonthAePasser.shortName,
      jhsAeYear: jhsYearAePasser.value,
      shsSchoolFirstChoice: schoolFirstChoice,
      shsSchoolFirstChoiceOthersNm: schoolFirstChoiceOthersName,
      shsSchoolFirstChoiceOthersAddr: schoolFirstChoiceOthersAddress,
      shsTrackFirstChoice: trackFirstChoice,
      shsStrSpecFirstChoice: strandSpecFirstChoice,
      shsSchoolSecondChoice: schoolSecondChoice,
      shsSchoolSecondChoiceOthersNm: schoolSecondChoiceOthersName,
      shsSchoolSecondChoiceOthersAddr: schoolSecondChoiceOthersAddress,
      shsTrackSecondChoice: trackSecondChoice,
      shsStrSpecSecondChoice: strandSpecSecondChoice,
      sdtStudentOtherInfo: null,
    });
  };

  const onPressSubmitHandler = () => {
    setSubmitWasPressed(true);
    assignStudentData();
  };

  const onPressCancelHandler = () => {
    Alert.alert(
      "Cancel Registration",
      "This will cancel the registration. Any changes will be discarded, please confirm.",
      [
        {
          text: "Yes",
          onPress: () => navigation.navigate("Home"),
        },
        { text: "No" },
      ]
    );
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
              <Text style={styles.earlyRegistrationTextLabel}>
                {`Note: The below information of student with Deped Learner's Identification Number (LRN): ${
                  route.params.lrn
                } will be recorded for current school year ${
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
              <Text style={styles.earlyRegistrationTextItemTitle}>
                1. Name of Student
              </Text>
              <Text style={styles.earlyRegistrationTextLabel}>Lastname</Text>
              <TextInput
                placeholder="Enter your lastname"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isLastnameValidated")
                      ? errors.field.isLastnameValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                onChangeText={(txtValue) => setLastName(txtValue)}
                maxLength={30}
                value={lastName}
                editable={route.params.lrnStat !== "NR"}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>Firstname</Text>
              <TextInput
                placeholder="Enter your firstname"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isFirstnameValidated")
                      ? errors.field.isFirstnameValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                onChangeText={(txtValue) => setFirstName(txtValue)}
                maxLength={30}
                value={firstName}
                editable={route.params.lrnStat !== "NR"}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>Middlename</Text>
              <TextInput
                placeholder="Enter your middlename"
                placeholderTextColor="#9da4b0"
                style={styles.textInputRegistration}
                onChangeText={(txtValue) => setMiddleName(txtValue)}
                maxLength={30}
                value={middleName}
                editable={route.params.lrnStat !== "NR"}
              />
            </View>

            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                2. Gender
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsGenderModalVisible(true)}
                disabled={route.params.lrnStat === "NR"}
              >
                <TextInput
                  placeholder="Tap to select gender..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty("isGenderValidated")
                        ? errors.field.isGenderValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={gender.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isGenderModalVisible}
                animationType="slide"
                nRequestClose={() => setIsGenderModalVisible(false)}
              >
                <GenderPicker
                  changeGenderModalVisibility={setIsGenderModalVisible}
                  setGender={setGender}
                />
              </Modal>
            </View>

            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                3. Date of birth
              </Text>
              <View style={styles.earlyRegistrationMonthYearContainer}>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchDobInputMonth}
                  activeOpacity={0.8}
                  onPress={() => setIsDobMonthModalVisible(true)}
                  disabled={route.params.lrnStat === "NR"}
                >
                  <TextInput
                    placeholder="Select month..."
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty("isDobValidated")
                          ? errors.field.isDobValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={dobMonth.longName}
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isDobMonthModalVisible}
                  animationType="slide"
                  nRequestClose={() => setIsDobMonthModalVisible(false)}
                >
                  <MonthPicker
                    changeMonthModalVisibility={setIsDobMonthModalVisible}
                    setMonth={setDobMonth}
                  />
                </Modal>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchDobInputDay}
                  activeOpacity={0.8}
                  onPress={() => setIsDobDayModalVisible(true)}
                  disabled={route.params.lrnStat === "NR"}
                >
                  <TextInput
                    placeholder="Select day..."
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty("isDobValidated")
                          ? errors.field.isDobValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={dobDay.value}
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isDobDayModalVisible}
                  animationType="slide"
                  nRequestClose={() => setIsDobDayModalVisible(false)}
                >
                  <DayPicker
                    changeDayModalVisibility={setIsDobDayModalVisible}
                    setDay={setDobDay}
                  />
                </Modal>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchDobInputYear}
                  activeOpacity={0.8}
                  onPress={() => setIsDobYearModalVisible(true)}
                  disabled={route.params.lrnStat === "NR"}
                >
                  <TextInput
                    placeholder="Select year..."
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty("isDobValidated")
                          ? errors.field.isDobValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={dobYear.value}
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isDobYearModalVisible}
                  animationType="slide"
                  nRequestClose={() => setIsDobYearModalVisible(false)}
                >
                  <YearPicker
                    changeYearModalVisibility={setIsDobYearModalVisible}
                    setYear={setDobYear}
                  />
                </Modal>
              </View>
            </View>
            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                4. Place of birth
              </Text>
              <Text style={styles.earlyRegistrationTextLabel}>
                City/Municipality
              </Text>
              <TextInput
                placeholder="Enter your place of birth"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isBirthplaceValidated")
                      ? errors.field.isBirthplaceValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                onChangeText={(txtValue) => setBirthPlace(txtValue)}
                maxLength={255}
                value={birthPlace}
                editable={route.params.lrnStat !== "NR"}
              />
            </View>

            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                5. Nationality
              </Text>
              <Text style={styles.earlyRegistrationTextLabel}>
                Filipino / Korean / Malaysian / Thai / Chinese etc...
              </Text>
              <TextInput
                placeholder="Enter your nationality"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isNationalityValidated")
                      ? errors.field.isNationalityValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                onChangeText={(txtValue) => setNationality(txtValue)}
                maxLength={30}
                value={nationality}
                editable={route.params.lrnStat !== "NR"}
              />
            </View>

            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                6. Learner's Identification Number
              </Text>
              <TextInput
                style={styles.textInputRegistration}
                value={route.params.lrn}
                editable={false}
              />
            </View>

            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                7. Elementary School
              </Text>
              <Text style={styles.earlyRegistrationTextLabel}>School Name</Text>
              <TextInput
                placeholder="[Do not abbreviate] - Enter your school name"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isElemNameValidated")
                      ? errors.field.isElemNameValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                onChangeText={(txtValue) => setElemSchoolName(txtValue)}
                maxLength={255}
                value={elemSchoolName}
                editable={route.params.lrnStat !== "NR"}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                School Address
              </Text>
              <TextInput
                placeholder="Enter your elementary address (city/town or province)"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isElemSchoolAddrValidated")
                      ? errors.field.isElemSchoolAddrValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                onChangeText={(txtValue) => setElemSchoolAddress(txtValue)}
                maxLength={255}
                value={elemSchoolAddress}
                editable={route.params.lrnStat !== "NR"}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Month/Year of Completion
              </Text>
              <View style={styles.earlyRegistrationMonthYearContainer}>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputMonth}
                  activeOpacity={0.8}
                  onPress={() => setIsElemMonthCompletionModalVisible(true)}
                  disabled={route.params.lrnStat === "NR"}
                >
                  <TextInput
                    placeholder="Tap to select month..."
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isElemCompMonthYearValidated"
                          )
                          ? errors.field.isElemCompMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={elemMonthCompletion.longName}
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isElemMonthCompletionModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsElemMonthCompletionModalVisible(false)
                  }
                >
                  <MonthPicker
                    changeMonthModalVisibility={
                      setIsElemMonthCompletionModalVisible
                    }
                    setMonth={setElemMonthCompletion}
                  />
                </Modal>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputYear}
                  activeOpacity={0.8}
                  onPress={() => setIsElemYearCompletionModalVisible(true)}
                  disabled={route.params.lrnStat === "NR"}
                >
                  <TextInput
                    placeholder="Tap to select year..."
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isElemCompMonthYearValidated"
                          )
                          ? errors.field.isElemCompMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={elemYearCompletion.value}
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isElemYearCompletionModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsElemYearCompletionModalVisible(false)
                  }
                >
                  <YearPicker
                    changeYearModalVisibility={
                      setIsElemYearCompletionModalVisible
                    }
                    setYear={setElemYearCompletion}
                  />
                </Modal>
              </View>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>Region</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsElemRegionModalVisible(true)}
                disabled={route.params.lrnStat === "NR"}
              >
                <TextInput
                  placeholder="Tap to select region..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty("isElemRegionValidated")
                        ? errors.field.isElemRegionValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={elemRegion.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isElemRegionModalVisible}
                animationType="slide"
                nRequestClose={() => setIsElemRegionModalVisible(false)}
              >
                <RegionPicker
                  changeRegionModalVisibility={setIsElemRegionModalVisible}
                  setRegion={setElemRegion}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                PEPT for elementary level passer?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsElemPeptPasserModalVisible(true)}
                disabled={route.params.lrnStat === "NR"}
              >
                <TextInput
                  placeholder="Tap to select PEPT for elem level passer..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty("isElemPeptPasserValidated")
                        ? errors.field.isElemPeptPasserValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={elemPeptPasser.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isElemPeptPasserModalVisible}
                animationType="slide"
                nRequestClose={() => setIsElemPeptPasserModalVisible(false)}
              >
                <YesNoPicker
                  changeYesNoVisibility={setIsElemPeptPasserModalVisible}
                  setYesNo={setElemPeptPasser}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                PEPT elementary level passer month/year of completion
              </Text>
              <View style={styles.earlyRegistrationMonthYearContainer}>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputMonth}
                  activeOpacity={0.8}
                  onPress={() => setIsElemMonthPeptPasserModalVisible(true)}
                  disabled={
                    elemPeptPasser.code === "N" || route.params.lrnStat === "NR"
                  }
                >
                  <TextInput
                    placeholder={
                      elemPeptPasser.code === ""
                        ? "Tap to select month..."
                        : elemPeptPasser.code === "N"
                        ? "N/A"
                        : "Tap to select month..."
                    }
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isElemPeptMonthYearValidated"
                          )
                          ? errors.field.isElemPeptMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={
                      elemPeptPasser.code === ""
                        ? elemMonthPeptPasser.longName
                        : elemPeptPasser.code === "Y"
                        ? elemMonthPeptPasser.longName
                        : ""
                    }
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isElemMonthPeptPasserModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsElemMonthPeptPasserModalVisible(false)
                  }
                >
                  <MonthPicker
                    changeMonthModalVisibility={
                      setIsElemMonthPeptPasserModalVisible
                    }
                    setMonth={setElemMonthPeptPasser}
                  />
                </Modal>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputYear}
                  activeOpacity={0.8}
                  onPress={() => setIsElemYearPeptPasserModalVisible(true)}
                  disabled={
                    elemPeptPasser.code === "N" || route.params.lrnStat === "NR"
                  }
                >
                  <TextInput
                    placeholder={
                      elemPeptPasser.code === ""
                        ? "Tap to select year..."
                        : elemPeptPasser.code === "N"
                        ? "N/A"
                        : "Tap to select year..."
                    }
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isElemPeptMonthYearValidated"
                          )
                          ? errors.field.isElemPeptMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={
                      elemPeptPasser.code === ""
                        ? elemYearPeptPasser.value
                        : elemPeptPasser.code === "Y"
                        ? elemYearPeptPasser.value
                        : ""
                    }
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isElemYearPeptPasserModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsElemYearPeptPasserModalVisible(false)
                  }
                >
                  <YearPicker
                    changeYearModalVisibility={
                      setIsElemYearPeptPasserModalVisible
                    }
                    setYear={setElemYearPeptPasser}
                  />
                </Modal>
              </View>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                A & E test for elementary level passer?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsElemAePasserModalVisible(true)}
                disabled={route.params.lrnStat === "NR"}
              >
                <TextInput
                  placeholder="Tap to select A & E for elem level passer..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty("isElemAePasserValidated")
                        ? errors.field.isElemAePasserValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={elemAePasser.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isElemAePasserModalVisible}
                animationType="slide"
                nRequestClose={() => setIsElemPeptPasserModalVisible(false)}
              >
                <YesNoPicker
                  changeYesNoVisibility={setIsElemAePasserModalVisible}
                  setYesNo={setElemAePasser}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                A & E elementary level passer month/year of completion
              </Text>
              <View style={styles.earlyRegistrationMonthYearContainer}>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputMonth}
                  activeOpacity={0.8}
                  onPress={() => setIsElemMonthAePasserModalVisible(true)}
                  disabled={
                    elemAePasser.code === "N" || route.params.lrnStat === "NR"
                  }
                >
                  <TextInput
                    placeholder={
                      elemAePasser.code === ""
                        ? "Tap to select month..."
                        : elemAePasser.code === "N"
                        ? "N/A"
                        : "Tap to select month..."
                    }
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isElemAeMonthYearValidated"
                          )
                          ? errors.field.isElemAeMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={
                      elemAePasser.code === ""
                        ? elemMonthAePasser.longName
                        : elemAePasser.code === "Y"
                        ? elemMonthAePasser.longName
                        : ""
                    }
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isElemMonthAePasserModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsElemMonthAePasserModalVisible(false)
                  }
                >
                  <MonthPicker
                    changeMonthModalVisibility={
                      setIsElemMonthAePasserModalVisible
                    }
                    setMonth={setElemMonthAePasser}
                  />
                </Modal>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputYear}
                  activeOpacity={0.8}
                  onPress={() => setIsElemYearAePasserModalVisible(true)}
                  disabled={
                    elemAePasser.code === "N" || route.params.lrnStat === "NR"
                  }
                >
                  <TextInput
                    placeholder={
                      elemAePasser.code === ""
                        ? "Tap to select year..."
                        : elemAePasser.code === "N"
                        ? "N/A"
                        : "Tap to select year..."
                    }
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isElemAeMonthYearValidated"
                          )
                          ? errors.field.isElemAeMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={elemYearAePasser.value}
                    value={
                      elemAePasser.code === ""
                        ? elemYearAePasser.value
                        : elemAePasser.code === "Y"
                        ? elemYearAePasser.value
                        : ""
                    }
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isElemYearAePasserModalVisible}
                  animationType="slide"
                  nRequestClose={() => setIsElemYearAePasserModalVisible(false)}
                >
                  <YearPicker
                    changeYearModalVisibility={
                      setIsElemYearAePasserModalVisible
                    }
                    setYear={setElemYearAePasser}
                  />
                </Modal>
              </View>
            </View>
            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                8. Junior High School
              </Text>
              <Text style={styles.earlyRegistrationTextLabel}>School Name</Text>
              <TextInput
                placeholder="[Do not abbreviate] - Enter your junior high school name"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isJhsNameValidated")
                      ? errors.field.isJhsNameValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                onChangeText={(txtValue) => setJhsSchoolName(txtValue)}
                maxLength={255}
                value={jhsSchoolName}
                editable={route.params.lrnStat !== "NR"}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                School Address
              </Text>
              <TextInput
                placeholder="Enter your high school address (city/town or province)"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isJhsAddrValidated")
                      ? errors.field.isJhsAddrValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                onChangeText={(txtValue) => setJhsSchoolAddress(txtValue)}
                maxLength={255}
                value={jhsSchoolAddress}
                editable={route.params.lrnStat !== "NR"}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Month/Year of Completion
              </Text>
              <View style={styles.earlyRegistrationMonthYearContainer}>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputMonth}
                  activeOpacity={0.8}
                  onPress={() => setIsJhsMonthCompletionModalVisible(true)}
                  disabled={route.params.lrnStat === "NR"}
                >
                  <TextInput
                    placeholder="Tap to select month..."
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isJhsMonthYearCompletionValidated"
                          )
                          ? errors.field.isJhsMonthYearCompletionValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={jhsMonthCompletion.longName}
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isJhsMonthCompletionModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsJhsMonthCompletionModalVisible(false)
                  }
                >
                  <MonthPicker
                    changeMonthModalVisibility={
                      setIsJhsMonthCompletionModalVisible
                    }
                    setMonth={setJhsMonthCompletion}
                  />
                </Modal>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputYear}
                  activeOpacity={0.8}
                  onPress={() => setIsJhsYearCompletionModalVisible(true)}
                  disabled={route.params.lrnStat === "NR"}
                >
                  <TextInput
                    placeholder="Tap to select year..."
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isJhsMonthYearCompletionValidated"
                          )
                          ? errors.field.isJhsMonthYearCompletionValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={jhsYearCompletion.value}
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isJhsYearCompletionModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsJhsYearCompletionModalVisible(false)
                  }
                >
                  <YearPicker
                    changeYearModalVisibility={
                      setIsJhsYearCompletionModalVisible
                    }
                    setYear={setJhsYearCompletion}
                  />
                </Modal>
              </View>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>Region</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsJhsRegionModalVisible(true)}
                disabled={route.params.lrnStat === "NR"}
              >
                <TextInput
                  placeholder="Tap to select region..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty("isJhsRegionValidated")
                        ? errors.field.isJhsRegionValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={jhsRegion.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isJhsRegionModalVisible}
                animationType="slide"
                nRequestClose={() => setIsJhsRegionModalVisible(false)}
              >
                <RegionPicker
                  changeRegionModalVisibility={setIsJhsRegionModalVisible}
                  setRegion={setJhsRegion}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                PEPT for junior high school level passer?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsJhsPeptPasserModalVisible(true)}
                disabled={route.params.lrnStat === "NR"}
              >
                <TextInput
                  placeholder="Tap to select PEPT JHS level passer..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty("isJhsPeptPasserValidated")
                        ? errors.field.isJhsPeptPasserValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={jhsPeptPasser.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isJhsPeptPasserModalVisible}
                animationType="slide"
                nRequestClose={() => setIsJhsPeptPasserModalVisible(false)}
              >
                <YesNoPicker
                  changeYesNoVisibility={setIsJhsPeptPasserModalVisible}
                  setYesNo={setJhsPeptPasser}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                PEPT junior high school level passer month/year of completion
              </Text>
              <View style={styles.earlyRegistrationMonthYearContainer}>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputMonth}
                  activeOpacity={0.8}
                  onPress={() => setIsJhsMonthPeptPasserModalVisible(true)}
                  disabled={
                    jhsPeptPasser.code === "N" || route.params.lrnStat === "NR"
                  }
                >
                  <TextInput
                    placeholder={
                      jhsPeptPasser.code === ""
                        ? "Tap to select month..."
                        : jhsPeptPasser.code === "N"
                        ? "N/A"
                        : "Tap to select month..."
                    }
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isJhsPeptMonthYearValidated"
                          )
                          ? errors.field.isJhsPeptMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={
                      jhsPeptPasser.code === ""
                        ? jhsMonthPeptPasser.longName
                        : jhsPeptPasser.code === "Y"
                        ? jhsMonthPeptPasser.longName
                        : ""
                    }
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isJhsMonthPeptPasserModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsJhsMonthPeptPasserModalVisible(false)
                  }
                >
                  <MonthPicker
                    changeMonthModalVisibility={
                      setIsJhsMonthPeptPasserModalVisible
                    }
                    setMonth={setJhsMonthPeptPasser}
                  />
                </Modal>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputYear}
                  activeOpacity={0.8}
                  onPress={() => setIsJhsYearPeptPasserModalVisible(true)}
                  disabled={
                    jhsPeptPasser.code === "N" || route.params.lrnStat === "NR"
                  }
                >
                  <TextInput
                    placeholder={
                      jhsPeptPasser.code === ""
                        ? "Tap to select year..."
                        : jhsPeptPasser.code === "N"
                        ? "N/A"
                        : "Tap to select year..."
                    }
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isJhsPeptMonthYearValidated"
                          )
                          ? errors.field.isJhsPeptMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={
                      jhsPeptPasser.code === ""
                        ? jhsYearPeptPasser.value
                        : jhsPeptPasser.code === "Y"
                        ? jhsYearPeptPasser.value
                        : ""
                    }
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isJhsYearPeptPasserModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsJhsYearPeptPasserModalVisible(false)
                  }
                >
                  <YearPicker
                    changeYearModalVisibility={
                      setIsJhsYearPeptPasserModalVisible
                    }
                    setYear={setJhsYearPeptPasser}
                  />
                </Modal>
              </View>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                A & E test for junior high school level passer?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsJhsAePasserModalVisible(true)}
                disabled={route.params.lrnStat === "NR"}
              >
                <TextInput
                  placeholder="Tap to select A & E JHS level passer..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty("isJhsAePasserValidated")
                        ? errors.field.isJhsAePasserValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={jhsAePasser.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isJhsAePasserModalVisible}
                animationType="slide"
                nRequestClose={() => setIsJhsPeptPasserModalVisible(false)}
              >
                <YesNoPicker
                  changeYesNoVisibility={setIsJhsAePasserModalVisible}
                  setYesNo={setJhsAePasser}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                A & E junior high school level passer month/year of completion
              </Text>
              <View style={styles.earlyRegistrationMonthYearContainer}>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputMonth}
                  activeOpacity={0.8}
                  onPress={() => setIsJhsMonthAePasserModalVisible(true)}
                  disabled={
                    jhsAePasser.code === "N" || route.params.lrnStat === "NR"
                  }
                >
                  <TextInput
                    placeholder={
                      jhsAePasser.code === ""
                        ? "Tap to select month..."
                        : jhsAePasser.code === "N"
                        ? "N/A"
                        : "Tap to select month..."
                    }
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isJhsAeMonthYearValidated"
                          )
                          ? errors.field.isJhsAeMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={
                      jhsAePasser.code === ""
                        ? jhsMonthAePasser.longName
                        : jhsAePasser.code === "Y"
                        ? jhsMonthAePasser.longName
                        : ""
                    }
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isJhsMonthAePasserModalVisible}
                  animationType="slide"
                  nRequestClose={() => setIsJhsMonthAePasserModalVisible(false)}
                >
                  <MonthPicker
                    changeMonthModalVisibility={
                      setIsJhsMonthAePasserModalVisible
                    }
                    setMonth={setJhsMonthAePasser}
                  />
                </Modal>
                <TouchableOpacity
                  style={styles.earlyRegistrationTouchInputYear}
                  activeOpacity={0.8}
                  onPress={() => setIsJhsYearAePasserModalVisible(true)}
                  disabled={
                    jhsAePasser.code === "N" || route.params.lrnStat === "NR"
                  }
                >
                  <TextInput
                    placeholder={
                      jhsAePasser.code === ""
                        ? "Tap to select year..."
                        : jhsAePasser.code === "N"
                        ? "N/A"
                        : "Tap to select year..."
                    }
                    placeholderTextColor="#9da4b0"
                    style={
                      errors.hasOwnProperty("field")
                        ? errors.field.hasOwnProperty(
                            "isJhsAeMonthYearValidated"
                          )
                          ? errors.field.isJhsAeMonthYearValidated
                            ? styles.textInputRegistration
                            : "status" in studentEntity &&
                              studentEntity.status.code !== ""
                            ? styles.earlyRegistrationTextInputValidation
                            : styles.textInputRegistration
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                    }
                    editable={false}
                    value={
                      jhsAePasser.code === ""
                        ? jhsYearAePasser.value
                        : jhsAePasser.code === "Y"
                        ? jhsYearAePasser.value
                        : ""
                    }
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isJhsYearAePasserModalVisible}
                  animationType="slide"
                  nRequestClose={() => setIsJhsYearAePasserModalVisible(false)}
                >
                  <YearPicker
                    changeYearModalVisibility={setIsJhsYearAePasserModalVisible}
                    setYear={setJhsYearAePasser}
                  />
                </Modal>
              </View>
            </View>
            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
              <Text style={styles.earlyRegistrationTextItemTitle}>
                9. Senior High School applied for
              </Text>
              <Text style={styles.earlyRegistrationTextChoiceLabel}>
                First Choice
              </Text>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>School</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsSchoolFirstChoiceModalVisible(true);
                  setTrackFirstChoice({
                    id: 0,
                    chId: 0,
                    code: "",
                    name: "",
                  });
                  setStrandSpecFirstChoice({
                    id: 0,
                    chId: 0,
                    ctId: 0,
                    code: "",
                    name: "",
                  });
                }}
                disabled={route.params.lrnStat === "NR"}
              >
                <TextInput
                  placeholder="Tap to select school..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isShsSchoolFirstChoiceValidated"
                        )
                        ? errors.field.isShsSchoolFirstChoiceValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={schoolFirstChoice.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isSchoolFirstChoiceModalVisible}
                animationType="slide"
                nRequestClose={() => setIsSchoolFirstChoiceModalVisible(false)}
              >
                <SchoolPicker
                  changeSchoolModalVisibility={
                    setIsSchoolFirstChoiceModalVisible
                  }
                  setSchool={setSchoolFirstChoice}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Other school name
              </Text>
              <TextInput
                placeholder={
                  schoolFirstChoice.code === "999"
                    ? "Enter other school name"
                    : schoolFirstChoice.code === ""
                    ? "Applicable only if you select 'Other Schools'"
                    : "N/A"
                }
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isShsSchoolFirstChoiceOthersNmValidated"
                      )
                      ? errors.field.isShsSchoolFirstChoiceOthersNmValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                editable={
                  schoolFirstChoice.code === "999" &&
                  route.params.lrnStat !== "NR"
                }
                onChangeText={(txtValue) => {
                  setSchoolFirstChoiceOthersName(txtValue);
                }}
                maxLength={255}
                value={schoolFirstChoiceOthersName}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Other school address
              </Text>
              <TextInput
                placeholder={
                  schoolFirstChoice.code === "999"
                    ? "Enter other school address"
                    : schoolFirstChoice.code === ""
                    ? "Applicable only if you select 'Other Schools'"
                    : "N/A"
                }
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isShsSchoolFirstChoiceOthersAddrValidated"
                      )
                      ? errors.field.isShsSchoolFirstChoiceOthersAddrValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                editable={
                  schoolFirstChoice.code === "999" &&
                  route.params.lrnStat !== "NR"
                }
                onChangeText={(txtValue) =>
                  setSchoolFirstChoiceOthersAddress(txtValue)
                }
                maxLength={255}
                value={schoolFirstChoiceOthersAddress}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>Track</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsTrackFirstChoiceModalVisible(true);
                  setStrandSpecFirstChoice({
                    id: 0,
                    chId: 0,
                    ctId: 0,
                    code: "",
                    name: "",
                  });
                }}
                disabled={
                  schoolFirstChoice.code === "" || route.params.lrnStat === "NR"
                }
              >
                <TextInput
                  placeholder="Tap to select track..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isShsTrackFirstChoiceValidated"
                        )
                        ? errors.field.isShsTrackFirstChoiceValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={trackFirstChoice.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isTrackFirstChoiceModalVisible}
                animationType="slide"
                nRequestClose={() => setIsTrackFirstChoiceModalVisible(false)}
              >
                <TrackPicker
                  changeTrackModalVisibility={setIsTrackFirstChoiceModalVisible}
                  selectedSchool={schoolFirstChoice}
                  setTrack={setTrackFirstChoice}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Strand/Specialization
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsStrandSpecFirstChoiceModalVisible(true)}
                disabled={
                  trackFirstChoice.code === "" || route.params.lrnStat === "NR"
                }
              >
                <TextInput
                  placeholder="Tap to select strand or specialization..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isShsStrSpecFirstChoiceValidated"
                        )
                        ? errors.field.isShsStrSpecFirstChoiceValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={strandSpecFirstChoice.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isStrandSpecFirstChoiceModalVisible}
                animationType="slide"
                nRequestClose={() =>
                  setIsStrandSpecFirstChoiceModalVisible(false)
                }
              >
                <StrandSpecPicker
                  changeStrandSpecModalVisibility={
                    setIsStrandSpecFirstChoiceModalVisible
                  }
                  selectedSchool={schoolFirstChoice}
                  selectedTrack={trackFirstChoice}
                  setStrandSpec={setStrandSpecFirstChoice}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextChoiceLabel}>
                Second Choice
              </Text>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>School</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsSchoolSecondChoiceModalVisible(true);
                  setTrackSecondChoice({
                    id: 0,
                    chId: 0,
                    code: "",
                    name: "",
                  });
                  setStrandSpecSecondChoice({
                    id: 0,
                    chId: 0,
                    ctId: 0,
                    code: "",
                    name: "",
                  });
                }}
                disabled={route.params.lrnStat === "NR"}
              >
                <TextInput
                  placeholder="Tap to select school..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isShsSchoolSecondChoiceOthersNmValidated"
                        )
                        ? errors.field.isShsSchoolSecondChoiceOthersNmValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={schoolSecondChoice.name}
                  maxLength={255}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isSchoolSecondChoiceModalVisible}
                animationType="slide"
                nRequestClose={() => setIsSchoolSecondChoiceModalVisible(false)}
              >
                <SchoolPicker
                  changeSchoolModalVisibility={
                    setIsSchoolSecondChoiceModalVisible
                  }
                  setSchool={setSchoolSecondChoice}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Other school name
              </Text>
              <TextInput
                placeholder={
                  schoolSecondChoice.code === "999"
                    ? "Enter other school name"
                    : schoolSecondChoice.code === ""
                    ? "Applicable only if you select 'Other Schools'"
                    : "N/A"
                }
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isShsSchoolSecondChoiceOthersNmValidated"
                      )
                      ? errors.field.isShsSchoolSecondChoiceOthersNmValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                editable={
                  schoolSecondChoice.code === "999" &&
                  route.params.lrnStat !== "NR"
                }
                onChangeText={(txtValue) => {
                  setSchoolSecondChoiceOthersName(txtValue);
                }}
                maxLength={255}
                value={schoolSecondChoiceOthersName}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Other school address
              </Text>
              <TextInput
                placeholder={
                  schoolSecondChoice.code === "999"
                    ? "Enter other school address"
                    : schoolSecondChoice.code === ""
                    ? "Applicable only if you select 'Other Schools'"
                    : "N/A"
                }
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isShsSchoolSecondChoiceOthersAddrValidated"
                      )
                      ? errors.field.isShsSchoolSecondChoiceOthersAddrValidated
                        ? styles.textInputRegistration
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.earlyRegistrationTextInputValidation
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                    : styles.textInputRegistration
                }
                editable={
                  schoolSecondChoice.code === "999" &&
                  route.params.lrnStat !== "NR"
                }
                onChangeText={(txtValue) =>
                  setSchoolSecondChoiceOthersAddress(txtValue)
                }
                maxLength={255}
                value={schoolSecondChoiceOthersAddress}
              />
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>Track</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsTrackSecondChoiceModalVisible(true);
                  setStrandSpecSecondChoice({
                    id: 0,
                    chId: 0,
                    ctId: 0,
                    code: "",
                    name: "",
                  });
                }}
                disabled={
                  schoolSecondChoice.code === "" ||
                  route.params.lrnStat === "NR"
                }
              >
                <TextInput
                  placeholder="Tap to select track..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isShsTrackSecondChoiceValidated"
                        )
                        ? errors.field.isShsTrackSecondChoiceValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={trackSecondChoice.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isTrackSecondChoiceModalVisible}
                animationType="slide"
                nRequestClose={() => setIsTrackSecondChoiceModalVisible(false)}
              >
                <TrackPicker
                  changeTrackModalVisibility={
                    setIsTrackSecondChoiceModalVisible
                  }
                  selectedSchool={schoolSecondChoice}
                  setTrack={setTrackSecondChoice}
                />
              </Modal>
              <View style={styles.earlyRegistrationGapperSM} />
              <Text style={styles.earlyRegistrationTextLabel}>
                Strand/Specialization
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsStrandSpecSecondChoiceModalVisible(true)}
                disabled={
                  trackSecondChoice.code === "" || route.params.lrnStat === "NR"
                }
              >
                <TextInput
                  placeholder="Tap to select strand or specialization..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isShsStrandSpecSecondChoiceValidated"
                        )
                        ? errors.field.isShsStrandSpecSecondChoiceValidated
                          ? styles.textInputRegistration
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.earlyRegistrationTextInputValidation
                          : styles.textInputRegistration
                        : styles.textInputRegistration
                      : styles.textInputRegistration
                  }
                  editable={false}
                  value={strandSpecSecondChoice.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isStrandSpecSecondChoiceModalVisible}
                animationType="slide"
                nRequestClose={() =>
                  setIsStrandSpecSecondChoiceModalVisible(false)
                }
              >
                <StrandSpecPicker
                  changeStrandSpecModalVisibility={
                    setIsStrandSpecSecondChoiceModalVisible
                  }
                  selectedSchool={schoolSecondChoice}
                  selectedTrack={trackSecondChoice}
                  setStrandSpec={setStrandSpecSecondChoice}
                />
              </Modal>
            </View>

            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
            </View>

            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationButtonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPressSubmitHandler}
                  style={styles.earlyRegistrationSubmitButtonContainer}
                >
                  <Text style={styles.earlyRegistrationButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPressCancelHandler}
                  style={styles.earlyRegistrationCancelButtonContainer}
                >
                  <Text style={styles.earlyRegistrationButtonText}>Cancel</Text>
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={isValidationDisplayModalVisible}
                  animationType="slide"
                  nRequestClose={() =>
                    setIsValidationDisplayModalVisible(false)
                  }
                >
                  <ValidationDisplay
                    messages={errors.messages}
                    setIsValidationDisplayModalVisible={
                      setIsValidationDisplayModalVisible
                    }
                  />
                </Modal>
              </View>
            </View>

            <View style={styles.earlyRegistrationItem}>
              <View style={styles.earlyRegistrationGapperM} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  earlyRegistrationTextInputValidation: {
    borderWidth: 2,
    borderColor: "#f06e65",
    color: "#fff",
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
  },
  earlyRegistrationMonthYearContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  earlyRegistrationTouchInputMonth: {
    width: "55%",
  },
  earlyRegistrationTouchInputYear: {
    width: "43%",
  },

  earlyRegistrationTouchDobInputMonth: {
    width: "38%",
  },
  earlyRegistrationTouchDobInputDay: {
    width: "28%",
  },
  earlyRegistrationTouchDobInputYear: {
    width: "28%",
  },
  earlyRegistrationSubmitButtonContainer: {
    elevation: 8,
    backgroundColor: "#3e85f7",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 100,
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
    width: 100,
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

export default EarlyRegistrationScreen;
