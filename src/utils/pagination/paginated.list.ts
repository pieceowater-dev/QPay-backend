import { Totals } from './paginated.list.totals';

export interface PaginatedList<Entity, Info extends Totals = Totals> {
  items: Entity[];
  totals: Info;
}
