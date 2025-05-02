import { IPoll, IUserInfo } from "@/interfaces";
import React, { useRef, useState } from "react";
import { Animated, Image, ScrollView, StyleSheet, View } from "react-native";
import { AppText as Text } from "../AppText";
import CustomButton from "../CustomButton";

export const PollPost = ({
  pollData,
  userInfo,
}: {
  pollData: IPoll;
  userInfo: IUserInfo;
}) => {
  const [pollOptionSelected, setPollOptionSelected] = useState<string | null>(
    null
  );
  const [pollOptions, setPollOptions] = useState(pollData.options);

  const animatedWidths = useRef(
    pollData.options.map(() => new Animated.Value(0))
  ).current;

  const handlePollOptionSelected = (id: string) => {
    if (pollOptionSelected) return;

    setPollOptionSelected(id);

    const updatedOptions = pollOptions.map((option) => {
      if (option.id === id) {
        return { ...option, votes: option.votes + 1 };
      }
      return option;
    });
    setPollOptions(updatedOptions);

    const totalVotes = updatedOptions.reduce(
      (sum, option) => sum + option.votes,
      0
    );

    updatedOptions.forEach((option, index) => {
      const percentage =
        totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100;

      Animated.timing(animatedWidths[index], {
        toValue: percentage,
        duration: 800,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postUserInfo}>
        <Image
          style={styles.postUserAvatar}
          source={{ uri: userInfo?.avatar }}
        />
        <Text style={styles.flex1} variant="body">
          {userInfo.username}
        </Text>
      </View>

      <View style={styles.postContent}>
        <Text style={styles.pollTitle} variant="subtitle">
          {pollData.title}
        </Text>

        <ScrollView
          style={styles.pollOptionsContainer}
          showsVerticalScrollIndicator={false}
        >
          {pollOptions.map((option, index) => {
            const isSelected = pollOptionSelected === option.id;
            const totalVotes = pollOptions.reduce(
              (sum, opt) => sum + opt.votes,
              0
            );
            const percentage =
              totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100;

            return (
              <View key={option.id} style={styles.pollItemContainer}>
                <CustomButton
                  key={`poll-item-${option.id}`}
                  label={option.title}
                  onPress={() => handlePollOptionSelected(option.id)}
                  variant="secondary"
                  style={[
                    styles.pollItem,
                    isSelected && { backgroundColor: "#2D3748", opacity: 1 },
                  ]}
                  labelStyle={[
                    styles.pollOptionTitle,
                    isSelected && styles.selectedOptionTitle,
                  ]}
                  disabled={pollOptionSelected !== null}
                />
                {pollOptionSelected && (
                  <Animated.View
                    style={{
                      ...styles.pollPercentageBackground,
                      width: animatedWidths[index].interpolate({
                        inputRange: [0, 100],
                        outputRange: ["0%", "100%"],
                      }),
                    }}
                  />
                )}
                {pollOptionSelected && (
                  <Text style={styles.percentageText}>
                    {percentage.toFixed(0)}%
                  </Text>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.pollInfoContainer}>
          <Text variant="body" style={styles.pollActiveText}>
            Active poll
          </Text>
          <Text variant="body" style={styles.pollVotesText}>
            {pollOptions.reduce((sum, option) => sum + option.votes, 0)} votes
          </Text>
        </View>
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
    minHeight: 200,
    backgroundColor: "#1B1B1E",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  pollTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "SoraBold",
  },
  pollItemContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 5,
    justifyContent: "center",
  },
  pollItem: {
    width: "100%",
    backgroundColor: "#1F2937",
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderWidth: 0,
  },
  pollOptionTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.7)",
  },
  selectedOptionTitle: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  pollPercentageBackground: {
    position: "absolute",
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(192,132,252, .2)",
    borderRadius: 5,
  },
  pollInfoContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  pollActiveText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ADADAD",
  },
  pollVotesText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ADADAD",
  },
  pollOptionsContainer: {
    maxHeight: 200,
    marginBottom: 15,
  },
  percentageText: {
    position: "absolute",
    right: 20,
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
