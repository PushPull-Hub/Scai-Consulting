import { Gender } from './Gender.model';

export class MiniProfile extends Object {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  active: boolean;
  profilePictureUrl: string;
}
