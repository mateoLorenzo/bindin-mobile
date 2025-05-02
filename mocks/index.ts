import { IPost } from "@/interfaces";

export const initialPosts: IPost[] = [
  {
    id: "post-1",
    createdAt: new Date(new Date().getTime() - 60000),
    postType: "FORM",
    userInfo: {
      id: "user-1",
      username: "LordMatausIV",
      avatar: "https://i.imgur.com/ISnnn3u.jpg",
    },
    postData: {
      title: "The ultimate League of Legends Quiz",
      questions: [
        {
          title: "Which champ is not a midlaner?",
          answerType: "SINGLE_CHOICE",
          customHint: "",
          questionNumber: 1,
          singleChoiceOptions: [
            { id: "1", title: "Corki", isCorrect: false },
            { id: "2", title: "Katarina", isCorrect: false },
            { id: "3", title: "Jayce", isCorrect: false },
            { id: "4", title: "Janna", isCorrect: true },
            { id: "5", title: "Fizz", isCorrect: false },
            { id: "8", title: "Ziggs", isCorrect: false },
          ],
        },
        {
          title: "What is the name of the game map?",
          questionNumber: 2,
          answerType: "SHORT_ANSWER",
          customHint: "Hint: it's not 'ARAM'",
          singleChoiceOptions: [],
        },
        {
          title: "How many dragons must your team take to get the soul?",
          answerType: "NUMERIC",
          customHint: "Should be easy.. unless you're the jg",
          questionNumber: 3,
          singleChoiceOptions: [],
        },
        {
          title: "Write at least 5 champs, correctly spelled.",
          answerType: "LONG_ANSWER",
          customHint: "Your rank isn't at risk… just your dignity",
          questionNumber: 4,
          singleChoiceOptions: [],
        },
      ],
    },
  },
  {
    id: "post-2",
    createdAt: new Date(),
    postType: "POLL",
    userInfo: {
      id: "user-1",
      username: "LordMatausIV",
      avatar: "https://i.imgur.com/ISnnn3u.jpg",
    },
    postData: {
      title: "Only one game for life...\nWhich u pickin'?",
      totalVotes: 245,
      isActive: true,
      options: [
        {
          id: "poll1",
          title: "Counter Strike",
          votes: 74,
        },
        {
          id: "poll2",
          title: "League of Legends",
          votes: 49,
        },
        {
          id: "poll3",
          title: "Valorant",
          votes: 49,
        },
        {
          id: "poll4",
          title: "Fortnite",
          votes: 17,
        },
        {
          id: "poll5",
          title: "Other...",
          votes: 56,
        },
      ],
    },
  },
];
