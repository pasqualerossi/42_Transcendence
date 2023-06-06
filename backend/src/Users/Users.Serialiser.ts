import { Exclude, Expose } from "class-transformer";

// This code defines a serialiser class for user friend data with various properties.

export class UserFriendsSerialiser
{
	@Expose()
	id: number;

	@Expose()
	loginName: string;

	@Expose()
	username: string;

	@Expose()
	profilePictureURL: string;

	@Expose()
	avatarId?: number;

	@Expose()
	status: number;

	@Expose()
	rank: number;

	@Expose()
	wins: number;

	@Expose()
	loses: number;

	@Exclude()
	currentHashedRefreshToken?: string;

	@Exclude()
	twoFactorAuthenticationSecret?: string;

	@Exclude()
	isTwoFactorAuthenticationEnabled: boolean;
}