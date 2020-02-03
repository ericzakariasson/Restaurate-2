import styled from 'styled-components';

export const TagItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  background: #f5f5f5;
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  border-radius: 0.25rem;

  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;
