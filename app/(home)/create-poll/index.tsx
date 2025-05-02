import { AppText as Text } from "@/components/AppText";
import CustomButton from "@/components/CustomButton";
import { ArrowLeftIcon } from "@/components/icons";
import { OptionsCreator } from "@/components/OptionsCreator";
import { IPost } from "@/interfaces";
import { StorageService } from "@/utils/storage";
import { Stack, router } from "expo-router";
import React from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CreatePoll() {
  const [options, setOptions] = React.useState(["", ""]);
  const [optionErrors, setOptionErrors] = React.useState([false, false]);
  const [pollQuestion, setPollQuestion] = React.useState("");

  const hasEmptyFields =
    options.some((option) => option.trim() === "") ||
    pollQuestion.trim() === "";
  const isButtonEnabled = !hasEmptyFields && options.length >= 2;

  const goBack = () => {
    router.back();
  };

  const makePostStructure = (): IPost => {
    return {
      id: "poll-1",
      userInfo: {
        id: "user-1",
        username: "Random User",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04Gez5qP_6CszSYn4OcYDPr5MwNfU-87IjQ&s",
      },
      createdAt: new Date(),
      postType: "POLL",
      postData: {
        title: pollQuestion,
        options: options.map((option, index) => ({
          id: `option-${index}`,
          title: option,
          votes: 0,
        })),
        totalVotes: 0,
        isActive: true,
      },
    };
  };

  const publishPoll = async () => {
    const completePollPost = makePostStructure();
    await StorageService.addPost(completePollPost);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Stack.Screen
        options={{
          title: `Create Poll`,
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#fff",
        }}
      />
      <View style={styles.screenContainer}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <TouchableOpacity onPress={goBack} style={styles.backIconButton}>
              <ArrowLeftIcon style={styles.backIcon} />
            </TouchableOpacity>
            <Text variant="title" style={styles.title}>
              Create Poll
            </Text>
          </View>
          <Text variant="body" style={styles.subtitle}>
            This is where you&apos;ll create your poll
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text variant="body" style={styles.inputLabel}>
            Poll question *
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Up to 100 characters..."
            maxLength={100}
            placeholderTextColor="#9CA3AF"
            multiline={true}
            value={pollQuestion}
            onChangeText={setPollQuestion}
          />
        </View>

        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === "ios"}
          keyboardShouldPersistTaps="handled"
        >
          <OptionsCreator
            options={options}
            setOptions={setOptions}
            optionErrors={optionErrors}
            setOptionErrors={setOptionErrors}
          />
        </KeyboardAwareScrollView>
        <CustomButton
          label="Ask as LordMatausIV"
          onPress={publishPoll}
          variant="primary"
          style={styles.newPostButton}
          labelStyle={styles.newPostButtonText}
          disabled={!isButtonEnabled}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: Platform.OS === "android" ? 40 : 20,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
  },
  header: {
    alignItems: "center",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  backIconButton: {
    position: "absolute",
    left: 0,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    marginBottom: 5,
  },
  subtitle: {
    color: "#9E9E9E",
  },
  questionContainer: {
    marginTop: 20,
  },
  inputLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#212121",
    borderRadius: 5,
    padding: 15,
    color: "#fff",
    minHeight: 100,
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
    marginTop: 10,
    fontFamily: "Sora",
    fontWeight: "500",
    marginBottom: 5,
  },
  newPostButton: {
    marginBottom: 20,
    flexDirection: "row",
    minHeight: 50,
    gap: 5,
    zIndex: 100,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newPostButtonText: {
    color: "#121212",
    fontSize: 14,
    fontWeight: "600",
  },
  contentContainer: {
    paddingBottom: 10,
    marginTop: 20,
  },
});
