import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ImageBackground, ScrollView, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <ImageBackground
        source={images.bg}
        className="absolute inset-0 w-full h-full z-0"
      />
      <ScrollView
        className="relative z-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-12 mx-auto mt-20 mb-5" />
        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => {
              router.push("/search");
            }}
            placeholder="Search movies, series, and more"
          />
        </View>
      </ScrollView>
    </View>
  );
}
