import { IForm, IFormQuestion, IUserInfo } from "@/interfaces";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText as Text } from "../AppText";
import CustomButton from "../CustomButton";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";

const ANIMATION_DURATION = {
  FADE: 200,
  HEIGHT: 300,
};

const SCROLL_OFFSET = 100;

const defaultAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04Gez5qP_6CszSYn4OcYDPr5MwNfU-87IjQ&s";

export const FormPost = ({
  onHeightChange,
  formData,
  userInfo,
}: {
  onHeightChange?: (height: number) => void;
  formData: IForm;
  userInfo: IUserInfo;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [formAnswer, setFormAnswer] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const postRef = useRef<View>(null);
  const heightAnimRef = useRef(new Animated.Value(0)).current;
  const stepHeights = useRef<{ [key: number]: number }>({}).current;

  const inputRefs = useMemo(() => {
    const refs: { [key: number]: React.RefObject<TextInput | null> } = {};
    formData.questions.forEach((_, index) => {
      refs[index + 1] = React.createRef<TextInput>();
    });
    return refs;
  }, [formData.questions.length]);

  const fadeAnims = useMemo(() => {
    const anims: { [key: number]: Animated.Value } = {};
    formData.questions.forEach((_, index) => {
      const stepNumber = index + 1;
      anims[stepNumber] = new Animated.Value(stepNumber === 1 ? 1 : 0);
    });
    anims[formData.questions.length + 1] = new Animated.Value(0);
    anims[formData.questions.length + 2] = new Animated.Value(0);
    return anims;
  }, [formData.questions.length]);

  const hasInput = (step: number) => step >= 2;

  const handleAnswer = (id: string) => {
    setSelectedAnswer(id);
    setUserAnswers((prev) => ({
      ...prev,
      [currentStep]: id,
    }));
  };

  const handleStepLayout = (event: LayoutChangeEvent, stepNumber: number) => {
    const { height } = event.nativeEvent.layout;
    stepHeights[stepNumber] = height;

    if (stepNumber === currentStep && !isAnimating) {
      heightAnimRef.setValue(height);
    }
  };

  const scrollToPost = () => {
    postRef.current?.measureInWindow((x, y) => {
      if (onHeightChange) {
        onHeightChange(Math.max(0, y - SCROLL_OFFSET));
      }
    });
  };

  const getFadeAnim = (step: number) =>
    fadeAnims[step as keyof typeof fadeAnims];

  const animateStepTransition = (fromStep: number, toStep: number) => {
    if (!stepHeights[toStep]) return;

    setIsAnimating(true);

    const fadeOutAnim = Animated.timing(getFadeAnim(fromStep), {
      toValue: 0,
      duration: ANIMATION_DURATION.FADE,
      useNativeDriver: true,
    });

    const fadeInAnim = Animated.timing(getFadeAnim(toStep), {
      toValue: 1,
      duration: ANIMATION_DURATION.FADE,
      useNativeDriver: true,
    });

    const heightAnimation = Animated.timing(heightAnimRef, {
      toValue: stepHeights[toStep],
      duration: ANIMATION_DURATION.HEIGHT,
      useNativeDriver: false,
    });

    Animated.parallel([fadeOutAnim, heightAnimation]).start(() => {
      fadeInAnim.start(() => {
        setIsAnimating(false);
        scrollToPost();
        if (hasInput(toStep)) {
          setTimeout(() => {
            const inputRef = inputRefs[toStep as keyof typeof inputRefs];
            inputRef?.current?.focus();
          }, 100);
        }
      });
    });
  };

  const handleNextStep = () => {
    if (isAnimating) return;
    const nextStep = currentStep + 1;
    const summaryStep = formData.questions.length + 1;
    const successStep = formData.questions.length + 2;

    if (formAnswer.trim()) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentStep]: formAnswer,
      }));
    }

    if (nextStep <= formData.questions.length) {
      animateStepTransition(currentStep, nextStep);
      setCurrentStep(nextStep);
      if (formData.questions[nextStep - 1].answerType === "SINGLE_CHOICE") {
        setSelectedAnswer(userAnswers[nextStep] || null);
        setFormAnswer("");
      } else {
        setSelectedAnswer(null);
        setFormAnswer(userAnswers[nextStep] || "");
      }
    } else if (nextStep === summaryStep) {
      animateStepTransition(currentStep, nextStep);
      setCurrentStep(nextStep);
    } else if (nextStep === successStep) {
      animateStepTransition(currentStep, nextStep);
      setCurrentStep(nextStep);
    }
  };

  const handlePreviousStep = () => {
    if (isAnimating) return;
    const previousStep = currentStep - 1;

    if (formAnswer.trim()) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentStep]: formAnswer,
      }));
    }

    if (previousStep >= 1) {
      animateStepTransition(currentStep, previousStep);
      setCurrentStep(previousStep);
      if (formData.questions[previousStep - 1].answerType === "SINGLE_CHOICE") {
        setSelectedAnswer(userAnswers[previousStep] || null);
        setFormAnswer("");
      } else {
        setSelectedAnswer(null);
        setFormAnswer(userAnswers[previousStep] || "");
      }
    }
  };

  const handleEditStep = (stepNumber: number) => {
    if (isAnimating) return;

    if (formAnswer.trim()) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentStep]: formAnswer,
      }));
    }

    animateStepTransition(currentStep, stepNumber);
    setCurrentStep(stepNumber);

    if (formData.questions[stepNumber - 1].answerType === "SINGLE_CHOICE") {
      setSelectedAnswer(userAnswers[stepNumber] || null);
      setFormAnswer("");
    } else {
      setSelectedAnswer(null);
      setFormAnswer(userAnswers[stepNumber] || "");
    }
  };

  const FIRST_STEP = 1;
  const INITIAL_OPACITY = 1;
  const HIDDEN_OPACITY = 0;

  useEffect(() => {
    getFadeAnim(FIRST_STEP).setValue(INITIAL_OPACITY);
    formData.questions.forEach((_, index) => {
      const stepNumber = index + 1;
      if (stepNumber !== FIRST_STEP) {
        getFadeAnim(stepNumber).setValue(HIDDEN_OPACITY);
      }
    });
    getFadeAnim(formData.questions.length + 1).setValue(HIDDEN_OPACITY);
  }, [formData.questions]);

  const finish = () => {
    handleNextStep();
    setFormAnswer("");
  };

  const isLastStep = (actualStep: number): boolean => {
    return actualStep === formData.questions.length;
  };

  const getButtonText = () => {
    if (currentStep === formData.questions.length + 1) {
      return "Finish";
    }
    return "Next";
  };

  const getAnswerDisplay = (question: IFormQuestion, answer: string) => {
    if (
      question.answerType === "SINGLE_CHOICE" &&
      question.singleChoiceOptions
    ) {
      const selectedOption = question.singleChoiceOptions.find(
        (opt) => opt.id === answer
      );
      return selectedOption ? selectedOption.title : "No answer provided";
    }
    return answer || "No answer provided";
  };

  const renderSingleChoiceQuestion = (options: any[]) => {
    return (
      <>
        <ScrollView
          style={styles.formDropdownContainer}
          showsVerticalScrollIndicator
        >
          {options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            return (
              <CustomButton
                key={`option-${option.id}`}
                label={option.title}
                onPress={() => handleAnswer(option.id)}
                variant="primary"
                style={{
                  ...styles.formDropdownAnswer,
                  backgroundColor: isSelected ? "#C084FC" : "#1F2937",
                }}
                labelStyle={{
                  color: isSelected ? "#000" : "#fff",
                  fontWeight: "400",
                }}
              />
            );
          })}
        </ScrollView>
      </>
    );
  };

  const renderShortAnswerQuestion = (
    customHint: string,
    stepNumber: number
  ) => {
    return (
      <>
        <TextInput
          ref={inputRefs[stepNumber]}
          style={styles.formInput}
          placeholderTextColor="#9CA3AF"
          placeholder={customHint || "Type your answer here"}
          value={formAnswer}
          onChangeText={setFormAnswer}
          maxLength={50}
          autoComplete="off"
        />
      </>
    );
  };

  const renderNumericAnswerQuestion = (
    customHint: string,
    stepNumber: number
  ) => {
    return (
      <>
        <TextInput
          ref={inputRefs[stepNumber]}
          style={styles.formInput}
          placeholderTextColor="#9CA3AF"
          placeholder={customHint || "Type your answer here"}
          value={formAnswer}
          onChangeText={setFormAnswer}
          maxLength={50}
          keyboardType="numeric"
        />
      </>
    );
  };

  const renderLargeAnswerQuestion = (
    customHint: string,
    stepNumber: number
  ) => {
    return (
      <>
        <TextInput
          ref={inputRefs[stepNumber]}
          style={styles.formInputMultiline}
          placeholderTextColor="#9CA3AF"
          placeholder={customHint || "Type your answer here"}
          value={formAnswer}
          onChangeText={setFormAnswer}
          multiline={true}
          numberOfLines={5}
        />
      </>
    );
  };

  const renderStep = (stepNumber: number, question: IFormQuestion) => {
    const isCurrentStep = currentStep === stepNumber;
    const isNextStep = currentStep + 1 === stepNumber;
    const shouldRender = isCurrentStep || isNextStep || isAnimating;
    let isButtonDisabled = true;
    if (question.answerType === "SINGLE_CHOICE") {
      isButtonDisabled = !selectedAnswer;
    }
    if (question.answerType === "SHORT_ANSWER") {
      isButtonDisabled = !formAnswer.trim();
    }
    if (question.answerType === "NUMERIC") {
      isButtonDisabled = !formAnswer.trim();
    }
    if (question.answerType === "LONG_ANSWER") {
      isButtonDisabled = !formAnswer.trim();
    }

    if (!shouldRender) return null;

    return (
      <Animated.View
        key={`step-${stepNumber}`}
        onLayout={(event) => handleStepLayout(event, stepNumber)}
        style={{
          ...styles.stepContent,
          opacity: getFadeAnim(stepNumber),
          zIndex: isCurrentStep ? 1 : 0,
        }}
      >
        <View style={styles.formQuestionContainer}>
          <Text variant="body" style={styles.formQuestion}>
            {`${stepNumber}. ${question.title}`}
          </Text>
        </View>
        {question.answerType === "SINGLE_CHOICE" &&
          renderSingleChoiceQuestion(question.singleChoiceOptions)}
        {question.answerType === "SHORT_ANSWER" &&
          renderShortAnswerQuestion(question.customHint, stepNumber)}
        {question.answerType === "NUMERIC" &&
          renderNumericAnswerQuestion(question.customHint, stepNumber)}
        {question.answerType === "LONG_ANSWER" &&
          renderLargeAnswerQuestion(question.customHint, stepNumber)}
        <View style={styles.navigationButtonsContainer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handlePreviousStep}
            >
              <ArrowLeftIcon
                width={15}
                height={15}
                fill={"rgba(255, 255, 255, 0.3)"}
              />
            </TouchableOpacity>
          )}
          <CustomButton
            label={getButtonText()}
            onPress={isLastStep(currentStep) ? finish : handleNextStep}
            variant="primary"
            disabled={isButtonDisabled}
            style={styles.formSubmitButton}
            rightIcon={<ArrowRightIcon width={20} height={20} fill={"#000"} />}
          />
        </View>
      </Animated.View>
    );
  };

  const renderCompletionStep = () => {
    const completionStepNumber = formData.questions.length + 1;
    const isCurrentStep = currentStep === completionStepNumber;
    const isNextStep = currentStep + 1 === completionStepNumber;
    const shouldRender = isCurrentStep || isNextStep || isAnimating;

    if (!shouldRender) return null;

    return (
      <Animated.View
        key={`completion-step-${completionStepNumber}`}
        onLayout={(event) => handleStepLayout(event, completionStepNumber)}
        style={{
          ...styles.stepContent,
          opacity: getFadeAnim(completionStepNumber),
          zIndex: isCurrentStep ? 1 : 0,
        }}
      >
        {formData.questions.map((question, index) => {
          const stepNumber = index + 1;
          const answer = userAnswers[stepNumber];

          return (
            <TouchableOpacity
              key={`completion-${stepNumber}`}
              onPress={() => handleEditStep(stepNumber)}
              style={styles.completionContainer}
              activeOpacity={0.7}
            >
              <View style={styles.completionContent}>
                <Text style={styles.completionSubtext} variant="body">
                  {stepNumber}. {question.title}
                </Text>
                <Text
                  style={[styles.completionSubtext, styles.answerText]}
                  variant="body"
                >
                  {getAnswerDisplay(question, answer)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <CustomButton
          label="Finish"
          onPress={isLastStep(currentStep) ? finish : handleNextStep}
          variant="primary"
          style={styles.finishSubmitButton}
          labelStyle={{ color: "#000" }}
        />
      </Animated.View>
    );
  };

  const renderSuccessStep = () => {
    const successStepNumber = formData.questions.length + 2;
    const isCurrentStep = currentStep === successStepNumber;
    const isNextStep = currentStep + 1 === successStepNumber;
    const shouldRender = isCurrentStep || isNextStep || isAnimating;

    if (!shouldRender) return null;

    return (
      <Animated.View
        key="success-step"
        onLayout={(event) => handleStepLayout(event, successStepNumber)}
        style={{
          ...styles.stepContent,
          opacity: getFadeAnim(successStepNumber),
          zIndex: isCurrentStep ? 1 : 0,
        }}
      >
        <View style={styles.successContainer}>
          <Text style={styles.successTitle} variant="subtitle">
            Sent successfully!
          </Text>
          <Text style={styles.successSubtext} variant="body">
            Thanks for completing the form. Keep it up!
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View ref={postRef} style={styles.postContainer}>
      <View style={styles.postUserInfo}>
        <Image
          style={styles.postUserAvatar}
          source={{ uri: userInfo.avatar || defaultAvatar }}
        />
        <Text style={styles.flex1} variant="body">
          {userInfo.username}
        </Text>
      </View>

      <View style={styles.postContent}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle} variant="subtitle">
            {formData.title}
          </Text>
          <Text style={styles.formSubtitle}>
            ({formData.questions.length} questions)
          </Text>
        </View>

        <Animated.View
          style={{ ...styles.stepsContainer, height: heightAnimRef }}
        >
          {formData.questions.map((question, index) =>
            renderStep(index + 1, question as IFormQuestion)
          )}
          {renderCompletionStep()}
          {renderSuccessStep()}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: "100%",
    marginBottom: 20,
  },
  postUserInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  postUserAvatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, .2)",
  },
  flex1: {
    flex: 1,
  },
  postContent: {
    width: "100%",
    backgroundColor: "#1B1B1E",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  stepsContainer: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  stepContent: {
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
  },
  formTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "600",
  },
  formSubtitle: {
    fontSize: 12,
    textAlign: "center",
  },
  formQuestionContainer: {
    width: "100%",
    backgroundColor: "#1F2937",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  formQuestion: {
    fontSize: 14,
  },
  formDropdownContainer: {
    maxHeight: 200,
  },
  formDropdownAnswer: {
    width: "100%",
    backgroundColor: "#1F2937",
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  formSubmitButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  formInputMultiline: {
    minHeight: 100,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    fontFamily: "Sora",
    color: "#fff",
    width: "100%",
    textAlignVertical: "top",
  },
  finishSubmitButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#C084FC",
    marginTop: 15,
  },
  formInput: {
    minHeight: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    fontFamily: "Sora",
    color: "#fff",
    width: "100%",
  },
  formHeader: {
    marginBottom: 10,
  },
  completionContainer: {
    width: "100%",
    backgroundColor: "#1F2937",
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completionContent: {
    flex: 1,
  },
  completionSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  answerText: {
    marginTop: 5,
    color: "#fff",
  },
  editIconContainer: {
    marginLeft: 10,
  },
  editIcon: {
    fontSize: 16,
  },
  successContainer: {
    width: "100%",
    backgroundColor: "#1F2937",
    padding: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  successTitle: {
    fontSize: 24,
    color: "#C084FC",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  successSubtext: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 24,
  },
  navigationButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  backButton: {
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
});
