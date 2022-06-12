import React from 'react';
import styled from 'styled-components';

const ProductContainer = styled.div`
  width: 100%;
  min-height: 4.5em;
  display: flex;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #d3e0ff;
  }
`;

const ProductImg = styled.div`
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductName = styled.h4`
  font-size: 13px;
  font-weight: 600;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 130px;
  margin-right: 5px;
`;

export function RecommendProduct(props) {
  return (
    <ProductContainer onClick={props.choose}>
      <ProductImg>
        <img src={props.imgsrc} />
      </ProductImg>
      <ProductName>{props.name}</ProductName>
    </ProductContainer>
  );
}
