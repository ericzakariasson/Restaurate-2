import { DateInput, Label, ListInput, Textarea } from 'components';
import { Switch } from 'components/Switch';
import { UploadImages } from 'components/UploadImage/UploadImages';
import { rateNodes } from 'constants/rate.constants';
import * as React from 'react';
import styled from 'styled-components';
import { RateHeader, RateSliderParent } from './components/RateParent';
import { Handlers, Values } from './useVisitForm';

const RateTotal = styled.article`
  margin-top: 30px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SwitchArticle = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const SwitchLabel = styled.p`
  margin-right: 20px;
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
        <Label text="Bilder" />
        <UploadImages
          onChange={handlers.onImagesChange}
          images={values.images}
          orders={values.orders}
        />
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
        <DateInput onChange={handlers.setVisitDate} value={values.visitDate} />
      </Section>
      <Section>
        <Label text="Övrigt" />
        <SwitchArticle>
          <SwitchLabel>Privat besök (bara du kan se det)</SwitchLabel>
          <Switch onChange={handlers.setPrivate} on={values.isPrivate} />
        </SwitchArticle>
        <SwitchArticle>
          <SwitchLabel>Take away</SwitchLabel>
          <Switch onChange={handlers.setTakeAway} on={values.isTakeAway} />
        </SwitchArticle>
      </Section>
    </>
  );
};
