import React from 'react';
import { Slide, toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { XCircle } from 'react-feather';

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
  padding: 15px 20px;
  box-shadow: ${p => p.theme.boxShadow};
  position: relative;
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1<LevelProps>`
  color: #fff;
  font-size: ${p => p.theme.fontSize.normal};
  color: ${p => p.theme.notification[p.level].color};
  text-align: left;
  font-weight: 400;
  margin-right: 10px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-top: 10px;
`;

const Description = styled.p<LevelProps>`
  margin-top: 2px;
  color: #fff;
  font-size: ${p => p.theme.fontSize.normal};
  color: ${p => p.theme.notification[p.level].color};
`;

const Dismiss = styled(XCircle)<LevelProps>`
  color: ${p => p.theme.notification[p.level].color};
`;

interface NotificationProps {
  title: string;
  description?: string;
  level: NotificationLevel;
  content?: React.ReactNode;
}

const Notification = ({
  title,
  description,
  level,
  closeToast,
  content
}: NotificationProps & { closeToast?: () => void }) => {
  return (
    <Wrapper level={level}>
      <InnerWrapper>
        <Title level={level}>{title}</Title>
        {description && <Description level={level}>{description}</Description>}
        {content && <Content>{content}</Content>}
      </InnerWrapper>
      <Dismiss level={level} color="#FFF" onClick={closeToast} />
    </Wrapper>
  );
};

interface NotifyProps extends NotificationProps {
  options?: ToastOptions;
}

export const notify = ({ options, ...props }: NotifyProps): number | string =>
  toast(<Notification {...props} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: false,
    closeButton: false,
    closeOnClick: true,
    transition: Slide,
    ...options
  });
