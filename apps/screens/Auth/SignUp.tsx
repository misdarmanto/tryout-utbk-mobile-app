import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, Text, View, VStack } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";

type SignUpScreenPropsTypes = NativeStackScreenProps<RootParamList, "SignUp">;

export default function SignUpScreen({ navigation }: SignUpScreenPropsTypes) {
	return (
		<Layout>
			<Box safeArea p="2" py="8">
				<Heading
					size="lg"
					fontWeight="600"
					color="coolGray.800"
					_dark={{
						color: "warmGray.50",
					}}
				>
					Welcome
				</Heading>
				<Heading
					mt="1"
					_dark={{
						color: "warmGray.200",
					}}
					color="coolGray.600"
					fontWeight="medium"
					size="xs"
				>
					Sign in to continue!
				</Heading>

				<VStack space={3} mt="5">
					<FormControl>
						<FormControl.Label>Email</FormControl.Label>
						<Input />
					</FormControl>
					<FormControl>
						<FormControl.Label>Password</FormControl.Label>
						<Input type="password" />
					</FormControl>
					<FormControl>
						<FormControl.Label>Confirm Password</FormControl.Label>
						<Input type="password" />
					</FormControl>
					<Button mt="2" colorScheme="primary">
						Sign in
					</Button>
					<HStack mt="6" justifyContent="center">
						<Text
							fontSize="sm"
							color="coolGray.600"
							_dark={{
								color: "warmGray.200",
							}}
						>
							Sudah Punya Akun?
						</Text>
						<Link
							_text={{
								color: "indigo.500",
								fontWeight: "medium",
								fontSize: "sm",
							}}
							onPress={() => navigation.navigate("Login")}
						>
							Login
						</Link>
					</HStack>
				</VStack>
			</Box>
		</Layout>
	);
}
