export interface NotificationsTypes {
	id: string;
	message: string;
	date: string;
}

export interface UserInfoTypes {
	name: string;
	email: string;
	isAuth?: boolean;
	coin: number;
	notifications: NotificationsTypes[];
	enrollTryOutId?: string[];
}

export interface PymentTypes {
	id: string;
	totalCoin: number;
	totalAmount: number;
}

export interface AppInfoTypes {
	banner: {
		countDown: string;
	};
	payment: PymentTypes[];
	maintenanceMode: boolean;
	appVersion: number;
}

export interface ContextApiTypes {
	userInfo: UserInfoTypes;
	appInfo: AppInfoTypes;
}
