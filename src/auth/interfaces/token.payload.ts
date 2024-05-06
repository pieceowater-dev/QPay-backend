import { UserRoles } from '../../users/entities/user.entity';

export interface TokenPayload {
  id: number;
  role: UserRoles;
}
