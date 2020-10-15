import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

const Header = styled.div`
  width: 100%;
  padding: 3rem 4rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

function DetailProductPage(props) {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setProduct(response.data[0]);
        } else {
          alert('상세 정보 가져오기 실패');
        }
      });
  }, []);

  return (
    <div>
      <Header>
        <Content>
          <h1>{Product.title}</h1>
        </Content>

        <br />
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24}>
            <ProductImage detail={Product} />
          </Col>
          <Col lg={12} sm={24}>
            <ProductInfo detail={Product} />
          </Col>
        </Row>
      </Header>
    </div>
  );
}

export default DetailProductPage;
