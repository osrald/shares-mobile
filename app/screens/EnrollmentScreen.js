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
import YesNoPicker from "../components/YesNoPicker";
import TrackPicker from "../components/TrackPicker";
import StrandSpecPicker from "../components/StrandSpecPicker";
import StudentEntity from "../localdata/StudentEntity";
import Validate from "../validators/EnrollmentScreenValidator";
import ValidationDisplay from "../components/ValidationDisplay";
import Auth from "../Auth";
import BarangayPicker from "../components/BarangayPicker";
import GuardianRelationPicker from "../components/GuardianRelationPicker";

function EnrollmentScreen({ navigation, route }) {
  const [studentEntity, setStudentEntity] = useState(
    StudentEntity.initializeExtended()
  );
  const [errors, setErrors] = useState({});
  const [isValidationDisplayModalVisible, setIsValidationDisplayModalVisible] =
    useState(false);
  const [submitWasPressed, setSubmitWasPressed] = useState(false);

  const [
    isAddrMakatiResidentModalVisible,
    setIsAddrMakatiResidentModalVisible,
  ] = useState(false);

  const [
    isAddrMakatiResidentBarangayModalVisible,
    setIsAddrMakatiResidentBarangayModalVisible,
  ] = useState(false);

  const [isGuardianRelationModalVisible, setIsGuardianRelationModalVisible] =
    useState(false);

  const [isShsTrackEnrolledModalVisible, setIsShsTrackEnrolledModalVisible] =
    useState(false);

  const [
    isShsStrandSpecEnrolledModalVisible,
    setIsShsStrandSpecEnrolledModalVisible,
  ] = useState(false);

  useEffect(() => {
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
          setStudentEntity(
            StudentEntity.prepareEnrollmentEntity(response.data)
          );
        });
    });
  }, []);

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
            "Confirm Enrollment",
            "This will enroll the indicated student, please confirm.",
            [
              {
                text: "Yes",
                onPress: () => onEnroll(),
              },
              { text: "No" },
            ]
          );
        }
      }
    }
  }, [errors]);

  const changeAddrMakatiResident = (item) => {
    if (item.code === "Y") {
      setStudentEntity({
        ...studentEntity,
        addrMakatiResident: item.code,
        addrCityMunicipality: "Makati City",
      });
    } else if (item.code === "N") {
      setStudentEntity({
        ...studentEntity,
        addrMakatiResident: item.code,
        addrCityMunicipality: "",
      });
    }
  };

  const changeShsTrackEnrolled = (track) => {
    setStudentEntity({ ...studentEntity, shsTrackEnrolled: track });
  };

  const changeShsStrandSpecEnrolled = (strandSpec) => {
    setStudentEntity({ ...studentEntity, shsStrSpecEnrolled: strandSpec });
  };

  const onEnroll = () => {
    Auth.getAuhorization().then((bearer) => {
      axios
        .put(
          Constants.manifest.extra.sysEnv === "PRODUCTION"
            ? `${Constants.manifest.extra.apiProdBaseURL}studentEnroll`
            : `${Constants.manifest.extra.apiDevBaseURL}studentEnroll`,
          studentEntity,
          {
            headers: {
              Authorization: bearer.data,
            },
          }
        )
        .then((response) => {
          navigation.navigate("EnrollmentInfo", { lrn: response.data.lrnNo });
        });
    });
  };

  const onPressSubmitHandler = () => {
    setSubmitWasPressed(true);
    setStudentEntity({
      ...studentEntity,
      status: CfgStatuses.find((status) => status.code === "CEN"),
      shsSem: route.params.currSem,
      shsDateEnrolled: route.params.enrollDate,
    });
    setErrors(Validate(studentEntity));
  };

  const onPressCancelHandler = () => {
    Alert.alert(
      "Cancel Enrollment",
      "This will cancel the enrollment. Any changes will be discarded, please confirm.",
      [
        {
          text: "Yes",
          onPress: () => navigation.navigate("Home"),
        },
        { text: "No" },
      ]
    );
  };

  const displayAddrBarangay = () => {
    if (
      studentEntity.addrMakatiResident &&
      studentEntity.addrMakatiResident === "Y"
    ) {
      return (
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsAddrMakatiResidentBarangayModalVisible(true)}
          >
            <TextInput
              placeholder="Tap to select barangay..."
              placeholderTextColor="#9da4b0"
              style={
                errors.hasOwnProperty("field")
                  ? errors.field.hasOwnProperty(
                      "isAddrMakatiResidentBarangayValidated"
                    )
                    ? errors.field.isAddrMakatiResidentBarangayValidated
                      ? styles.textInputEnrollment
                      : "status" in studentEntity &&
                        studentEntity.status.code !== ""
                      ? styles.enrollmentTextInputValidation
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                  : styles.textInputEnrollment
              }
              editable={false}
              value={
                studentEntity.addrMakatiResidentBarangay &&
                studentEntity.addrMakatiResidentBarangay.name
              }
            />
          </TouchableOpacity>
          <Modal
            transparent={true}
            visible={isAddrMakatiResidentBarangayModalVisible}
            animationType="slide"
            nRequestClose={() =>
              setIsAddrMakatiResidentBarangayModalVisible(false)
            }
          >
            <BarangayPicker
              changeBarangayModalVisibility={
                setIsAddrMakatiResidentBarangayModalVisible
              }
              studentEntity={studentEntity}
              setBarangay={setStudentEntity}
            />
          </Modal>
        </View>
      );
    } else {
      return (
        <TextInput
          placeholder="Enter your barangay"
          placeholderTextColor="#9da4b0"
          style={
            errors.hasOwnProperty("field")
              ? errors.field.hasOwnProperty("isAddrBarangayValidated")
                ? errors.field.isAddrBarangayValidated
                  ? styles.textInputEnrollment
                  : "status" in studentEntity &&
                    studentEntity.status.code !== ""
                  ? styles.enrollmentTextInputValidation
                  : styles.textInputEnrollment
                : styles.textInputEnrollment
              : styles.textInputEnrollment
          }
          onChangeText={(txtValue) =>
            setStudentEntity({ ...studentEntity, addrBarangay: txtValue })
          }
          maxLength={95}
          value={studentEntity.addrBarangay}
        />
      );
    }
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
              <Text style={styles.enrollmentTextLabel}>
                {`Note: The below student's information with LRN: ${route.params.lrn} will be enrolled for this current school year ${route.params.currSy}.`}
              </Text>
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>1. Enrollment</Text>
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Learner's Reference Number
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={route.params.lrn}
                editable={false}
              />
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextLabel}>Date of Enrollment</Text>
              <TextInput
                placeholder="This is a read-only field."
                placeholderTextColor="#9da4b0"
                style={styles.textInputEnrollment}
                value={studentEntity.shsDateEnrolled}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>School Year</Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.shsSy}
                editable={false}
              />
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextLabel}>Grade & Section</Text>
              <TextInput
                placeholder="This is a read-only field."
                placeholderTextColor="#9da4b0"
                style={styles.textInputEnrollment}
                value={studentEntity.shsGradeSection}
                editable={false}
              />
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextLabel}>Exam Result</Text>
              <TextInput
                placeholder="This is a read-only field."
                placeholderTextColor="#9da4b0"
                style={styles.textInputEnrollment}
                value={studentEntity.shsExamResult}
                editable={false}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>
                2. Name of Student
              </Text>
              <Text style={styles.enrollmentTextLabel}>Lastname</Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.lastname}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Firstname</Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.firstname}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Middlename</Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.middlename}
                editable={false}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>2. Gender</Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.gender === "M" ? "Male" : "Female"}
                editable={false}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>
                3. Other Information
              </Text>
              <Text style={styles.enrollmentTextLabel}>Date of Birth</Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.dob}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Place of Birth</Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.birthplace}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Religion</Text>
              <TextInput
                placeholder="Enter your religion"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isReligionValidated")
                      ? errors.field.isReligionValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      religion: txtValue,
                    },
                  })
                }
                maxLength={45}
                value={studentEntity.sdtStudentOtherInfo.religion}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Dialect</Text>
              <TextInput
                placeholder="Enter your dialect"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isDialectSpokenValidated")
                      ? errors.field.isDialectSpokenValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      dialectSpoken: txtValue,
                    },
                  })
                }
                maxLength={100}
                value={studentEntity.sdtStudentOtherInfo.dialectSpoken}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>4. Address</Text>
              <Text style={styles.enrollmentTextLabel}>House No.</Text>
              <TextInput
                placeholder="Enter your house number"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isAddrHouseNoValidated")
                      ? errors.field.isAddrHouseNoValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    addrHouseNo: txtValue,
                  })
                }
                maxLength={45}
                value={studentEntity.addrHouseNo}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Street</Text>
              <TextInput
                placeholder="Enter your street"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isAddrStreetValidated")
                      ? errors.field.isAddrStreetValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({ ...studentEntity, addrStreet: txtValue })
                }
                maxLength={95}
                value={studentEntity.addrStreet}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Are you a resident of Makati?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsAddrMakatiResidentModalVisible(true)}
              >
                <TextInput
                  placeholder="Tap to select if Makati resident..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isAddrMakatiResidentValidated"
                        )
                        ? errors.field.isAddrMakatiResidentValidated
                          ? styles.textInputEnrollment
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.enrollmentTextInputValidation
                          : styles.textInputEnrollment
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                  }
                  editable={false}
                  value={
                    studentEntity.addrMakatiResident === ""
                      ? ""
                      : studentEntity.addrMakatiResident === "Y"
                      ? "Yes"
                      : "No"
                  }
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isAddrMakatiResidentModalVisible}
                animationType="slide"
                nRequestClose={() => setIsAddrMakatiResidentModalVisible(false)}
              >
                <YesNoPicker
                  changeYesNoVisibility={setIsAddrMakatiResidentModalVisible}
                  setYesNo={changeAddrMakatiResident}
                />
              </Modal>
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Barangay</Text>
              {displayAddrBarangay()}
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>City/Municipality</Text>
              <TextInput
                placeholder="Enter your city/municipality"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isAddrCityMunicipalityValidated"
                      )
                      ? errors.field.isAddrCityMunicipalityValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    addrCityMunicipality:
                      studentEntity.addrMakatiResident === "Y"
                        ? "Makati City"
                        : txtValue,
                  })
                }
                maxLength={95}
                value={studentEntity.addrCityMunicipality}
                editable={studentEntity.addrMakatiResident !== "Y"}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>
                6. Supplemental Information
              </Text>
              <Text style={styles.enrollmentTextLabel}>Name of Father</Text>
              <TextInput
                placeholder="Enter your father's name"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isFathersNameValidated")
                      ? errors.field.isFathersNameValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      fathersName: txtValue,
                    },
                  })
                }
                maxLength={50}
                value={studentEntity.sdtStudentOtherInfo.fathersName}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Father's Occupation
              </Text>
              <TextInput
                placeholder="Enter your father's occupation"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isFathersOccupationValidated"
                      )
                      ? errors.field.isFathersOccupationValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      fathersOccupation: txtValue,
                    },
                  })
                }
                maxLength={45}
                value={studentEntity.sdtStudentOtherInfo.fathersOccupation}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Father's contact number
              </Text>
              <TextInput
                placeholder="Enter your father's contact number"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isFathersContactNoValidated")
                      ? errors.field.isFathersContactNoValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      fathersContactNo: txtValue,
                    },
                  })
                }
                maxLength={45}
                value={studentEntity.sdtStudentOtherInfo.fathersContactNo}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Name of Mother</Text>
              <TextInput
                placeholder="Enter your mother's name"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isMothersNameValidated")
                      ? errors.field.isMothersNameValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      mothersName: txtValue,
                    },
                  })
                }
                maxLength={50}
                value={studentEntity.sdtStudentOtherInfo.mothersName}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Mother's Occupation
              </Text>
              <TextInput
                placeholder="Enter your mother's occupation"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isMothersOccupationValidated"
                      )
                      ? errors.field.isMothersOccupationValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      mothersOccupation: txtValue,
                    },
                  })
                }
                maxLength={45}
                value={studentEntity.sdtStudentOtherInfo.mothersOccupation}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Mother's contact number
              </Text>
              <TextInput
                placeholder="Enter your mother's contact number"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isMothersContactNoValidated")
                      ? errors.field.isMothersContactNoValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      mothersContactNo: txtValue,
                    },
                  })
                }
                maxLength={45}
                value={studentEntity.sdtStudentOtherInfo.mothersContactNo}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Name of Guardian</Text>
              <TextInput
                placeholder="Enter your guardian's name"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isGuardianNameValidated")
                      ? errors.field.isGuardianNameValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      guardianName: txtValue,
                    },
                  })
                }
                maxLength={50}
                value={studentEntity.sdtStudentOtherInfo.guardianName}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Guardian's Occupation
              </Text>
              <TextInput
                placeholder="Enter your guardian's occupation"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isGuardianOccupationValidated"
                      )
                      ? errors.field.isGuardianOccupationValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      guardianOccupation: txtValue,
                    },
                  })
                }
                maxLength={45}
                value={studentEntity.sdtStudentOtherInfo.guardianOccupation}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Guardian's contact number
              </Text>
              <TextInput
                placeholder="Enter your guardian's contact number"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isGuardianContactNoValidated"
                      )
                      ? errors.field.isGuardianContactNoValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      guardianContactNo: txtValue,
                    },
                  })
                }
                maxLength={45}
                value={studentEntity.sdtStudentOtherInfo.guardianContactNo}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Relationship with Guardian
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsGuardianRelationModalVisible(true)}
              >
                <TextInput
                  placeholder="Tap to select guardian relation type..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isGuardianRelationValidated"
                        )
                        ? errors.field.isGuardianRelationValidated
                          ? styles.textInputEnrollment
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.enrollmentTextInputValidation
                          : styles.textInputEnrollment
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                  }
                  editable={false}
                  value={studentEntity.sdtStudentOtherInfo.guardianRelation}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isGuardianRelationModalVisible}
                animationType="slide"
                nRequestClose={() => setIsGuardianRelationModalVisible(false)}
              >
                <GuardianRelationPicker
                  changeGuardianRelationVisibility={
                    setIsGuardianRelationModalVisible
                  }
                  studentEntity={studentEntity}
                  setGuardianRelation={setStudentEntity}
                />
              </Modal>
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Guardian's address</Text>
              <TextInput
                placeholder="Enter your guardian's address"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isGuardianAddressValidated")
                      ? errors.field.isGuardianAddressValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    sdtStudentOtherInfo: {
                      ...studentEntity.sdtStudentOtherInfo,
                      guardianAddress: txtValue,
                    },
                  })
                }
                maxLength={255}
                value={studentEntity.sdtStudentOtherInfo.guardianAddress}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>
                7. Last School Attended
              </Text>
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Name of Last School Attended
              </Text>
              <TextInput
                placeholder="Enter name of last school attended"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isLastSchoolAttendedValidated"
                      )
                      ? errors.field.isLastSchoolAttendedValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    lastSchoolAttended: txtValue,
                  })
                }
                maxLength={255}
                value={studentEntity.lastSchoolAttended}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Address of Last School Attended
              </Text>
              <TextInput
                placeholder="Enter address of last school attended"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isLastSchoolAddressValidated"
                      )
                      ? errors.field.isLastSchoolAddressValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    lastSchoolAddress: txtValue,
                  })
                }
                maxLength={255}
                value={studentEntity.lastSchoolAddress}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                School Average Grade
              </Text>
              <TextInput
                placeholder="Enter your last school average grade"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isLastSchoolAverageValidated"
                      )
                      ? errors.field.isLastSchoolAverageValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    lastSchoolAverage: txtValue,
                  })
                }
                maxLength={10}
                value={studentEntity.lastSchoolAverage}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Former Year & Section
              </Text>
              <TextInput
                placeholder="Enter your former year & section"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isLastSchoolYearSectionValidated"
                      )
                      ? errors.field.isLastSchoolYearSectionValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    lastSchoolYearSection: txtValue,
                  })
                }
                maxLength={45}
                value={studentEntity.lastSchoolYearSection}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Former Adviser</Text>
              <TextInput
                placeholder="Enter your previous school adviser"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty(
                        "isLastSchoolAdviserValidated"
                      )
                      ? errors.field.isLastSchoolAdviserValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({
                    ...studentEntity,
                    lastSchoolAdviser: txtValue,
                  })
                }
                maxLength={45}
                value={studentEntity.lastSchoolAdviser}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Former School Year</Text>
              <TextInput
                placeholder="Enter your previous school year"
                placeholderTextColor="#9da4b0"
                style={
                  errors.hasOwnProperty("field")
                    ? errors.field.hasOwnProperty("isLastSchoolSyValidated")
                      ? errors.field.isLastSchoolSyValidated
                        ? styles.textInputEnrollment
                        : "status" in studentEntity &&
                          studentEntity.status.code !== ""
                        ? styles.enrollmentTextInputValidation
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                    : styles.textInputEnrollment
                }
                onChangeText={(txtValue) =>
                  setStudentEntity({ ...studentEntity, lastSchoolSy: txtValue })
                }
                maxLength={15}
                value={studentEntity.lastSchoolSy}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>
                8. Elementary School
              </Text>
              <Text style={styles.enrollmentTextLabel}>
                Elementary School Name
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.elemName}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Elementary School Year Graduated
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={`${studentEntity.elemCompMonth} ${studentEntity.elemCompYear}`}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                PEPT for elementary level passer?
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.elemPeptPasser === "Y" ? "Yes" : "No"}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Elementary PEPT Month/Year Taken
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={
                  studentEntity.elemPeptPasser === "Y"
                    ? `${studentEntity.elemPeptMonth} ${studentEntity.elemPeptYear}`
                    : "N/A"
                }
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                A & E test for elementary level passer?
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                editable={false}
                value={studentEntity.elemAePasser === "Y" ? "Yes" : "No"}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Elementary A & E Month/Year Taken
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={
                  studentEntity.elemAePasser === "Y"
                    ? `${studentEntity.elemAeMonth} ${studentEntity.elemAeYear}`
                    : "N/A"
                }
                editable={false}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>
                9. Junior High School
              </Text>
              <Text style={styles.enrollmentTextLabel}>
                Junior High School Name
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                editable={false}
                value={studentEntity.jhsName}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Junior High School Year Graduated
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={`${studentEntity.jhsCompMonth} ${studentEntity.jhsCompYear}`}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                PEPT for junior high school level passer?
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.jhsPeptPasser === "Y" ? "Yes" : "No"}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Junior High School PEPT Month/Year Taken
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={
                  studentEntity.jhsPeptPasser === "Y"
                    ? `${studentEntity.jhsPeptMonth} ${studentEntity.jhsPeptYear}`
                    : "N/A"
                }
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                A & E test for junior high school level passer?
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={studentEntity.jhsAeYear === "Y" ? "Yes" : "No"}
                editable={false}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                A & E junior high school level passer month/year of completion
              </Text>
              <TextInput
                style={styles.textInputEnrollment}
                value={
                  studentEntity.jhsAeYear === "Y"
                    ? `${studentEntity.jhsAeMonth} ${studentEntity.jhsAeYear}`
                    : "N/A"
                }
                editable={false}
              />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
              <Text style={styles.enrollmentTextItemTitle}>
                10. Senior High School applied for
              </Text>
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>School</Text>
              <TextInput
                style={styles.textInputEnrollment}
                editable={false}
                value={route.params.schoolName}
              />
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>Track</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setIsShsTrackEnrolledModalVisible(true);
                  setStudentEntity({
                    ...studentEntity,
                    shsStrSpecEnrolled: {
                      id: 0,
                      chId: 0,
                      ctId: 0,
                      code: "",
                      name: "",
                    },
                  });
                }}
              >
                <TextInput
                  placeholder="Tap to select track..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isShsTrackEnrolledValidated"
                        )
                        ? errors.field.isShsTrackEnrolledValidated
                          ? styles.textInputEnrollment
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.enrollmentTextInputValidation
                          : styles.textInputEnrollment
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                  }
                  editable={false}
                  value={studentEntity.shsTrackEnrolled.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isShsTrackEnrolledModalVisible}
                animationType="slide"
                nRequestClose={() => setIsShsTrackEnrolledModalVisible(false)}
              >
                <TrackPicker
                  changeTrackModalVisibility={setIsShsTrackEnrolledModalVisible}
                  selectedSchool={{
                    id: 1,
                    code: "001",
                    name: "",
                  }}
                  setTrack={changeShsTrackEnrolled}
                />
              </Modal>
              <View style={styles.enrollmentGapperSM} />
              <Text style={styles.enrollmentTextLabel}>
                Strand/Specialization
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsShsStrandSpecEnrolledModalVisible(true)}
                disabled={studentEntity.shsTrackEnrolled.code === ""}
              >
                <TextInput
                  placeholder="Tap to select strand or specialization..."
                  placeholderTextColor="#9da4b0"
                  style={
                    errors.hasOwnProperty("field")
                      ? errors.field.hasOwnProperty(
                          "isShsStrSpecEnrolledValidated"
                        )
                        ? errors.field.isShsStrSpecEnrolledValidated
                          ? styles.textInputEnrollment
                          : "status" in studentEntity &&
                            studentEntity.status.code !== ""
                          ? styles.enrollmentTextInputValidation
                          : styles.textInputEnrollment
                        : styles.textInputEnrollment
                      : styles.textInputEnrollment
                  }
                  editable={false}
                  value={studentEntity.shsStrSpecEnrolled.name}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={isShsStrandSpecEnrolledModalVisible}
                animationType="slide"
                nRequestClose={() =>
                  setIsShsStrandSpecEnrolledModalVisible(false)
                }
              >
                <StrandSpecPicker
                  changeStrandSpecModalVisibility={
                    setIsShsStrandSpecEnrolledModalVisible
                  }
                  selectedSchool={{
                    id: 1,
                    code: "001",
                    name: "",
                  }}
                  selectedTrack={studentEntity.shsTrackEnrolled}
                  setStrandSpec={changeShsStrandSpecEnrolled}
                />
              </Modal>
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
            </View>
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentButtonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPressSubmitHandler}
                  style={styles.enrollmentSubmitButtonContainer}
                >
                  <Text style={styles.enrollmentButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPressCancelHandler}
                  style={styles.enrollmentCancelButtonContainer}
                >
                  <Text style={styles.enrollmentButtonText}>Cancel</Text>
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
            <View style={styles.enrollmentItem}>
              <View style={styles.enrollmentGapperM} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  enrollmentTextInputValidation: {
    borderWidth: 2,
    borderColor: "#f06e65",
    color: "#fff",
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
  },
  enrollmentSubmitButtonContainer: {
    elevation: 8,
    backgroundColor: "#3e85f7",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 100,
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
    width: 100,
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
  textInputEnrollment: {
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

export default EnrollmentScreen;
