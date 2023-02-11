import { VStack, Text, View } from "native-base";
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
import LoadingAnimation from "../../components/animations/Loading";
import SupriseAnimation from "../../components/animations/suprise";
import {
	getExpireTimeFromLocalStorage,
	setExpireTimeToLocalStorage,
} from "../../localStorage/localStorageDB";

const adUnitId = __DEV__ ? TestIds.REWARDED : "ca-app-pub-8095237298596091/9584709385";

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
	requestNonPersonalizedAdsOnly: true,
	keywords: ["fashion", "clothing"],
});

type RewardAdScreenPropsTypes = NativeStackScreenProps<RootParamList, "RewardAd">;

const RewardAdScreen = ({ navigation }: RewardAdScreenPropsTypes) => {
	const { userInfo, appInfo } = useContext<ContextApiTypes>(RootContext);
	const { setUserInfo }: any = useContext<ContextApiTypes>(RootContext);

	const [loaded, setLoaded] = useState(false);
	const [alreadyWatchAd, setAlreadyWatchAd] = useState(false);

	const updateUserCoin = async () => {
		const userDB = new FirestoreDB("User");
		const newData = {
			coin: userDB.incrementValue(appInfo.payment.totalCoinAds),
		};

		await userDB.update({
			documentId: userInfo.email,
			newData: newData,
		});

		setUserInfo({ ...userInfo, coin: userInfo.coin + appInfo.payment.totalCoinAds });
		setAlreadyWatchAd(true);
	};

	// useEffect(() => {
	// 	(async () => {
	// 		const EXPIRE_TIME_KEY = "rewardAd";
	// 		const expireTime = await getExpireTimeFromLocalStorage({ key: EXPIRE_TIME_KEY });

	// 		const currentDateTime = Date.now();
	// 		const hasExpired = expireTime >= currentDateTime;

	// 		if (!expireTime) {
	// 			await setExpireTimeToLocalStorage({ key: EXPIRE_TIME_KEY, time: 2 });
	// 		}
	// 		console.log(expireTime);
	// 	})();
	// }, []);

	useEffect(() => {
		const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
			setLoaded(true);
		});

		const unsubscribeEarned = rewarded.addAdEventListener(
			RewardedAdEventType.EARNED_REWARD,
			async (reward) => {
				await updateUserCoin();
			}
		);

		rewarded.load();

		return () => {
			unsubscribeLoaded();
			unsubscribeEarned();
		};
	}, []);

	if (!loaded) return <LoadingAnimation />;

	return (
		<VStack flex="1" bgColor={"#FFF"} justifyContent="center" alignItems="center">
			{alreadyWatchAd && <SupriseAnimation title="Selamat koin mu bertambah" />}
			{!alreadyWatchAd && (
				<Button
					title="klik untuk melihat iklan"
					onPress={() => {
						rewarded.show();
					}}
				/>
			)}
		</VStack>
	);
};

export default RewardAdScreen;
