import { MeVisits_me_visits } from '../queries/types/MeVisits';

type Groups = { [key: string]: MeVisits_me_visits[] };

export const groupVisitsByDate = (visits: Array<MeVisits_me_visits>): Groups =>
  visits.reduce((groups: Groups, visit: MeVisits_me_visits) => {
    const group = visit.visitDate in groups ? groups[visit.visitDate] : [];

    return {
      ...groups,
      [visit.visitDate]: [...group, visit]
    };
  }, {});
