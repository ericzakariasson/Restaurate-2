import * as React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { X } from 'react-feather';
import ScrollLock from 'react-scrolllock';

import { animated, useTransition, config } from 'react-spring';

const modalRoot = document.getElementById('modal-root');

interface PopupProps {
  padding?: boolean;
}

const Popup = styled(animated.aside)<PopupProps>`
  background: #fff;
  border-radius: 1.5rem;
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  z-index: 10;
  box-shadow: ${p => p.theme.boxShadow};
  padding: ${p => p.padding && '0 1rem 1.5rem'};
  min-height: 50vh;
  display: flex;
  flex-direction: column;
`;

const Background = styled(animated.div)`
  background: rgba(0, 0, 0, 0.05);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9;
`;

const PopupHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.5rem 1rem 0;
`;

const PopupTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background: #eee;
  border-radius: 0.5rem;
  border: none;
`;

export interface ModalProps {
  open: boolean;
  title?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  padding?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  children,
  title,
  onClose,
  showCloseButton = true,
  padding = undefined
}) => {
  const popupTransitions = useTransition(open, null, {
    from: { transform: 'translate3d(0, 100%, 0)' },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: { transform: 'translate3d(0, 100%, 0)' },
    config: config.stiff
  });

  const backgroundTransitions = useTransition(open, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return modalRoot
    ? createPortal(
        <>
          {popupTransitions.map(
            ({ item, key, props }) =>
              item && (
                <Popup key={key} style={props} padding={padding}>
                  <PopupHeader>
                    {title && <PopupTitle>{title}</PopupTitle>}
                    {showCloseButton && (
                      <CloseButton onClick={onClose}>
                        <X size={18} color="#222" />
                      </CloseButton>
                    )}
                  </PopupHeader>
                  {children}
                </Popup>
              )
          )}
          {backgroundTransitions.map(
            ({ item, key, props }) =>
              item && <Background key={key} style={props} onClick={onClose} />
          )}
          <ScrollLock isActive={open} />
        </>,
        modalRoot
      )
    : null;
};
