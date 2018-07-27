import React, { Component } from 'react';
import styled from 'styled-components';

import Label from '../../../components/Label';
import { StyledInput, Wrapper } from '../../../components/Input';

import Textarea from 'react-textarea-autosize';

const StyledTextarea = styled(Textarea)`
  border-radius: 5px;
  border: none;
  outline: none;
  box-shadow: ${p => p.theme.inputShadow};
  font-size: 2rem;
  padding: 20px;
  width: 100%;
  font-size: 2rem;
  font-family: ${p => p.theme.fonts.text};
  transition: ${p => p.theme.transition};
  line-height: 1.5;

  &::placeholder {
    color: #DDD;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const Characters = styled.p`
  font-size: 1.6rem;
  transition: ${p => p.theme.transition};
  color: ${p => p.maxLengthReached ? p.theme.danger : '#CCC'};
`;

class Comment extends Component {
  state = {
    value: '',
    maxLengthReached: false
  }

  handleChange = ({ target: { value } }) => {

    if (value.length <= this.props.maxLength) {
      this.setState({ value, maxLengthReached: false });
    } else {
      this.setState({ maxLengthReached: true });
    }
  }

  handleBlur = () => this.props.setValue('comment', this.state.value);

  render() {

    const { maxLengthReached } = this.state;
    const id = `new-visit-comment-box`;

    return (
      <Wrapper>
        <LabelWrapper>
          <Label style={{ marginBottom: 0 }} htmlFor={id}>Kommentar</Label>
          <Characters maxLengthReached={maxLengthReached}>{this.state.value.length}/{this.props.maxLength}</Characters>
        </LabelWrapper>
        <StyledTextarea
          minRows={2}
          id={id}
          placeholder={`Skriv något som är värt att minnas till nästa gång.`}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur} />
      </Wrapper>
    )
  }
}

export default Comment;