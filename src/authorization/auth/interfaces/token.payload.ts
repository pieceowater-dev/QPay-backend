import { UserRoles } from '../../../modules/users/entities/user.entity';

export interface TokenPayload {
  id: number;
  role: UserRoles;
}
