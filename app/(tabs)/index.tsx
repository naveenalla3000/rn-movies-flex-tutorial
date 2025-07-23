import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchPopularMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    error: moviesError,
    loading: moviesLoading,
    refetch,
    reset,
  } = useFetch(() => fetchPopularMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary">
      <ImageBackground
        source={images.bg}
        className="absolute inset-0 w-full h-full z-0"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-12 mx-auto mt-20 mb-5" />
        {moviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="mt-10 text-center text-red-500">{moviesError}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />
            <>
              <Text className="text-white mt-5 mb-3 text-lg font-bold">
                Popular Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }: { item: Movie }) => (
                  <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
