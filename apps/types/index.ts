export interface NotificationsTypes {
	id: string;
	message: string;
	createdAt: string;
}

export interface UserInfoTypes {
	isAuth?: boolean;
	name: string;
	email: string;
	deviceId?: string;
	referralCode?: string;
	coin: number;
	notifications: NotificationsTypes[];
	waitingListTransaction: string[];
}

export interface PriceTypes {
	id: string;
	totalCoin: number;
	totalPrice: number;
	discount: number;
}

export interface PaymentTypes {
	paymentMethods: string[];
	priceList: PriceTypes[];
	message: string;
}

export interface BannerTypes {
	countDown: string;
}

export interface tryOutSettings {
	categories: string[];
	cacheExpireTimeInMinute?: number;
}

export interface AppInfoTypes {
	banner: BannerTypes;
	payment: PaymentTypes;
	maintenanceMode: boolean;
	appVersion: number;
	tryOutSettings: tryOutSettings;
}

export interface ContextApiTypes {
	userInfo: UserInfoTypes;
	appInfo: AppInfoTypes;
}
