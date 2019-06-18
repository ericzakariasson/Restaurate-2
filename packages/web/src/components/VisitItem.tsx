import * as React from 'react';
import styled from 'styled-components';

import { MeVisits_me_visits } from '../queries/types/MeVisits';

const Item = styled.li``;

interface VisitItemProps extends MeVisits_me_visits {}

export const VisitItem = ({ id, visitDate }: VisitItemProps) => (
  <Item>{visitDate}</Item>
);
