import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component' 
import CollectionPage from '../collection/collection.components'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { updateCollections } from '../../redux/shop/shop-actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

/* const ShopPage = ({ match }) => {
    //console.log(match);
    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverview}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>
    )
} */

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)


class ShopPage extends React.Component {

    // react will handle constructor and super
    state = {
        loading: true
    }
    
    unsubscribeFromSnapshot = null

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections') // title of the collection in the firestore 'collections'
        
        collectionRef.onSnapshot( async (snapshot) => {
            //console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

            //console.log('COLLECTIONS', collectionsMap);
            updateCollections(collectionsMap)
            this.setState({ loading: false })
        })
    
    }

    render() {
        const { match } = this.props
        const { loading } = this.state

        return (
            <div className='shop-page'>
            <Route exact path={`${match.path}`} render={ (props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> } />
            <Route path={`${match.path}/:collectionId`} render={ (props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
        </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
})



export default connect(null, mapDispatchToProps)(ShopPage)
