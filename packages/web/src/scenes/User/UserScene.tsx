import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useUserQuery, User, Visit, Place } from 'graphql/types';
import { QueryPage } from 'components/QueryPage';
import { VisitCard } from 'components/VisitCard';
import { PlaceCard } from 'components/PlaceCard';
import { formatDate, plural } from 'utils/format';
import styled from 'styled-components';
import { groupVisitsByDay } from 'utils/groupVisitsByDay';
import { VisitGroup } from 'components/VisitGroup';

const InfoText = styled.p`
  margin-bottom: 1rem;
  font-size: 1.15rem;
  line-height: 1.5;
`;

const ArticleTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const UserScene = () => {
  const { userId } = useParams();

  const query = useUserQuery({
    variables: {
      userId: Number(userId!),
      placeOptions: {},
      visitOptions: { limit: 8 }
    }
  });

  return (
    <QueryPage<User> title={user => user.name} query={query}>
      {user => (
        <>
          <section>
            <InfoText>
              {user.firstName} gick med i Restaurate{' '}
              {formatDate(user.createdAt)} och har sedan dess gjort{' '}
              {user.visitCount} besök på {user.placeCount}{' '}
              {plural('plats', 'er', user.placeCount !== 1)}.
            </InfoText>
          </section>
          <section>
            <article>
              <ArticleTitle>Besök</ArticleTitle>
              {Object.entries(groupVisitsByDay(user.visits)).map(
                ([date, visits]: [string, Visit[]]) => (
                  <VisitGroup
                    key={date}
                    date={new Date(date)}
                    visits={visits}
                  />
                )
              )}
            </article>
            {/* <article>
            <h1>Platser</h1>
            <ul>
              {user.places.map((place: Place) => (
                <PlaceCard key={place.id!} place={place} to="" />
              ))}
            </ul>
          </article> */}
          </section>
        </>
      )}
    </QueryPage>
  );
};
