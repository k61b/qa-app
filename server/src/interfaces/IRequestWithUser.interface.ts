import { Request } from 'express';
import User from '../controllers/auth/auth.interface'
 
interface RequestWithUser extends Request {
  user: User
}
 
export default RequestWithUser