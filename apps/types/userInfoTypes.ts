export interface NotificationsTypes {
	id: string;
	message: string;
}

export interface UserInfoTypes {
	name: string;
	email: string;
	coin: number;
	notifications: NotificationsTypes[];
	enrollTryOutId: string[];
}
