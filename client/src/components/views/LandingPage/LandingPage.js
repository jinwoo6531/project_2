import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Meta } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import CheckBox from './Sections/CheckBox';
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

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Filters, setFilters] = useState({
    continents: [],
  });
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.post('/api/product/products').then((response) => {
      if (response.data.success) {
        setProducts([...Products, ...response.data.productInfo]);
      } else {
        alert('Failed to fectch product datas');
      }
    });
  };

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
  const showFilteredResults = (filters) => {
    const variables = {
      filters: filters,
    };
    getProducts(variables);
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    console.log(newFilters);

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  return (
    <>
      {/* 메뉴 */}
      <Header>
        <h2>
          <img src={require('./images/tit_menu.png')} alt="Menu 이미지" />
        </h2>
      </Header>

      <CheckBox
        list={continents}
        handleFilters={(filters) => handleFilters(filters, 'continents')}
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
