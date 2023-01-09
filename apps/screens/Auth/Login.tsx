import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
	Box,
	FormControl,
	Heading,
	HStack,
	Icon,
	Input,
	Link,
	Pressable,
	Text,
	VStack,
	WarningOutlineIcon,
} from "native-base";
import { useState } from "react";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";
import { BASE_COLOR } from "../../utilities/baseColor";
import { MaterialIcons } from "@expo/vector-icons";

type LoginScreenPropsTypes = NativeStackScreenProps<RootParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenPropsTypes) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errorInput, setErrorInput] = useState({ inputName: "", isError: false, message: "" });

	const handleSetEmail = (input: string) => {
		setEmail(input);
		setErrorInput({ inputName: "", isError: false, message: "" });
	};

	const handleSetPassword = (input: string) => {
		setPassword(input);
		setErrorInput({ inputName: "", isError: false, message: "" });
	};

	const handleSubmit = () => {
		let inputName = "";
		try {
			if (email === "") {
				inputName = "email";
				throw Error("email tidak boleh kosong!");
			}

			if (password === "") {
				inputName = "password";
				throw Error("password tidak boleh kosong!");
			}

			if (password.length < 6) {
				inputName = "password";
				throw Error("password minimal 6 karakter!");
			}
		} catch (error: any) {
			console.log(error);
			setErrorInput({ inputName: inputName, isError: true, message: error.message });
		}
	};

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
						<Input
							isInvalid={errorInput.isError && errorInput.inputName === "email"}
							onChangeText={handleSetEmail}
							InputLeftElement={
								<Icon
									as={<MaterialIcons name="email" />}
									size={5}
									ml="2"
									color="muted.400"
								/>
							}
							placeholder="E-mail"
							_focus={{ bg: BASE_COLOR.blue[100], borderColor: BASE_COLOR.primary }}
						/>
						<FormControl.ErrorMessage
							isInvalid={errorInput.isError && errorInput.inputName === "email"}
							leftIcon={<WarningOutlineIcon size="xs" />}
							_text={{
								fontSize: "xs",
							}}
						>
							{errorInput.message}
						</FormControl.ErrorMessage>
					</FormControl>
					<FormControl>
						<FormControl.Label>Password</FormControl.Label>
						<Input
							onChangeText={handleSetPassword}
							isInvalid={errorInput.isError && errorInput.inputName === "password"}
							type={showPassword ? "text" : "password"}
							_focus={{ bg: BASE_COLOR.blue[100], borderColor: BASE_COLOR.primary }}
							InputRightElement={
								<Pressable onPress={() => setShowPassword(!showPassword)}>
									<Icon
										as={
											<MaterialIcons
												name={
													showPassword ? "visibility" : "visibility-off"
												}
											/>
										}
										size={5}
										mr="2"
										color="muted.400"
									/>
								</Pressable>
							}
							placeholder="Password"
						/>
						<FormControl.ErrorMessage
							isInvalid={errorInput.isError && errorInput.inputName === "password"}
							leftIcon={<WarningOutlineIcon size="xs" />}
							_text={{
								fontSize: "xs",
							}}
						>
							{errorInput.message}
						</FormControl.ErrorMessage>
					</FormControl>
					<Pressable
						onPress={handleSubmit}
						bg={BASE_COLOR.primary}
						p="2"
						rounded="xl"
						_pressed={{ bg: BASE_COLOR.blue[200] }}
					>
						<Text textAlign="center" fontSize="xl" color="#FFF">
							Login
						</Text>
					</Pressable>

					<HStack mt="6" space="2" justifyContent="center">
						<Text
							fontSize="sm"
							color="coolGray.600"
							_dark={{
								color: "warmGray.200",
							}}
						>
							Belum Punya Akun?
						</Text>
						<Link
							_text={{
								color: "indigo.500",
								fontWeight: "medium",
								fontSize: "sm",
							}}
							onPress={() => navigation.navigate("SignUp")}
						>
							Sign Up
						</Link>
					</HStack>
				</VStack>
			</Box>
		</Layout>
	);
}
