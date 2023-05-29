import { Request } from 'express';
import { User } from '../../users/users.entity';

interface RequestWithUser extends Request {
	user: User;
}

export default RequestWithUser;