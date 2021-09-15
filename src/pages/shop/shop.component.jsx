import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.util";
import { onSnapshot } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import { updateCollections } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.componenet";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  //testing
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  //getting data
  componentDidMount() {
    const { updateCollections } = this.props;
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
    );
  }

  render() {
    const { loading } = this.state;
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
