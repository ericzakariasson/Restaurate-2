import { VisitFragment } from '../graphql/types';

type Groups = { [key: string]: VisitFragment[] };

export const groupVisitsByDate = (visits: Array<VisitFragment>): Groups =>
  visits.reduce((groups: Groups, visit: VisitFragment) => {
    const group = visit.visitDate in groups ? groups[visit.visitDate] : [];

    return {
      ...groups,
      [visit.visitDate]: [...group, visit]
    };
  }, {});
