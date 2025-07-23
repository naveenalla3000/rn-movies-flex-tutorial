import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-base">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
        {value ?? "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <Text className="text-white text-lg">
          Failed to load movie details.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          {movie.poster_path && (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          )}
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white text-2xl font-bold mb-2">
              {movie?.title}
            </Text>
            <View className="flex-row items-center mb-2 gap-x-2">
              <Text className="text-sm text-light-200">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <Text className="text-sm text-light-200">|</Text>
              <Text className="text-sm text-light-200">
                {movie?.runtime} min
              </Text>
            </View>

            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-2 mt-2">
              <View className="flex-row items-center gap-x-1">
                <Image source={icons.star} className="size-4" />
                <Text className="text-sm font-bold text-white">
                  {movie?.vote_average.toFixed(1)} / 10
                </Text>
              </View>
              <Text className="text-sm text-light-200">
                {movie?.vote_count} votes
              </Text>
            </View>
            <MovieInfo label="Overview" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={
                movie?.genres?.map((genre) => genre.name).join(" , ") ?? "N/A"
              }
            />
            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo
                label="budget"
                value={`$${movie?.budget / 1_000_000} millions`}
              />
              <MovieInfo
                label="revenue"
                value={`$${Math.round(movie?.revenue / 1_000_000)} millions`}
              />
            </View>
            <MovieInfo
              label="Production Companies"
              value={
                movie?.production_companies
                  ?.map((company) => company.name)
                  .join(", ") ?? "N/A"
              }
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 flex-row  flex items-center justify-center bg-accent px-4 py-3.5 rounded-md"
        onPress={() => router.back()}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white text-base font-bold">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
