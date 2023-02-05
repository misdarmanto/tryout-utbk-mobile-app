import { VStack, Text } from "native-base";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-native";
import { RewardedAd, RewardedAdEventType, TestIds } from "react-native-google-mobile-ads";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types";
import { FirestoreDB } from "../../firebase/firebaseDB";
import { BASE_COLOR } from "../../utilities/baseColor";

const adUnitId = __DEV__ ? TestIds.REWARDED : "ca-app-pub-8095237298596091/9584709385";

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
	requestNonPersonalizedAdsOnly: true,
	keywords: ["fashion", "clothing"],
});

type RewardAdScreenPropsTypes = NativeStackScreenProps<RootParamList, "RewardAd">;

const RewardAdScreen = ({ navigation }: RewardAdScreenPropsTypes) => {
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
	const { setUserInfo }: any = useContext<ContextApiTypes>(RootContext);

	const [loaded, setLoaded] = useState(false);
	const [alreadyWatchAd, setAlreadyWatchAd] = useState(false);

	const updateUserCoin = async () => {
		const userDB = new FirestoreDB("User");
		const newData = {
			coin: userDB.incrementValue(5),
		};

		await userDB.update({
			documentId: userInfo.email,
			newData: newData,
		});

		setUserInfo({ ...userInfo, coin: userInfo.coin + 5 });
		setAlreadyWatchAd(true);
	};

	useEffect(() => {
		const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
			setLoaded(true);
		});

		const unsubscribeEarned = rewarded.addAdEventListener(
			RewardedAdEventType.EARNED_REWARD,
			async (reward) => {
				console.log("User earned reward of ", reward);
				await updateUserCoin();
			}
		);

		rewarded.load();

		return () => {
			unsubscribeLoaded();
			unsubscribeEarned();
		};
	}, []);

	if (!loaded)
		return (
			<Text textAlign="center" fontFamily="lato" fontSize="xl" mt="64" color={BASE_COLOR.text.primary}>
				loading...
			</Text>
		);

	return (
		<Layout>
			<VStack flex="1" justifyContent="center" alignItems="center">
				{alreadyWatchAd && <Text>Selamat kamu koin mu bertambah 5</Text>}
				{!alreadyWatchAd && (
					<Button
						title="klik untuk melihat iklan"
						onPress={() => {
							rewarded.show();
						}}
					/>
				)}
			</VStack>
		</Layout>
	);
};

export default RewardAdScreen;
