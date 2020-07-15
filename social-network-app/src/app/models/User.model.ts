import { Friend } from './Friend.model';

export class User extends Object {
  id: number;
  username: string;
  email: string;
  password: string;
  firstname: string;
  secondname: string;
  isActive: boolean;
  about: string;
  gender: string;
  birthday: {
    year: number;
    month: number;
    day: number;
  };
  hometown: string;
  adress: string;
  location: string;
  work_in: string;
  relationship_status: string;
  friends: Friend[];
}
