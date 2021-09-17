// container pattern
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selector";
import { compose } from "redux";

import WithSpinner from "../with-spinner/with-spinner.componenet";
import CollectionsOverview from "./collections-overview.component";

//this container is handling the isFetching so we dont need it in shop component

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

// const CollectionsOverviewContainer = connect(mapStateToProps)(With(collectionsOverview))

export default CollectionsOverviewContainer;
