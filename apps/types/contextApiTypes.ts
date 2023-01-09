export interface UserInfoTypes {
	name: string;
	email: string;
	isAuth: boolean;
	coin: number;
}

export interface AppInfoTypes {
	countDown: string;
}

export interface ContextApiTypes {
	userInfo: UserInfoTypes;
	appInfo: AppInfoTypes;
}
