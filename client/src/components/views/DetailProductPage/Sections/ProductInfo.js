import React from 'react';
import styled from 'styled-components';
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

const Btn = styled.div`
  display: flex;
  justify-content: center;
`;
function ProductInfo(props) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    //필요한 정보를 Cart 필드에다가 넣어준다.
    dispatch(addToCart(props.detail._id));
    alert('장바구니에 추가되었습니다.');
  };
  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">
          {props.detail.price}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <Btn>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          장바구니
        </Button>
      </Btn>
    </div>
  );
}

export default ProductInfo;
