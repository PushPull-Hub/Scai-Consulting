import { User } from './User.model';

export class Profile extends Object {
  id: number;
  email: string;
  password: string;
  user: User;
}
