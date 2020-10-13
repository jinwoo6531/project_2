import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Meta } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import CheckBox from './Sections/CheckBox';
import { continents } from './Sections/Datas';

const Header = styled.header`
  width: 100%;
  margin-top: 20px;
  border-bottom: 1px solid #d2d2d2;
`;
const Wrapper = styled.div`
  width: 100%;
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
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState('');
  const [Filters, setFilters] = useState({
    continents: [],
  });
  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = async (variables) => {
    await axios.post('/api/product/products', variables).then((response) => {
      if (response.data.success) {
        setProducts([...response.data.productInfo]);
      }
    });
  };

  //아이템 리스트
  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={20} key={index}>
        <Card>
          <Link to={`/product/${product._id}`}>
            <img
              style={{
                width: '100%',
                maxHeight: '100%',
              }}
              src={`http://localhost:5000/${product.images[0]}`}
            />

            <Span>{product.title}</Span>
          </Link>
        </Card>
      </Col>
    );
  });
  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(variables);
    setSkip(0);
  };

  //매개변수filters는 CheckBox컴포넌트의 체크된 id값들이다.
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms,
    };
    getProducts(variables);
    setSkip(skip);
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
            {PostSize >= Limit && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={onLoadMore}>Load More</button>
              </div>
            )}
          </MenuPhoto>
        </Container>
      </Wrapper>
    </>
  );
}

export default LandingPage;
