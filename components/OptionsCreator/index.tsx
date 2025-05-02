import { useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText as Text } from "../AppText";
import CustomButton from "../CustomButton";
import { GrayAddIcon, RemoveIcon } from "../icons";

export const OptionsCreator = ({
  options,
  setOptions,
  optionErrors,
  setOptionErrors,
}: {
  options: string[];
  setOptions: (options: string[]) => void;
  optionErrors: boolean[];
  setOptionErrors: (optionErrors: boolean[]) => void;
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, options.length);
  }, [options.length]);

  const focusNewInput = (index: number) => {
    setTimeout(() => {
      inputRefs.current[index]?.focus();
    }, 100);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="none"
    >
      <View>
        {options.map((option, idx) => (
          <View key={idx} style={styles.optionInputContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                ref={(ref) => {
                  inputRefs.current[idx] = ref;
                }}
                style={styles.optionInput}
                placeholder={`Option #${idx + 1}`}
                placeholderTextColor="#9CA3AF"
                value={option}
                onChangeText={(text) => {
                  const newOptions = [...options];
                  newOptions[idx] = text;
                  setOptions(newOptions);
                  if (optionErrors[idx] && text.trim() !== "") {
                    const newErrors = [...optionErrors];
                    newErrors[idx] = false;
                    setOptionErrors(newErrors);
                  }
                }}
              />
              {idx > 1 && (
                <TouchableOpacity
                  style={styles.removeOptionButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    const newOptions = [...options];
                    newOptions.splice(idx, 1);
                    setOptions(newOptions);
                    const newErrors = [...optionErrors];
                    newErrors.splice(idx, 1);
                    setOptionErrors(newErrors);
                  }}
                >
                  <RemoveIcon width={22} height={22} />
                </TouchableOpacity>
              )}
            </View>
            {optionErrors[idx] && (
              <Text style={styles.errorCaption}>Complete this field!</Text>
            )}
          </View>
        ))}
      </View>

      <CustomButton
        label="Add Option"
        onPress={() => {
          const errors = options.map((opt) => opt.trim() === "");
          setOptionErrors(errors);
          if (errors.some(Boolean)) return;
          const newIndex = options.length;
          setOptions([...options, ""]);
          setOptionErrors([...errors, false]);
          focusNewInput(newIndex);
        }}
        style={styles.addOptionButton}
        variant="secondary"
        leftIcon={<GrayAddIcon width={22} height={22} />}
        labelStyle={styles.addOptionButtonText}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  optionInputContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    marginTop: 5,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },
  optionInput: {
    backgroundColor: "#212121",
    borderRadius: 5,
    minHeight: 50,
    padding: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
    fontFamily: "Sora",
    fontWeight: "400",
    width: "100%",
  },
  removeOptionButton: {
    position: "absolute",
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  addOptionButton: {
    backgroundColor: "#212121",
    borderRadius: 5,
    padding: 15,
    color: "#fff",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
    flexDirection: "row",
    gap: 10,
  },
  addOptionButtonText: {
    color: "#E4E6EA",
    fontSize: 14,
    fontWeight: "600",
  },
  errorCaption: {
    color: "#FF4D4F",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 2,
    fontFamily: "Sora",
    width: "100%",
  },
});
