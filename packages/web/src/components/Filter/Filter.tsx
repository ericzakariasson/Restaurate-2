import * as React from 'react';
import { FilterBox } from './components/FilterBox';
import { List as ListIcon, Filter as FilterIcon, X } from 'react-feather';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const Panel = styled.div<{ open: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 16px;
  transform: translateY(${p => (p.open ? '0' : '100%')});
  box-shadow: 0 0px 16px rgba(0, 0, 0, 0.08);
  padding: ${p => p.theme.page.sidePadding};
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: ${p => p.theme.page.sidePadding};
`;

type ActivePanel = 'filter' | 'sort' | null;

export const Filter = () => {
  const [activePanel, setActivePanel] = React.useState<ActivePanel>(null);

  const panelRef = React.useRef<HTMLDivElement>(null);

  const isPanelOpen = activePanel !== null;

  React.useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleClickOutside = (e: Event) => {
    if (
      isPanelOpen &&
      panelRef.current &&
      !panelRef.current.contains(e.target as Node)
    ) {
      setActivePanel(null);
    }
  };

  return (
    <>
      <Wrapper>
        <FilterBox
          title="Sortera"
          icon={ListIcon}
          onClick={() => setActivePanel('sort')}
        />
        <FilterBox
          title="Filtrera"
          icon={FilterIcon}
          onClick={() => setActivePanel('filter')}
        />
      </Wrapper>
      <Panel open={isPanelOpen} ref={panelRef}>
        <Heading>
          <h1>Filter</h1>
          <X onClick={() => setActivePanel(null)} />
        </Heading>
        <section>
          <article>
            <h1>Taggar</h1>
            {/* Map possible tags */}
          </article>
          <article>
            <h1>Betyg</h1>
            {/* Use range slider for score */}
          </article>
          <article>
            <h1>Besök</h1>
            {/* Input fields for number of visits */}
          </article>
          <article>
            <h1>Datum</h1>
            {/* Input fields for dates */}
          </article>
          <article>
            <h1>Typ av ställe</h1>
            {/* Map possible types */}
          </article>
          <article>
            <h1>Prisklass</h1>
            {/* Map possible price levels */}
          </article>
          <article>
            <h1>Kommentar</h1>
            {/* Text box for comment includes */}
          </article>
        </section>
      </Panel>
    </>
  );
};
