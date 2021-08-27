import Product from "./Product";
import styled from "styled-components";
import { selectCollection, selectIsFetching } from "../selectors";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const CollectionContainer = ({
  match: {
    params: { id },
  },
}) => {
  const collection = useSelector((state) => selectCollection(id)(state));
  const isFetching = useSelector((state) => !selectIsFetching(state));
  const { routeName, items, title } = collection;

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <CollectionPageContainer>
      <div className="content">
        <p style={{ fontSize: "calc(1vw + 15px)", padding: "8px 0" }}>
          {title}
        </p>
        <CollectionItemsContainer>
          {Object.keys(items)
            .map((key) => items[key])
            .map((item, idx) => (
              <Product key={idx} product={item} routeName={routeName} />
            ))}
        </CollectionItemsContainer>
      </div>
    </CollectionPageContainer>
  );
};

export default CollectionContainer;

const CollectionPageContainer = styled.div`
  text-align: center;
  display: grid;

  .content {
    margin-top: 60px;
  }
`;

const CollectionItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 8px;
  margin: 0 10px;
`;
