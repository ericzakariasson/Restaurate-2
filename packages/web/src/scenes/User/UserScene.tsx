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
import { TabControl } from 'components/TabControl';

const InfoText = styled.p`
  margin-bottom: 1rem;
  font-size: 1.15rem;
  line-height: 1.5;
`;

const Article = styled.article`
  margin-top: 1.5rem;
`;

const ArticleTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

enum Tabs {
  Visits = 'Besök',
  Places = 'Platser'
}

export const UserScene = () => {
  const { userId } = useParams();

  const query = useUserQuery({
    variables: {
      userId: Number(userId!),
      visitOptions: { limit: 8 },
      placeOptions: { limit: 8 }
    }
  });

  const tabs = [Tabs.Visits, Tabs.Places];

  const [activeTab, setActiveTab] = React.useState<Tabs>(Tabs.Visits);

  const onChangeTab = (value: Tabs) => setActiveTab(value);

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
            <TabControl<Tabs>
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={onChangeTab}
            />
            {activeTab === Tabs.Visits && (
              <Article>
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
              </Article>
            )}
            {activeTab === Tabs.Places && (
              <Article>
                <ArticleTitle>Platser</ArticleTitle>
                <ul>
                  {user.places.map((place: Place) => (
                    <PlaceCard key={place.id!} place={place} to="" />
                  ))}
                </ul>
              </Article>
            )}
          </section>
        </>
      )}
    </QueryPage>
  );
};
