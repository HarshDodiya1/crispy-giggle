import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
      horizontal
      //   data={posts}
      //   horizontal
      //   keyExtractor={(item) => item.$id}
      //   renderItem={({ item }) => (
      //     <TrendingItem activeItem={activeItem} item={item} />
      //   )}
      //   onViewableItemsChanged={viewableItemsChanged}
      //   viewabilityConfig={{
      //     itemVisiblePercentThreshold: 70,
      //   }}
      //   contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;