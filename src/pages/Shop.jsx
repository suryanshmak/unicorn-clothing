import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "../components/Spinner";
const CategoryPage = lazy(() => import("./CategoryPage"));

const Shop = ({ match }) => (
  <Suspense fallback={<Spinner />}>
    <Route path={`${match.path}/:id`} component={CategoryPage} />;
  </Suspense>
);

export default Shop;
