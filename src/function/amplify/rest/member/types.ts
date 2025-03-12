// Define interface for user
export interface CognitoUser {
  id: string;
  name: string;
  userName: string;
  email: string;
  nickName: string;
  birthday?: string;
  signUpDate?: string;
  lastSignInDate?: string;
  activeState: string;
  mailing: string;
  messaging: string;
  userGroups: string[];
  sub: string;
}

export interface CognitoGroup {
  GroupName: string;
}