import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Alert,
} from "react-native";
// import { View, Button } from "react-native-elements";
import {
  Ionicons,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const App = () => {
  const [heaterState, setHeaterState] = useState(false);
  const [ledState, setLedState] = useState(false);
  const [motorState, setMotorState] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const enableSlider = () => {
    if (motorState) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ABL Covid Test</Text>
      <View style={styles.ViewStyle}>
        <Text style={styles.ViewTitleStyle}>Heater</Text>
        <TouchableOpacity
          onPress={() => {
            fetch(
              heaterState ? "http://192.168.4.1/L1" : "http://192.168.4.1/H1",
              {
                method: "GET",
                headers: {
                  Accept: "text/html",
                  "Content-Type": "text/html",
                },
              }
            )
              .then((result) => {
                alert("Heater state updated succesfully");
              })
              .catch((err) => {
                alert(
                  "Could not update heater state, please check your connection"
                );
              });
            setHeaterState(!heaterState);
          }}
        >
          <Ionicons
            name="md-flame"
            size={32}
            color={heaterState ? "red" : "#ccc"}
            style={styles.buttonStyle}
          />
        </TouchableOpacity>
      </View>
      {/* <View title="LED Array" containerStyle={styles.ViewStyle} titleStyle={styles.ViewTitleStyle}> */}
      <View style={styles.ViewStyle}>
        <Text style={styles.ViewTitleStyle}>LED Array</Text>
        <TouchableOpacity
          onPress={() => {
            fetch(
              ledState ? "http://192.168.4.1/L3" : "http://192.168.4.1/H3",
              {
                method: "GET",
                headers: {
                  Accept: "text/html",
                  "Content-Type": "text/html",
                },
              }
            )
              .then((result) => {
                alert("LED array state updated succesfully");
              })
              .catch((err) => {
                alert(
                  "Could not update LED array state, please check your connection"
                );
              });
            setLedState(!ledState);
          }}
        >
          <Foundation
            name="lightbulb"
            size={32}
            color={ledState ? "yellow" : "#ccc"}
            style={styles.buttonStyle}
          />
        </TouchableOpacity>
      </View>
      {/* <View title="Motor" containerStyle={styles.ViewStyle} titleStyle={styles.ViewTitleStyle}> */}
      <View style={styles.ViewStyle}>
        <Text style={styles.ViewTitleStyle}>Motor</Text>
        <TouchableOpacity
          onPress={() => {
            fetch(
              motorState ? "http://192.168.4.1/L2" : "http://192.168.4.1/H2",
              {
                method: "GET",
                headers: {
                  Accept: "text/html",
                  "Content-Type": "text/html",
                },
              }
            )
              .then((result) => {
                alert("Motor state updated succesfully");
              })
              .catch((err) => {
                alert(
                  "Could not update motor state, please check your connection"
                );
              });
            if (motorState) {
              setSliderValue(0);
            }
            setMotorState(!motorState);
          }}
        >
          <MaterialCommunityIcons
            name="engine"
            size={32}
            color={motorState ? "green" : "#ccc"}
            style={styles.buttonStyle}
          />
        </TouchableOpacity>

        <Slider
          value={sliderValue}
          maximumValue={100}
          minimumValue={0}
          style={styles.slider}
          minimumTrackTintColor="red"
          maximumTrackTintColor="white"
          thumbTintColor="red"
          step={5}
          // disables the slider if motor is off
          disabled={enableSlider()}
          /*onValueChange function updates the slider value on the screen, everytime
            the slider is moved and sends the 
            value over to the control unit.
          */
          onValueChange={(value) => {
            setSliderValue(value);
            fetch("http://192.168.4.1/motor" + { value }, {
              method: "GET",
              headers: {
                Accept: "text/html",
                "Content-Type": "text/html",
              },
            }).catch((err) => {
              alert(
                "Could not update motor state, please check your connection"
              );
            });
          }}
        />
        <Text style={styles.ViewTitleStyle}>{sliderValue}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ViewStyle: {
    backgroundColor: "#333",
    width: "80%",
    alignItems: "center",
    borderRadius: 5,
    height: 150,
    margin: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  ViewTitleStyle: {
    color: "#ccc",
  },
  title: {
    fontSize: 32,
  },
  buttonStyle: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
    minHeight: 50,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: 200,
    height: 40,
  },
});

export default App;
