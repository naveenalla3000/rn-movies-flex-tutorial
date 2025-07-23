import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const saved = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex-1 flex flex-col gap-5 justify-center items-center">
        <Image source={icons.save} className="size-10" tintColor="#FFF" />
        <Text className="text-light-300 text-base">Saved</Text>
      </View>
    </View>
  );
};

export default saved;

const styles = StyleSheet.create({});
