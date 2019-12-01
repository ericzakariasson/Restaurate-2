import * as React from 'react';
import { FilterBox } from './components/FilterBox';
import { FilterPanel } from './components/FilterPanel';
import { List as ListIcon, Filter as FilterIcon } from 'react-feather';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

type ActivePanel = 'filter' | 'sort' | null;

export const Filter = () => {
  const [activePanel, setActivePanel] = React.useState<ActivePanel>('filter');
  const isPanelOpen = activePanel !== null;

  // React.useEffect(() => {
  //   window.addEventListener('click', handleClickOutside);
  //   return () => window.removeEventListener('click', handleClickOutside);
  // }, []);

  // const handleClickOutside = (e: Event) => {
  //   if (
  //     isPanelOpen &&
  //     panelRef.current &&
  //     !panelRef.current.contains(e.target as Node)
  //   ) {
  //     setActivePanel(null);
  //   }
  // };

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
      <FilterPanel isOpen={isPanelOpen} onClose={() => setActivePanel(null)} />
    </>
  );
};
