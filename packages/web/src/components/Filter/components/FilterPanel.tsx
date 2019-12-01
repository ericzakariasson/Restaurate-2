import * as React from 'react';
import styled from 'styled-components';
import { X } from 'react-feather';
import { FilterArticle } from './FilterArticle';

const Panel = styled.article<{ open: boolean }>`
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  border-radius: 12px;
  transform: translateY(${p => (p.open ? '0' : '100%')});
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: ${p => p.theme.page.sidePadding};
  transition: ${p => p.theme.transition};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${p => p.theme.page.sidePadding};
`;

const Title = styled.h1`
  font-size: ${p => p.theme.fontSize.xl};
`;

const CloseIcon = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border: none;
`;

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Panel open={isOpen}>
      <Header>
        <Title>Filter</Title>
        <CloseIcon onClick={onClose}>
          <X size={18} color="#666" />
        </CloseIcon>
      </Header>
      <section>
        <FilterArticle title="Taggar"></FilterArticle>
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
  );
};
