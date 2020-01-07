import { VisitFragment } from '../graphql/types';

type Groups = { [key: string]: VisitFragment[] };

export const groupVisitsByDay = (visits: VisitFragment[]): Groups =>
  visits.reduce((groups: Groups, visit: VisitFragment) => {
    const visitDay = new Date(visit.visitDate).toISOString().slice(0, 10);

    const group = visitDay in groups ? groups[visitDay] : [];

    return {
      ...groups,
      [visitDay]: [...group, visit]
    };
  }, {});
