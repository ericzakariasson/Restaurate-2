import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { toast, ToastContainer, Slide, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationContainer = styled(ToastContainer)`
  .Toastify__toast {
    max-height: none;
    border-radius: 0;
    background: none;
    color: unset;
    min-height: 0;
    padding: 10px;
    box-shadow: none;
    font-family: ${p => p.theme.fonts.default};
    position: relative;
    overflow: hidden;
  }

  .Toastify__progress-bar {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    width: auto;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.35);
    opacity: 0.5;
  }
`;

type NotificationLevel = 'success' | 'warning' | 'error' | 'info';

interface LevelProps {
  level: NotificationLevel;
}

const Wrapper = styled.article<LevelProps>`
  border-radius: 10px;
  background: ${p => p.theme.notification[p.level].background};
  padding: 20px;
  box-shadow: ${p => p.theme.boxShadow};
  position: relative;
  backdrop-filter: blur(3px);
`;

const Title = styled.h1<LevelProps>`
  color: #fff;
  font-size: ${p => p.theme.fontSize.xl};
  color: ${p => p.theme.notification[p.level].color};
`;

const Description = styled.p<LevelProps>`
  margin-top: 2px;
  color: #fff;
  font-size: ${p => p.theme.fontSize.normal};
  color: ${p => p.theme.notification[p.level].color};
`;

interface NotificationProps {
  title: string;
  description?: string;
  level: NotificationLevel;
}

const Notification = ({
  title,
  description,
  level,
  ...rest
}: NotificationProps) => {
  console.log(rest);

  return (
    <Wrapper level={level}>
      <Title level={level}>{title}</Title>
      {description && <Description level={level}>{description}</Description>}
    </Wrapper>
  );
};

interface NotifyProps extends NotificationProps {
  options?: ToastOptions;
}

export const notify = ({ options, ...props }: NotifyProps) => {
  toast(<Notification {...props} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 5000,
    closeButton: false,
    closeOnClick: true,
    transition: Slide,
    ...options
  });
};
