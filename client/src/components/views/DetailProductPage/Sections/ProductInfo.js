import React from 'react';
import styled from 'styled-components';
import { Button, Descriptions } from 'antd';

const Btn = styled.div`
  display: flex;
  justify-content: center;
`;
function ProductInfo(props) {
  const clickHandler = () => {
    console.log(test);
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
          Add to Cart
        </Button>
      </Btn>
    </div>
  );
}

export default ProductInfo;
