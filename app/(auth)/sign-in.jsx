import { useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
    }
    setIsSubmitting(true);
    try {
      const result = await signIn(form.email, form.password);
      // setisloadin(true)
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center min-h-[83vh] px-4 my-6"
          style={{ minHeight: Dimensions.get("window").height - 100 }}
        >
          <Image
            source={images.logo}
            className="w-[115px] h-[34px]"
            resizeMode="contain"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title={"Email"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={"mt-7"}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={"mt-7"}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>

            <Link
              href={"/sign-up"}
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
