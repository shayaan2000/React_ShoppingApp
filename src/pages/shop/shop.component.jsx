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

class ShopPage extends React.Component {
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
      }
    );
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
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
