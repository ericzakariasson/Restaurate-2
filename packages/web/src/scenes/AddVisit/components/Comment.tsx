import * as React from 'react';
import styled from 'styled-components';
import { Textarea, SmallLabel } from '../../../components';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

interface CommentProps {
  setComment: (value: string) => void;
}

export const Comment = ({ setComment }: CommentProps) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleBlur = () => setComment(value);

  return (
    <Wrapper>
      <SmallLabel text="Kommentar" />
      <Textarea
        placeholder="Något som kan vara värt att minnas till nästa gång?"
        rows={3}
        value={value}
        maxLength={300}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Wrapper>
  );
};
