import { Cloudinary } from 'cloudinary-core';
import { ActionButton } from 'components';
import * as React from 'react';
import { Plus, X } from 'react-feather';
import styled from 'styled-components';
import { PreviewImage } from '../UploadImages';

const cloudinary = new Cloudinary({ cloud_name: 'restaurate' });

const ImagePreviewCard = styled.div`
  background-size: cover;
  background-position: center;
  height: 120px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
  width: 80%;
  max-width: 320px;
  min-width: 220px;

  margin-right: 20px;
  position: relative;
  overflow: hidden;
`;

const RemovePreview = styled(X)`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
`;

interface ImagePreviewProps extends Pick<PreviewImage, 'src'> {
  onRemove: (name: string) => void;
  onOrderChange: (orders: string[], name: string) => void;
  orders: string[];
  selectedOrders: string[];
  name: string;
  isImage: boolean;
}

export const ImagePreview = ({
  src,
  name,
  onRemove,
  orders,
  selectedOrders,
  onOrderChange,
  isImage
}: ImagePreviewProps) => {
  const addOrder = (order: string) => {
    onOrderChange([...orders, order], name);
  };

  const removeOrder = (order: string) => {
    onOrderChange(orders.filter(o => o !== order), name);
  };

  const imageUrl = isImage
    ? cloudinary.url(name, { width: 320, crop: 'scale' })
    : src;

  return (
    <article>
      <ImagePreviewCard style={{ backgroundImage: `url(${imageUrl})` }}>
        <RemovePreview size={24} color="#222" onClick={() => onRemove(name)} />
      </ImagePreviewCard>
      <SelectOrders
        orders={orders}
        selected={selectedOrders}
        select={addOrder}
        deselect={removeOrder}
      />
    </article>
  );
};

const List = styled.ul`
  background: #fff;
  list-style: none;
  border-radius: 5px;
  margin-top: 10px;
`;

const Item = styled.li`
  padding: 5px;
  display: inline-block;
`;

const Button = styled.button<{ selected: boolean }>`
  font-size: 14px;
  padding: 8px 10px;
  background: #fff;
  border: 1px solid ${p => (p.selected ? '#aaa' : '#eee')};
  transition: ${p => p.theme.transition};
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
`;

interface SelectOrdersProps {
  orders: string[];
  selected: string[];
  select: (order: string) => void;
  deselect: (order: string) => void;
}

const SelectOrders = ({
  orders,
  selected,
  select,
  deselect
}: SelectOrdersProps) => {
  if (orders.length === 0) {
    return null;
  }

  return (
    <List>
      {orders.map(order => {
        const isSelected = selected.includes(order);
        return (
          <Item
            key={order}
            onClick={isSelected ? () => deselect(order) : () => select(order)}
          >
            <Button selected={isSelected}>
              {order}{' '}
              <ActionButton
                as="span"
                icon={isSelected ? X : Plus}
                iconProps={{ color: '#222', size: 14 }}
              />
            </Button>
          </Item>
        );
      })}
    </List>
  );
};
