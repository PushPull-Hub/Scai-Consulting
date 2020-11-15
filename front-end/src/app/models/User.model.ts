import { Gender } from './Gender.model';

export class User extends Object {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  active: boolean;
  about: string;
  birthday: {
    year: number;
    month: number;
    day: number;
  };
  hometown;
  address: string;
  location: string;
  workIn: string;
  relationshipStatus: string;
}
