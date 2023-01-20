export interface NotificationsTypes {
	id: string;
	message: string;
	createdAt: string;
}

export interface UserInfoTypes {
	isAuth?: boolean;
	name: string;
	email: string;
	coin: number;
	notifications: NotificationsTypes[];
	enrollTryOutId: string[];
	waitingListTransaction: string[];
}

export interface PriceTypes {
	id: string;
	totalCoin: number;
	totalPrice: number;
}

export interface PaymentTypes {
	paymentMethods: string[];
	priceList: PriceTypes[];
	message: string;
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
