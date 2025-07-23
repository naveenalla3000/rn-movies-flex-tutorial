import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  onPress?: () => void;
  placeholder: string;
}

const SearchBar = ({ onPress, placeholder }: SearchBarProps) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between bg-dark-200 p-3 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="mr-2"
        resizeMode="contain"
        tintColor={"#AB8BFF"}
      />
      <TextInput
        className="flex-1 ml-2 text-white"
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        onChange={() => {}}
        onPress={onPress}
        value=""
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
