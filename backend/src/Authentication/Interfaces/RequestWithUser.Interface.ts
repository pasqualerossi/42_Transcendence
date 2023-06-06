import { Request } from 'express';

import { User } from '../../Users/Users.Entity';

// Request With User Interface
interface RequestWithUser extends Request 
{
  user: User;
}

// Token Payload Interface
interface TokenPayload 
{
  loginName: string;
  isSecondFactorAuthenticated: boolean;
}

export { RequestWithUser, TokenPayload };