import { Gender } from './Gender.model';

export class User extends Object {
  id: number;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  gender: Gender;
  active: boolean;
  about: string;
  birthday: Birthday;
  hometown: string;
  address: string;
  location: string;
  workIn: string;
  relationshipStatus: string;
}

export class Birthday extends Object {
  year: number;
  month: number;
  day: number;
}
