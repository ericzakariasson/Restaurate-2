import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
  display: flex;
  list-style: none;
  position: relative;
  border-radius: 0.5rem;
  background: #eee;
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.li<TabProps>`
  flex: 1;
  font-size: 1rem;
  text-align: center;
  padding: 0.75rem 0.5rem;
  font-weight: 500;
  position: relative;
  z-index: 2;
  color: ${p => (p.active ? '#222' : '#666')};
  transition: 0.3s cubic-bezier(0.8, 0, 0.2, 1);
`;

interface HighlightProps {
  active: number;
  total: number;
}

const Highlight = styled.div<HighlightProps>`
  width: ${p => 100 / p.total}%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 0.25rem;
  position: absolute;
  z-index: 1;
  transform: translate3d(${p => p.active * 100}%, 0, 0);
  transition: 0.4s cubic-bezier(0.8, 0, 0.2, 1);
  will-change: transform;
`;

const HighlightInner = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: ${p => p.theme.boxShadow};
`;

interface Tab {
  label: string;
  value: string;
}

interface TabControlProps {
  tabs: Tab[];
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export function TabControl({ tabs, activeTab, onChange }: TabControlProps) {
  const activeTabIndex = tabs.findIndex(tab => tab.value === activeTab.value);
  return (
    <Wrapper>
      {tabs.map((tab, i) => (
        <Tab
          key={tab.value}
          active={i === activeTabIndex}
          onClick={() => onChange(tab)}
        >
          {tab.label}
        </Tab>
      ))}
      <Highlight total={tabs.length} active={activeTabIndex}>
        <HighlightInner />
      </Highlight>
    </Wrapper>
  );
}
