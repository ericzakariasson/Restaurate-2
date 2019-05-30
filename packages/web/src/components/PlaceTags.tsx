import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus } from 'react-feather';
import { Tag } from '../types/places';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagsList = styled.ul`
  list-style: none;
`;

const TagItem = styled.li`
  display: inline-block;
  padding: 6px 8px;
  border-radius: 3px;
  background: ${p => p.theme.colors.main.rgba(40)};
  margin-bottom: 5px;
  margin-right: 5px;
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  background: #eee;
  border: none;
  border-radius: 4px;
  outline: none;
  padding: 10px;
  font-size: 1rem;
  margin-right: 10px;
  height: 40px;

  &:focus {
    background: #f5f5f5;
  }
`;

const AddTag = styled.button`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.colors.main.rgba(40)};
`;

interface PlaceTagsProps {
  tags: Tag[];
  addTag: (tag: string) => void;
  removeTag?: (id: string) => void;
}

export const PlaceTags = ({ tags, addTag, removeTag }: PlaceTagsProps) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTag(value);
    setValue('');
  };

  return (
    <Wrapper>
      <TagsList>
        {tags.map(tag => (
          <TagItem key={tag.name}>{tag.name}</TagItem>
        ))}
      </TagsList>
      <Form onSubmit={handleSubmit}>
        <Input value={value} onChange={handleChange} />
        <AddTag type="submit">
          <Plus />
        </AddTag>
      </Form>
    </Wrapper>
  );
};
