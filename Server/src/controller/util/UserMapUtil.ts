import { debug } from 'winston';

import { User } from '../../entity/security/User';
import { UserCredential } from '../../entity/security/UserCredential';
import { UserProfile } from '../../entity/security/UserProfile';

export class UserMapUtil {
	public static mapUser(user): User {
		let userObj = new User();
		userObj.userName = user.userName;
		userObj.userProfile = new UserProfile();
		userObj.userProfile.firstName = user.userProfile.firstName;
		userObj.userProfile.lastName = user.userProfile.lastName;
		userObj.userProfile.mobile = user.userProfile.mobile;
		userObj.userCredential = new UserCredential();
		userObj.userCredential.credential = user.userCredential.credential;
		debug(`mapped User: ${JSON.stringify(userObj)}`);
		return userObj;
	}

	public static mapProfile(profile): UserProfile {
		let profileObj = new UserProfile();
		profileObj.firstName = profile.firstName;
		profileObj.lastName = profile.lastName;
		profileObj.middleName = profile.middleName || '';
		profileObj.addressLine1 = profile.addressLine1 || '';
		profileObj.addressLine2 = profile.addressLine2 || '';
		profileObj.addressLine3 = profile.addressLine3 || '';
		profileObj.city = profile.city || '';
		profileObj.country = profile.country || '';
		profileObj.dayOfBirth = profile.dayOfBirth || 0;
		profileObj.monthOfBirth = profile.monthOfBirth || 0;
		profileObj.yearOfBirth = profile.yearOfBirth || 0;
		profileObj.homeTelephone = profile.homeTelephone || '';
		profileObj.mobile = profile.mobile || '';
		profileObj.zipCode = profile.zipCode || '';
		return profileObj;
	}
}
