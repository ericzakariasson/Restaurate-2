import * as React from 'react';
import styled from 'styled-components';

interface Tab {
  index: number;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  index: number;
  setIndex: (i: number) => void;
}

const TabList = styled.ul`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  list-style: none;
  display: flex;
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.li<TabProps>`
  padding: 5px 10px;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08rem;
  opacity: ${p => (p.active ? 1 : 0.2)};
`;

export const Tabs = ({ tabs, index, setIndex }: TabsProps) => (
  <TabList>
    {tabs.map(tab => (
      <Tab
        active={tab.index === index}
        key={tab.index}
        onClick={() => setIndex(tab.index)}
      >
        {tab.label}
      </Tab>
    ))}
  </TabList>
);
