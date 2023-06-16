import { Request } from 'express';

import { User } from '../../Profile/Profile.Entity';

// Request With User Interface
interface RequestUser extends Request 
{
  user: User;
}

// Token Payload Interface
interface TokenPayload 
{
  loginName: string; // Representing The Login Name
  isSecondFactorAuthenticated: boolean; // This Is Indicating Whether The Second-Factor Authentication Is Authenticated.
}

export { RequestUser, TokenPayload };