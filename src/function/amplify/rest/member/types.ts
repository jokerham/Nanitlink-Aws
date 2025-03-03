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
  
  userGroups: string[];
}

export interface CognitoGroup {
  GroupName: string;
}