import * as React from 'react';
import styled from 'styled-components';
import { Textarea, SmallLabel } from '../../../components';

import { useDebounce } from 'use-debounce';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

interface CommentProps {
  setComment: (value: string) => void;
}

export const Comment = ({ setComment }: CommentProps) => {
  const [value, setValue] = React.useState('');
  const [debouncedValue] = useDebounce(value, 500);

  React.useEffect(() => {
    setComment(debouncedValue);
  }, [debouncedValue, setComment]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleBlur = () => {
    setComment(value);
  };

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
