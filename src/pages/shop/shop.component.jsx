import React from "react";
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
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  //getting data
  componentDidMount() {
    const { fetchCollecctionsStartAsync } = this.props;
    fetchCollecctionsStartAsync();

    // FOR REFERENCE
    //using rest call
    // //crwn-db-a683c
    // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-a683c/databases/(default)/documents/collection")
    // .then(response => response.json())
    // .then(collections => console.log(collections))

    /*   const { updateCollections } = this.props;
    const collectionRef = collection(firestore, "collection");
    this.unsubscribeFromSnapshot = onSnapshot(
      collectionRef,
      async (snapShot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
        // have the final formatted data here
        updateCollections(collectionsMap);
        console.log("collection map", collectionsMap);
        this.setState({ loading: false });
      }
    ); */
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  // updateCollections: (collectionsMap) =>
  //   dispatch(updateCollections(collectionsMap)),
  fetchCollecctionsStartAsync: () => dispatch(fetchCollecctionsStartAsync()),
});

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
