import AsyncStorage from "@react-native-async-storage/async-storage";

const store = async (key: string, value: any) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (error: any) {
		console.log(error);
		return error;
	}
};

const get = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (error: any) {
		console.log(error);
		return error;
	}
};

const remove = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error: any) {
		console.log(error);
		return error;
	}
};

const update = async (key: string, value: any) => {
	try {
		if (!Array.isArray(value)) throw "data must be an array";

		const getPreviousData = await AsyncStorage.getItem(key);
		if (!getPreviousData) throw "data not found!";

		const previousData = JSON.parse(getPreviousData);
		const newData = JSON.stringify([...previousData, ...value]);
		await AsyncStorage.setItem(key, newData);
	} catch (error: any) {
		console.log(error);
		return error;
	}
};

export const LOCAL_STORAGE = { store, get, remove, update };
