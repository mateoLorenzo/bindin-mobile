export type formAnswerTypes =
  | "SINGLE_CHOICE"
  | "SHORT_ANSWER"
  | "LONG_ANSWER"
  | "NUMERIC";

export type postTypes = "POLL" | "FORM";

export interface FormQuestion {
  title: string;
  answerType: formAnswerTypes | null;
  customHint: string;
  singleChoiceOptions: string[];
  isHintActive: boolean;
}
