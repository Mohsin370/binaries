import Role from './role.interface';

interface User {
  id: string; //should be uuid
  name: string;
  email: string;
  password: string;
  verification_token: string;
  isEmail_verified: boolean;
  Roles:Role[]
}


export default User;