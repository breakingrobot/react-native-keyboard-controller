import React, {useCallback, useEffect, useState} from "react";
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import styles from "./styles";

import type { ExamplesStackParamList } from "../../../navigation/ExamplesStack";
import type { StackScreenProps } from "@react-navigation/stack";
import type { KeyboardAvoidingViewProps } from "react-native";
import {ScreenNames} from "../../../constants/screenNames.ts";

type Props = StackScreenProps<ExamplesStackParamList>;

type Behavior = KeyboardAvoidingViewProps["behavior"];
const behaviors: Behavior[] = ["padding", "height", "position"];

export default function KeyboardAvoidingViewExample({ navigation }: Props) {
  const [behavior, setBehavior] = useState<Behavior>(behaviors[0]);
  const [isPackageImplementation, setPackageImplementation] = useState(true);

  const onSubmitPress = useCallback(
    () =>
      navigation.push(ScreenNames.KEYBOARD_AVOIDING_VIEW2),
    [],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.row}>
          <Text
            style={styles.header}
            onPress={() => setPackageImplementation((value) => !value)}
          >
            {isPackageImplementation ? "Package" : "RN"}
          </Text>
          <Text
            style={styles.header}
            onPress={() => {
              const index = behaviors.indexOf(behavior);
              setBehavior(
                behaviors[index === behaviors.length - 1 ? 0 : index + 1],
              );
            }}
          >
            {behavior}
          </Text>
        </View>
      ),
    });
  }, [isPackageImplementation, behavior]);

  const Container = isPackageImplementation
    ? KeyboardAvoidingView
    : RNKeyboardAvoidingView;

  return (
    <>
      <View style={styles.inner}>
        <Text style={styles.heading}>Header</Text>
        <TouchableOpacity style={styles.button} onPress={onSubmitPress}>
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Container
        behavior={behavior}
        contentContainerStyle={styles.container}
        style={styles.content}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end'}}>
          <TextInput
            autoFocus
            placeholder="Username"
            placeholderTextColor="#7C7C7C"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#7C7C7C"
            style={styles.textInput}
            secureTextEntry
          />
        </View>
      </Container>
    </>
  );
}
