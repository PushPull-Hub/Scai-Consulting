import { Profile } from './Profile.model';

export class Account extends Object {
  user: {
    email: string;
    password: string;
  };
  profile: Profile;
}
