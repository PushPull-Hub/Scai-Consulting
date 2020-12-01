import { Gender } from './Gender.model';

export class MiniProfile extends Object {
  Id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  active: boolean;
}
