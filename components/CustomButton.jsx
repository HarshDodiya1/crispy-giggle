import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } bg-secondary-200  min-h-[62px] rounded-xl flex flex-row justify-center items-center`}
      disabled={isLoading}
    >
      {/* <View className="bg-secondary-200 rounded-xl min-h-[62px] flex flex-row justify-center items-center"> */}
      <Text className={`text-primary font-psemibold text-lg `}>{title}</Text>
      {/* </View> */}
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
