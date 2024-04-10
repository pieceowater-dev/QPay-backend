import { PaginatedList } from './paginated.list';

export default <Entity>(
  value: [items: Entity[], count: number],
): PaginatedList<Entity> => ({
  items: value[0],
  totals: {
    count: value[1],
  },
});
