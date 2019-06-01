import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus } from 'react-feather';
import { Tag } from '../types/places';

import { Input } from './Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagList = styled.ul`
  list-style: none;
`;

const TagItem = styled.li`
  padding: 10px 15px;
  border-radius: 3px;
  background: #fff;
  margin-bottom: 5px;
  border: 1px solid #eee;

  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
`;

const Remove = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  color: ${p => p.theme.colors.primary.hex};
  font-size: 0.75rem;
  font-weight: 600;
`;

const Form = styled.form`
  position: relative;
  margin-bottom: 10px;
`;

const TagInput = styled(Input)`
  padding-right: 50px;
`;

interface AddButtonProps {
  active: boolean;
}

const AddTag = styled.button<AddButtonProps>`
  background: none;
  border: none;
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  right: 5px;
  top: 5px;
  background: ${p => (p.active ? '#FFF' : 'none')};
  transition: ${p => p.theme.transition};

  svg {
    stroke: ${p => (p.active ? p.theme.colors.primary.hex : '#AAA')};
    transition: ${p => p.theme.transition};
  }
`;

interface PlaceFormTagsProps {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (id: string) => void;
}

export const PlaceFormTags = ({
  tags,
  addTag,
  removeTag
}: PlaceFormTagsProps) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (value.length) {
      addTag(value);
      setValue('');
    }
  };

  const activeInput = value.length > 0;

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <TagInput value={value} onChange={handleChange} />
        <AddTag active={activeInput} type="submit">
          <Plus size={28} color="#aaa" />
        </AddTag>
      </Form>
      <TagList>
        {tags.map(tag => (
          <TagItem key={tag}>
            {tag}
            <Remove onClick={() => removeTag(tag)}>Ta bort</Remove>
          </TagItem>
        ))}
      </TagList>
    </Wrapper>
  );
};
