import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchPopularMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
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

  const {
    data: trendingMovies,
    error: trendingMoviesError,
    loading: trendingMoviesLoading,
  } = useFetch(getTrendingMovies);

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
        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <Text className="mt-10 text-center text-red-500">
            {moviesError || trendingMoviesError}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <>
              <Text className="text-white mt-5 mb-3 text-lg font-bold">
                Latest Movies
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
