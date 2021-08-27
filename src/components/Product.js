import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

export default function Product({
  routeName,
  product: { name, imageUrl, price },
}) {
  return (
    <CollectionItem>
      <Link
        to={`/shop/${routeName}/${name
          .replace(/& /g, "")
          .replace(/ /g, "-")
          .toLowerCase()}`}
        className="collection-item"
      >
        <div
          className="image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="collection-footer">
          <span className="name">{name}</span>
          <span className="price">${price}</span>
        </div>
      </Link>
    </CollectionItem>
  );
}

const CollectionItem = styled.div`
  .collection-item {
    height: 320px;
    width: 240px;
    margin: 8px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      cursor: pointer;

      :hover {
        opacity: 0.7;
      }
    }

    .collection-footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }
`;
