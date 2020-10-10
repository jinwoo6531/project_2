import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Meta } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import Checkbox from './Sections/CheckBox';
import { continents } from './Sections/Datas';

const Header = styled.header`
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid #d2d2d2;
`;
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Container = styled.section`
  width: 100%;
  display: flex;
`;

const MenuPhoto = styled.div`
  display: flex;
  width: 100%;
  margin-left: 10px;
`;

const Span = styled.span`
  margin: 0 auto;
`;

const Img = styled.img``;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    axios.post('/api/product/products').then((response) => {
      if (response.data.success) {
        setProducts(response.data.productInfo);
      } else {
        alert('상품 가져오기 실패!');
      }
    });
  }, []);

  //아이템 리스트
  const renderCards = Products.map((product, index) => {
    console.log(product);
    return (
      <Col lg={6} md={8} xs={20} key={index}>
        <Card>
          <img
            style={{
              width: '100%',
              maxHeight: '100%',
            }}
            src={`http://localhost:5000/${product.images[0]}`}
          />

          <Span>{product.title}</Span>
        </Card>
      </Col>
    );
  });

  const handleFilters = () => {};

  return (
    <>
      {/* 메뉴 */}
      <Header>
        <h2>
          <img src={require('./images/tit_menu.png')} alt="Menu 이미지" />
        </h2>
      </Header>

      <Checkbox
        list={continents}
        // handleFilters={(filter) => handleFilters(filters, 'continents')}
      />

      <Wrapper>
        <Container>
          {/* content list */}
          <MenuPhoto>
            <Row gutter={(16, 16)}>{renderCards}</Row>
          </MenuPhoto>
        </Container>
      </Wrapper>
    </>
  );
}

export default LandingPage;
