import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';
import USerCardBlock from './Sections/UserCardBlock';
import styled from 'styled-components';

const Container = styled.div`
  width: 85%;
  margin: 3rem auto;
`;

function CartPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    let cartItems = [];

    //리덕스 User state -> cart 안에 상품이 들어 있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, [props.user.userData]);

  return (
    <Container>
      <h1>My Cart</h1>
      <div>
        <USerCardBlock
          products={props.user.cartDetail && props.user.cartDetail}
        />
      </div>
    </Container>
  );
}

export default CartPage;
