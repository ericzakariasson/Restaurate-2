import * as React from 'react';
import styled, { css } from 'styled-components';
import { useDevice } from 'hooks';

const Wrapper = styled.div`
  display: block;
  border-radius: 6px;
  background: #fcfcfc;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1.125rem;
  width: 100%;
  transition: ${p => p.theme.transition};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: ${p => p.theme.boxShadow};
`;

const Readable = styled.label`
  padding: 15px;
  flex: 1;
  text-align: center;
  height: 50px;
  border-radius: 0 3px 3px 0;
  /* border: 1px solid #eee; */
  color: #222;
  /* background: #fff; */

  &::first-letter {
    text-transform: uppercase;
  }
`;

interface InputProps {
  isMobile?: boolean;
}

const Input = styled.input<InputProps>`
  border-radius: 3px 0 0 3px;
  height: 50px;
  font-size: 1rem;
  background: none;
  border: none;
  padding: 15px;
  text-align: center;
  margin-right: -30px;

  ${p =>
    p.isMobile &&
    css`
      -webkit-appearance: none;
      appearance: none;
      width: 0;
      opacity: 0;

      &::-webkit-clear-button,
      &::-webkit-calendar-picker-indicator,
      &::-webkit-inner-spin-button,
      &::-webkit-inner-spin-button,
      &::-webkit-calendar-picker-indicato {
        display: none;
      }
    `}

  ${p =>
    !p.isMobile &&
    css`
      position: absolute;
      width: 180px;
      text-align: left;
    `}
`;

function toReadableDate(date: Date): string {
  return date.toLocaleDateString('sv-SE', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

interface DateInputProps {
  onChange: (date: Date) => void;
  initialDate?: Date;
}

export const DateInput = ({
  onChange,
  initialDate = new Date()
}: DateInputProps) => {
  const [date, setDate] = React.useState<Date>(initialDate);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
    onChange(newDate);
  };

  const readable = toReadableDate(date);

  const inputId = 'visit-date-input';
  const inputValue = date.toISOString().substring(0, 10);

  const { isMobile } = useDevice();

  return (
    <Wrapper>
      <Input
        id={inputId}
        value={inputValue}
        onChange={handleChange}
        type="date"
        isMobile={isMobile}
      />
      <Readable htmlFor={inputId}>{readable}</Readable>
    </Wrapper>
  );
};
