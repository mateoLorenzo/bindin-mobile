import { AppText as Text } from "@/components/AppText";
import CustomButton from "@/components/CustomButton";
import { FormPost } from "@/components/FormPost";
import { AddIcon, BindinIcon, FormIcon, PollIcon } from "@/components/icons";
import { PollPost } from "@/components/PollPost";
import { IForm, IPoll, IPost } from "@/interfaces";
import { initialPosts } from "@/mocks";
import { StorageService } from "@/utils/storage";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { router, useFocusEffect } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Home() {
  const [postType, setPostType] = useState<"POLL" | "FORM" | null>(null);
  const [latestPosts, setLatestPosts] = useState<IPost[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openDrawer = () => bottomSheetRef.current?.expand();

  useFocusEffect(
    React.useCallback(() => {
      const loadPosts = async () => {
        setIsLoading(true);
        const posts = await StorageService.getPosts();
        if (posts.length === 0) {
          await StorageService.addFirstTwoPosts();
          setLatestPosts(initialPosts);
        } else {
          setLatestPosts(posts);
        }
        setIsLoading(false);
      };

      loadPosts();
    }, [])
  );

  const continueToCreatePost = () => {
    if (postType) {
      bottomSheetRef.current?.close();
      if (postType === "POLL") {
        router.push("/create-poll");
      } else {
        router.push("/create-form");
      }
    }
  };

  const renderPost = (post: IPost) => {
    return post.postType === "POLL" ? (
      <View key={`post-${post.id}`} style={styles.postContainer}>
        <PollPost pollData={post.postData as IPoll} userInfo={post.userInfo} />
      </View>
    ) : (
      <View key={`post-${post.id}`} style={styles.postContainer}>
        <FormPost formData={post.postData as IForm} userInfo={post.userInfo} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <GestureHandlerRootView style={styles.screenContainer}>
        <BindinIcon width={100} height={50} />

        {isLoading || !latestPosts.length ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#C084FC" />
          </View>
        ) : (
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            style={styles.subContainer}
            contentContainerStyle={styles.alignCenter}
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === "ios"}
            extraScrollHeight={Platform.OS === "ios" ? 80 : 0}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.postContainer}>
              {latestPosts.map((post) => renderPost(post))}
              <View style={styles.spacer} />
            </View>
          </KeyboardAwareScrollView>
        )}
        <View style={styles.buttonContainer}>
          <BlurView
            intensity={40}
            tint="dark"
            style={[
              StyleSheet.absoluteFillObject,
              { transform: [{ scale: 1.2 }] },
            ]}
          />
          <View style={styles.buttonBackground} />
          <CustomButton
            label="New post"
            onPress={openDrawer}
            leftIcon={<AddIcon width={20} height={20} fill="#121212" />}
            variant="primary"
          />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          enablePanDownToClose
          backgroundStyle={styles.blackBackground}
          handleIndicatorStyle={styles.handleIndicator}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
            />
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text variant="title" style={styles.title}>
              Select type
            </Text>
            <Text variant="body" style={styles.sheetSubtitle}>
              Make it as cool as you like!
            </Text>

            <View style={styles.boxContainer}>
              <TouchableOpacity
                style={[
                  styles.box,
                  postType === "POLL" && styles.activeBox,
                  styles.pollbox,
                ]}
                activeOpacity={0.7}
                onPress={() => setPostType("POLL")}
              >
                <PollIcon width={75} height={75} />
                <Text style={styles.boxText}>Poll</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.box, postType === "FORM" && styles.activeBox]}
                activeOpacity={0.7}
                onPress={() => setPostType("FORM")}
              >
                <FormIcon width={75} height={75} />
                <Text style={styles.boxText}>Form</Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              label="Continue"
              onPress={continueToCreatePost}
              variant="primary"
              disabled={!postType}
              style={styles.continueButton}
            />
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    flexGrow: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 100,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: Platform.OS === "android" ? 0 : 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  subContainer: {
    width: "100%",
  },
  alignCenter: {
    alignItems: "center",
    width: "100%",
  },
  postContainer: {
    width: "100%",
  },
  spacer: {
    backgroundColor: "#121212",
    height: 74,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
    paddingBottom: 44,
    paddingTop: 10,
    width: "100%",
    overflow: "hidden",
  },
  buttonBackground: {
    position: "absolute",
    bottom: 44,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "rgba(18, 18, 18, 0.5)",
    borderRadius: 5,
  },
  blackBackground: {
    backgroundColor: "#1B1B1E",
  },
  handleIndicator: {
    backgroundColor: "#D9D9D9",
    width: 40,
  },
  contentContainer: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    width: "100%",
  },
  sheetSubtitle: {
    width: "100%",
    color: "#9E9E9E",
    marginTop: 5,
  },
  boxContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  box: {
    backgroundColor: "#121212",
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  pollbox: {
    marginRight: 10,
  },
  activeBox: {
    borderColor: "#9E9E9E",
  },
  boxText: {
    color: "#9E9E9E",
  },
  continueButton: {
    marginBottom: 30,
  },
});
