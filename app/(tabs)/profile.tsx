import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex-1 justify-center items-center">
        <Image source={icons.person} className="size-10" tintColor="#FFF" />
        <Text className="text-light-300 text-base">Profile</Text>
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
