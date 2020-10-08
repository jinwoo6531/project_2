import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Meta } from 'antd';
import styled from 'styled-components';
import axios from 'axios';

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

const MenuList = styled.div`
  border-right: 1px solid #d2d2d2;
`;

const Ul = styled.ul`
  list-style: none;
`;

const Anchor = styled.a`
  color: #333;
`;

const Li = styled.li`
  margin-bottom: 50px;
  font-family: Century -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
`;

const MenuPhoto = styled.div`
  display: flex;
  width: 100%;
  margin-left: 10px;
`;

const Span = styled.span`
  align-items: center;
`;

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
    console.log(11, product);
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

  return (
    <>
      {/* 메뉴 */}
      <Header>
        <h2>
          <img src={require('./images/tit_menu.png')} alt="Menu 이미지" />
        </h2>
      </Header>

      <Wrapper>
        <Container>
          <MenuList>
            <Ul>
              <Li>
                <Anchor href="#">COFFEE</Anchor>
              </Li>
              <Li>
                <Anchor href="#">DECAFFEINE COFFEE</Anchor>
              </Li>
              <Li>
                <Anchor href="#">MILK TEA & LATTE</Anchor>
              </Li>
              <Li>
                <Anchor href="#">JUICE & YOGHURT</Anchor>
              </Li>
              <Li>
                <Anchor href="#">BANACCINO & SMOTHIE</Anchor>
              </Li>
              <Li>
                <Anchor href="#">TEA & ADE</Anchor>
              </Li>
            </Ul>
          </MenuList>

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
