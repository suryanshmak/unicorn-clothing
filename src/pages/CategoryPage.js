import { Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner";
const CollectionContainer = lazy(() =>
  import("../components/CollectionContainer")
);
const ProductDescription = lazy(() =>
  import("../components/ProductDescription")
);

export default function CategoryPage({ match }) {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path={`${match.path}`} exact component={CollectionContainer} />
        <Route
          path={`${match.path}/:id`}
          render={(props) => (
            <ProductDescription category={match.params.id} {...props} />
          )}
        />
      </Switch>
    </Suspense>
  );
}
