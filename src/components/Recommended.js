import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { selectConvertedCollections, selectIsFetching } from "../selectors";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

const Recommended = () => {
  const collections = useSelector((state) => selectConvertedCollections(state));
  const isFetching = useSelector((state) => !selectIsFetching(state));
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <RecommendedStyle>
      {collections
        .filter((item, i) => i < 2)
        .map(({ routeName, items, id }, idx) => (
          <React.Fragment key={idx}>
            {Object.keys(items)
              .map((key) => items[key])
              .filter((item, idx) => idx < 2)
              .map((item, idx) => (
                <Product key={idx} product={item} routeName={routeName} />
              ))}
          </React.Fragment>
        ))}
    </RecommendedStyle>
  );
};

export default Recommended;

const RecommendedStyle = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 0 30px;
  justify-content: center;
`;
