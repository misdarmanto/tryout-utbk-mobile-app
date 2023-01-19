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

export interface PriceTypes {
	id: string;
	totalCoin: number;
	totalAmount: number;
}

export interface PaymentTypes {
	paymentMethods: string[];
	priceList: PriceTypes[];
}

export interface BannerTypes {
	countDown: string;
}

export interface AppInfoTypes {
	banner: BannerTypes;
	payment: PaymentTypes;
	maintenanceMode: boolean;
	appVersion: number;
}

export interface ContextApiTypes {
	userInfo: UserInfoTypes;
	appInfo: AppInfoTypes;
}
