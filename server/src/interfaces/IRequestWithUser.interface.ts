import { Request } from 'express';
import User from '../controllers/user/user.interface'
 
interface RequestWithUser extends Request {
  user: User
}
 
export default RequestWithUser