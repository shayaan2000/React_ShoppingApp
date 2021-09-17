import React from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.util";
import { onSnapshot } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import {
  fetchCollectionsFailure,
  updateCollections,
} from "../../redux/shop/shop.actions";
import { connect } from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.componenet";

// with redux thunk
import { fetchCollecctionsStartAsync } from "../../redux/shop/shop.actions";
import { createStructuredSelector } from "reselect";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selector";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import CollectionPageContainer from "../collection/collection.container";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({
  fetchCollectionsStart,
  match,
  isCollectionFetching,
  isCollectionsLoaded,
}) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />

      {/* keeping this without container patter for reference */}
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner
            isLoading={!isCollectionsLoaded}
            {...props}
          />
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  // updateCollections: (collectionsMap) =>
  //   dispatch(updateCollections(collectionsMap)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
