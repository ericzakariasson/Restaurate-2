import * as React from 'react';
import styled from 'styled-components';
import { rateNodes } from 'constants/rate.constants';
import { ListInput, Label, Textarea, DateInput } from 'components';
import { RateSliderParent, RateHeader } from './components/RateParent';
import { Values, Handlers } from './useVisitForm';

const RateTotal = styled.article`
  margin-top: 30px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

interface VisitFormProps {
  handlers: Handlers;
  values: Values;
}

export const VisitForm = ({ handlers, values }: VisitFormProps) => {
  return (
    <>
      <Section>
        <ListInput
          label="Beställningar"
          items={values.orders}
          addItem={handlers.addOrder}
          removeItem={handlers.removeOrder}
          placeholder="Tikka Masala, nr. 5 ..."
        />
      </Section>
      <Section>
        <Label text="Betyg" />
        {rateNodes.map(node => (
          <RateSliderParent
            key={node.name}
            label={node.label}
            name={node.name}
            score={values.rateState[node.name].score}
            controlled={!!values.rateState[node.name].controlled}
            setScore={handlers.setScore}
            children={
              node.children
                ? node.children.map(child => ({
                    ...child,
                    controlled: false,
                    score: values.rateState[node.name].children![child.name]
                      .score,
                    children: undefined
                  }))
                : undefined
            }
          />
        ))}
        <RateTotal>
          <RateHeader label="Betyg" score={values.averageScore} />
        </RateTotal>
      </Section>
      <Section>
        <Label text="Kommentar" />
        <Textarea
          placeholder="Något som kan vara värt att minnas till nästa gång?"
          rows={3}
          value={values.comment}
          maxLength={300}
          onChange={e => handlers.setComment(e.target.value)}
        />
      </Section>
      <Section>
        <Label text="Datum" />
        <DateInput onChange={handlers.setVisitDate} />
      </Section>
    </>
  );
};
