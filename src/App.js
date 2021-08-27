import Nav from "./components/Nav";
import GlobalStyles from "./GlobalStyles";
import Spinner from "./components/Spinner";
import { Route, Switch } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import {
  fetchCarouselStart,
  fetchCollectionsStart,
  signIn,
  signOut,
} from "./actions";
import { useDispatch } from "react-redux";
import { auth } from "./firebase/util";
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const Shop = lazy(() => import("./pages/Shop"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionsStart());
    dispatch(fetchCarouselStart());
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signIn());
      } else {
        dispatch(signOut());
      }
    });
  }, [dispatch]);

  return (
    <div className="container">
      <GlobalStyles />
      <Nav />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/shop" component={Shop} />
          <Route path="/checkout" component={CheckoutPage} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
