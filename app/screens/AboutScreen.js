import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

function AboutScreen({ navigation }) {
  const onPressHomeHandler = () => {
    navigation.navigate("Home");
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
      source={require("../assets/shares-appbg.jpg")}
    >
      <SafeAreaView style={styles.aboutSafeAreaView}>
        <ScrollView style={styles.aboutScrollView}>
          <View style={styles.screenGapperM} />
          <View>
            <Text style={styles.titleText}>
              DEVELOPMENT OF S.H.A.R.E.S.: SENIOR HIGH AUTOMATED REGISTRATION
              AND ENROLLMENT SYSTEM
            </Text>
            <Text style={styles.titleText}>A Dissertation</Text>
            <Text style={styles.subtitleText1}>
              Presented to the Faculty of the Graduate Programs College of
              Continuing, Advanced and Professional Studies University of Makati
            </Text>
            <Text style={styles.subtitleText1}>
              In Partial Fulfillment of the Requirements for the Degree DOCTOR
              OF EDUCATION MAJOR IN INNOVATIVE EDUCATIONAL MANAGEMENT
            </Text>
            <Text style={styles.subtitleText2}>by</Text>
            <View style={styles.screenGapperSM} />
            <Text style={styles.subtitleText2}>SHARON GAYE C. LAPUT</Text>
            <View style={styles.screenGapperXSM} />
            <Text style={styles.subtitleText2}>Copyright © July 2020</Text>
            <View style={styles.screenGapperM} />
            <Text style={styles.titleText}>ABSTRACT</Text>
            <Text style={styles.contentParagraph}>
              The study SHARES: Senior High Automated Registration and
              Enrollment System is an online application which will act as an
              alternative tool to improve student registration and enrollment in
              Makati High School (MHS) specifically for Grade 10, 11 and 12
              students. Its advantage towards the existing and the manual
              student’s registration and enrollment system is that it is
              portable, reliable and more specialized for Makati High School’s
              Guidance Office. The developed registration and enrollment system
              can be utilized thru cloud technology. SHARES: Senior High
              Automated Registration and Enrollment System is composed of four
              major modules or accounts namely: 1) School Administrators that
              will administer users, maintain configurations, and students’
              information; 2) Students that will register and enroll new and old
              senior high students their personal and school information as well
              as corresponding subjects; 3) Report Generation that will allow
              students to print registration forms using their Learners
              Reference Number, and administrators to print updated students’
              record; 4) Database Management for the students that can add,
              delete, search and edit the information of the students regarding
              to their record. SHARES was built using various technologies
              including the latest version of JAVA, React JS, Springboot, MySQL.
              The developed study was tested and was evaluated by School
              Administrators and selected students using ISO 9126 and gathered
              reviews mostly with an “Excellent” remark.
            </Text>
            <Text style={styles.contentParagraph}>
              KEYWORDS: Senior High Automated Registration and Enrollment
              System, MHS, Guidance Office, Students’ Record, Database
              Management
            </Text>
          </View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.mhsLogo}
              source={require("../assets/MHS.png")}
            />
            <Image
              style={styles.umakLogo}
              source={require("../assets/Umak.png")}
            />
          </View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.ccapsLogo}
              source={require("../assets/UmakCCAPS.png")}
            />
          </View>
          <View style={styles.screenGapperXL} />
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressHomeHandler}
              style={styles.homeButtonContainer}
            >
              <Text style={styles.homeButtonText}>Home</Text>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenGapperXL: {
    height: 70,
  },
  screenGapperM: {
    height: 20,
  },
  screenGapperSM: {
    height: 10,
  },
  screenGapperXSM: {
    height: 5,
  },
  contentParagraph: {
    color: "#fff",
    padding: 20,
    textAlign: "justify",
  },
  subtitleText1: {
    color: "#fff",
    textAlign: "center",
    padding: 10,
  },
  subtitleText2: {
    color: "#fff",
    textAlign: "center",
  },
  aboutScrollView: {
    width: "100%",
  },
  aboutSafeAreaView: {
    width: "100%",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mhsLogo: {
    width: 100,
    height: 100,
  },
  umakLogo: {
    width: 100,
    height: 100,
  },
  ccapsLogo: {
    width: 200,
    height: 100,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    padding: 10,
  },
  homeButtonContainer: {
    elevation: 8,
    backgroundColor: "#bc46f0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "95%",
    bottom: 60,
    alignSelf: "center",
  },
  homeButtonText: {
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
    alignSelf: "center",
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
    alignSelf: "center",
  },
  enrollButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default AboutScreen;
