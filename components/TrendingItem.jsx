import { useState } from "react";
import { useVideoPlayer, VideoPlayer, VideoView } from "expo-video";

import { Image, ImageBackground, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  const URL = "https://player.vimeo.com/video/949582778?h=d60220d68d";
  const videoPlayer = useVideoPlayer(item.video, (player) => {
    player.loop = true;
    player.play();
    // player.setContentFit(VideoContentFit.Contain);
  });

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <VideoView
          player={videoPlayer}
          contentFit="contain"
          nativeControls
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default TrendingItem;
