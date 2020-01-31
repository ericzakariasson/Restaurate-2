import { Visit } from '../graphql/types';

type Groups = { [key: string]: Visit[] };

export const groupVisitsByDay = (visits: Visit[]): Groups =>
  visits.reduce((groups: Groups, visit: Visit) => {
    const visitDay = new Date(visit.visitDate).toISOString().slice(0, 10);

    const group = visitDay in groups ? groups[visitDay] : [];

    return {
      ...groups,
      [visitDay]: [...group, visit]
    };
  }, {});
