import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { AddRecipeStack } from "./AddRecipeRouter";
import { LoginStack } from "./LoginRouter";
import { RootStack } from "./RootRouter";

export type RootPageProps<R extends keyof RootStack> = NativeStackScreenProps<
  RootStack,
  R
>;

export type LoginPageProps<R extends keyof LoginStack> = NativeStackScreenProps<
  LoginStack,
  R
>;

export type AddRecipePageProps<R extends keyof AddRecipeStack> =
  NativeStackScreenProps<AddRecipeStack, R>;

export type AddRecipeNavigationProp = NativeStackNavigationProp<AddRecipeStack>
