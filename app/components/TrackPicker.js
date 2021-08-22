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

import { CfgTracks } from "../localdata/CfgTracks";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const TrackPicker = (props) => {
  const onPressItem = (track) => {
    props.changeTrackModalVisibility(false);
    props.setTrack(track);
  };

  const option = CfgTracks.filter(
    (track) => track.chId === props.selectedSchool.id
  ).map((track, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => onPressItem(track)}
        style={styles.trackOption}
      >
        <Text style={styles.trackTextValue}>{track.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.trackModalContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.changeTrackModalVisibility(false)}
      >
        <View
          style={[styles.trackModal, { width: WIDTH - 20, height: HEIGHT / 3 }]}
        >
          <ScrollView>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  trackModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trackModal: {
    backgroundColor: "#e3e1da",
    borderRadius: 10,
  },
  trackOption: {
    alignItems: "center",
  },
  trackTextValue: {
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

export default TrackPicker;
