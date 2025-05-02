import { AppText as Text } from "@/components/AppText";
import CustomButton from "@/components/CustomButton";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  DeleteIcon,
  GrayAddIcon,
  RemoveIcon,
} from "@/components/icons";
import { OptionsCreator } from "@/components/OptionsCreator";
import { IPost } from "@/interfaces";
import { formAnswerTypes, FormQuestion } from "@/types";
import { StorageService } from "@/utils/storage";
import { router, Stack } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Menu } from "react-native-paper";

export default function CreateForm() {
  const [formQuestion, setFormQuestion] = React.useState("");
  const [menuItemWidth, setMenuItemWidth] = useState(0);
  const [questions, setQuestions] = useState<FormQuestion[]>([
    {
      title: "",
      answerType: null,
      customHint: "",
      singleChoiceOptions: [],
      isHintActive: false,
    },
  ]);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [optionErrors, setOptionErrors] = useState<boolean[][]>([]);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const answerTypeOptions = [
    { value: "SHORT_ANSWER", label: "Short answer" },
    { value: "LONG_ANSWER", label: "Long answer" },
    { value: "NUMERIC", label: "Numeric" },
    { value: "SINGLE_CHOICE", label: "Single choice" },
  ];

  const goBack = () => {
    router.back();
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: "",
        answerType: null,
        customHint: "",
        singleChoiceOptions: [],
        isHintActive: false,
      },
    ]);
    setOptionErrors([...optionErrors, [false, false]]);
  };

  const removeQuestion = (idxToRemove: number) => {
    setQuestions(questions.filter((_, idx) => idx !== idxToRemove));
    setOptionErrors(optionErrors.filter((_, idx) => idx !== idxToRemove));
    if (activeMenuIndex === idxToRemove) setActiveMenuIndex(null);
  };

  const isFormValid = questions.every(
    (q) =>
      q.title.trim().length > 0 &&
      q.answerType !== null &&
      (q.answerType !== "SINGLE_CHOICE" || q.singleChoiceOptions.length >= 2)
  );

  const makePostStructure = (): IPost => {
    return {
      id: Date.now().toString(),
      userInfo: {
        id: "1",
        username: "New User",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04Gez5qP_6CszSYn4OcYDPr5MwNfU-87IjQ&s",
      },
      createdAt: new Date(),
      postType: "FORM",
      postData: {
        title: formQuestion,
        questions: questions.map((q, index) => ({
          title: q.title,
          questionNumber: index + 1,
          answerType: q.answerType as formAnswerTypes,
          customHint: q.customHint || "",
          singleChoiceOptions: q.singleChoiceOptions.map((option) => ({
            id: option,
            text: option,
            title: option,
            isCorrect: false,
          })),
        })),
      },
    };
  };

  const publishForm = async () => {
    try {
      const completeFormPost = makePostStructure();
      await StorageService.addPost(completeFormPost);
      router.back();
    } catch (error) {
      console.error("Error saving form:", error);
      Alert.alert("Error", "There was an error saving your form");
    }
  };

  const getAnswerTypeLabel = (answerType: formAnswerTypes | null) => {
    return (
      answerTypeOptions.find((option) => option.value === answerType)?.label ||
      "Answer type"
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: `Create Form`,
            headerStyle: { backgroundColor: "#121212" },
            headerTintColor: "#fff",
          }}
        />
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <TouchableOpacity onPress={goBack} style={styles.backIconButton}>
              <ArrowLeftIcon style={styles.backIcon} />
            </TouchableOpacity>
            <Text variant="title" style={styles.title}>
              Create Form
            </Text>
          </View>
          <Text variant="body" style={styles.subtitle}>
            This is where you&apos;ll create your form
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text variant="body" style={styles.inputLabel}>
            Form question *
          </Text>
          <TextInput
            style={[styles.input, { color: formQuestion ? "#fff" : "#ADADAD" }]}
            placeholder="Up to 100 characters..."
            maxLength={100}
            placeholderTextColor="#9CA3AF"
            multiline={true}
            autoCorrect={false}
            value={formQuestion}
            onChangeText={setFormQuestion}
          />
        </View>
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.contentContainer}
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === "ios"}
          keyboardShouldPersistTaps="handled"
        >
          {questions.map((q, idx) => (
            <View key={idx} style={styles.questionBlock}>
              <View style={styles.questionHeader}>
                <Text style={styles.inputLabel}>{`Question #${idx + 1}*`}</Text>
                {idx > 0 && (
                  <TouchableOpacity onPress={() => removeQuestion(idx)}>
                    <RemoveIcon width={20} height={20} />
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                style={[styles.input, { color: q.title ? "#fff" : "#ADADAD" }]}
                placeholder="Question title"
                maxLength={100}
                placeholderTextColor="#9CA3AF"
                value={q.title}
                autoCorrect={false}
                onChangeText={(text) => {
                  const newQuestions = [...questions];
                  newQuestions[idx].title = text;
                  setQuestions(newQuestions);
                }}
              />
              <View style={styles.menuContainer}>
                <Menu
                  visible={activeMenuIndex === idx}
                  onDismiss={() => setActiveMenuIndex(null)}
                  anchor={
                    <View
                      style={styles.answerTypeButtonContainer}
                      onLayout={(e) => {
                        setMenuItemWidth(e.nativeEvent.layout.width);
                      }}
                    >
                      <Button
                        mode="contained"
                        onPress={() => setActiveMenuIndex(idx)}
                        style={styles.answerTypeButton}
                        labelStyle={[
                          styles.answerTypeButtonLabel,
                          { color: q.answerType !== null ? "#fff" : "#ADADAD" },
                        ]}
                        contentStyle={styles.answerTypeButtonContent}
                      >
                        {getAnswerTypeLabel(q.answerType)}
                      </Button>
                      <TouchableOpacity
                        style={styles.arrowDownIconContainer}
                        onPress={() => setActiveMenuIndex(idx)}
                        activeOpacity={1}
                      >
                        <ArrowDownIcon width={18} height={18} />
                      </TouchableOpacity>
                    </View>
                  }
                  contentStyle={{
                    ...styles.menuContent,
                    width: menuItemWidth,
                    minWidth: menuItemWidth,
                    maxWidth: menuItemWidth,
                  }}
                >
                  {answerTypeOptions.map((option) => {
                    return (
                      <Menu.Item
                        key={option.value}
                        onPress={() => {
                          const newQuestions = [...questions];
                          newQuestions[idx].answerType =
                            option.value as formAnswerTypes;
                          setQuestions(newQuestions);
                          setActiveMenuIndex(null);
                          if (option.value === "Single choice") {
                            setActiveMenuIndex(null);
                          }
                        }}
                        title={
                          <Text style={styles.menuItemTitle}>
                            {option.label}
                          </Text>
                        }
                        style={styles.menuItem}
                      />
                    );
                  })}
                </Menu>

                {q.isHintActive && q.answerType !== "SINGLE_CHOICE" ? (
                  <View style={styles.customHintInputContainer}>
                    <TextInput
                      style={[
                        styles.customHintInput,
                        { color: q.customHint ? "#fff" : "#ADADAD" },
                      ]}
                      placeholder="Set a custom hint for this answer..."
                      placeholderTextColor="#9CA3AF"
                      value={q.customHint}
                      autoCorrect={false}
                      onChangeText={(text) => {
                        const newQuestions = [...questions];
                        newQuestions[idx].customHint = text;
                        setQuestions(newQuestions);
                      }}
                    />
                    <TouchableOpacity
                      style={styles.deleteHintButton}
                      onPress={() => {
                        const newQuestions = [...questions];
                        newQuestions[idx].isHintActive = false;
                        setQuestions(newQuestions);
                      }}
                    >
                      <DeleteIcon width={22} height={22} />
                    </TouchableOpacity>
                  </View>
                ) : q.answerType !== "SINGLE_CHOICE" ? (
                  <TouchableOpacity
                    style={[
                      styles.customHintButton,
                      q.answerType === null && styles.disabledButton,
                    ]}
                    onPress={() => {
                      const newQuestions = [...questions];
                      newQuestions[idx].isHintActive = true;
                      setQuestions(newQuestions);
                    }}
                    disabled={q.answerType === null}
                  >
                    <Text
                      variant="body"
                      style={[
                        styles.customHintText,
                        q.answerType === null && styles.disabledText,
                      ]}
                    >
                      Custom hint
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {q.answerType === "SINGLE_CHOICE" && (
                  <OptionsCreator
                    options={q.singleChoiceOptions}
                    setOptions={(newOptions) => {
                      const newQuestions = [...questions];
                      newQuestions[idx].singleChoiceOptions = newOptions;
                      setQuestions(newQuestions);
                    }}
                    optionErrors={optionErrors[idx] || [false, false]}
                    setOptionErrors={(newErrors) => {
                      const newErrorArray = [...optionErrors];
                      newErrorArray[idx] = newErrors;
                      setOptionErrors(newErrorArray);
                    }}
                  />
                )}
              </View>
            </View>
          ))}
          <CustomButton
            label="Add Question"
            onPress={addQuestion}
            variant="secondary"
            style={styles.addOptionButton}
            leftIcon={<GrayAddIcon width={22} height={22} />}
            labelStyle={styles.addOptionButtonText}
          />
        </KeyboardAwareScrollView>

        <CustomButton
          label="Ask as LordMatausIV"
          onPress={publishForm}
          variant="primary"
          style={styles.newPostButton}
          labelStyle={styles.newPostButtonText}
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
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
  contentContainer: {
    paddingBottom: Platform.OS === "android" ? 30 : 10,
    marginTop: 20,
  },
  title: {
    marginBottom: 5,
  },
  subtitle: {
    color: "#9E9E9E",
  },
  questionContainer: {
    marginTop: 30,
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLabel: {
    color: "#E4E6EA",
    fontSize: 14,
    fontFamily: "SoraSemiBold",
  },
  input: {
    backgroundColor: "#212121",
    borderRadius: 5,
    padding: 15,
    color: "#ADADAD",
    minHeight: 50,
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
    fontFamily: "Sora",
    width: "100%",
    marginTop: 10,
  },
  menuContainer: {
    marginTop: 5,
    width: "100%",
  },
  menuContent: {
    backgroundColor: "#18181B",
    borderRadius: 5,
    alignSelf: "center",
    paddingVertical: 0,
  },
  answerTypeButtonContainer: {
    width: "100%",
    justifyContent: "center",
  },
  answerTypeButton: {
    backgroundColor: "#212121",
    borderRadius: 5,
    justifyContent: "flex-start",
    minHeight: 50,
    width: "100%",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
  },
  answerTypeButtonLabel: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: "#ADADAD",
    textAlign: "left",
    width: "100%",
    marginVertical: 0,
    marginLeft: 0,
    fontWeight: "400",
  },
  answerTypeButtonContent: {
    justifyContent: "flex-start",
    width: "100%",
  },
  arrowDownIconContainer: {
    position: "absolute",
    right: 18,
  },
  menuItemTitle: {
    color: "#ADADAD",
    fontSize: 14,
  },
  menuItem: {
    width: "100%",
  },
  customHintButton: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },
  customHintText: {
    color: "#ADADAD",
    fontSize: 14,
    fontFamily: "SoraSemiBold",
  },
  customHintInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 5,
  },
  customHintInput: {
    backgroundColor: "#212121",
    borderRadius: 5,
    padding: 15,
    color: "#ADADAD",
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
    fontFamily: "Sora",
    fontSize: 14,
    width: "100%",
    fontWeight: "400",
    minHeight: 50,
  },
  deleteHintButton: {
    position: "absolute",
    paddingRight: 15,
    right: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  addOptionButton: {
    backgroundColor: "#212121",
    borderRadius: 5,
    padding: 15,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
    flexDirection: "row",
    gap: 10,
  },
  addOptionButtonText: {
    color: "#ADADAD",
    fontSize: 14,
    fontWeight: "600",
  },
  newPostButton: {
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
    marginBottom: 20,
  },
  newPostButtonText: {
    color: "#121212",
    fontSize: 14,
    fontFamily: "SoraSemiBold",
  },
  questionBlock: {
    marginBottom: 30,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#6B7280",
  },
});
