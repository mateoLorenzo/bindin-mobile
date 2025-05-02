import { formAnswerTypes, postTypes } from "@/types";

export interface IPollOption {
  id: string;
  title: string;
  votes: number;
}

export interface IPoll {
  title: string;
  totalVotes: number;
  isActive: boolean;
  options: IPollOption[];
}

export interface IForm {
  title: string;
  questions: IFormQuestion[];
}

export interface IFormQuestion {
  title: string;
  questionNumber: number;
  answerType: formAnswerTypes;
  customHint: string;
  singleChoiceOptions: ISingleChoiceOption[];
}

export interface ISingleChoiceOption {
  id: string;
  title: string;
  isCorrect: boolean;
}

export interface IUserInfo {
  id: string;
  username: string;
  avatar: string;
}

export interface IPost {
  id: string;
  userInfo: IUserInfo;
  createdAt: Date;
  postType: postTypes;
  postData: IPoll | IForm;
}
