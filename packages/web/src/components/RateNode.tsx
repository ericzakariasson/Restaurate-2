import * as React from 'react';
import styled from 'styled-components';

import { RateNode } from '../types/visit';
import { InputSlider } from './Slider';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 3px;

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.h2`
  color: #333;
  font-size: 1.375rem;
  font-weight: 700;
`;

const ParentArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: #f9f9f9;
`;

interface NodeProps {
  node: RateNode;
  // addRate: any;
  // enableRateNode: (name: string) => void;
  // disableRateNode: (name: string) => void;
}

export const Node = ({
  node
}: // addRate,
// enableRateNode,
// disableRateNode
NodeProps) => {
  const [value, setValue] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Wrapper key={node.name}>
      <ParentArea>
        <Info>
          <Name>{node.label}</Name>
          {!open && <button onClick={handleOpen}>Lägg till</button>}
        </Info>
        {open && (
          <div style={{ marginTop: 15 }} onClick={handleClose}>
            <InputSlider value={value} setValue={setValue} />
          </div>
        )}
      </ParentArea>
    </Wrapper>
  );
};
