/* @flow */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
} from 'react-native';
import { fetch } from 'fetch';
import { AIRBNB_API } from './data';
import RatingText from './RatingText';
import LikeButton from './LikeButton';

import type { Listing } from './data';

// #1. Explore and have fun!
// #2. Change text color and make it bigger. Add some margin between text and image.
//     Make the content centered
// #3. Make image tappable (see TouchableOpacity or TouchableHighlight)
// #4. Uncomment the query in `componentDidMount`
// #5. Show number of listings instead of "Hello, fox!"
// #6. Render listing titles. For every record you want to render its own <Text />
// #7. Extract secret view into its own component. Add more info. Make the list scrollable
// #8. Add ability to like listings

type State = {
  listings: Array<Listing>;
  liked: Map<number, boolean>;
};

class ReactBnb extends Component {
  state:State = {
    listings: [],
    liked: new Map(),
  };

  render() {
    const List = this.state.listings.map(
        home => <ListingCell
            key={home.id}
            isLiked={this.state.liked[home.id]}
            onLike={()=>alert(home.name)}
            listing={home} />
    );
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{marginTop: 20}}>
          <Text style={styles.helloText}>
              {this.state.listings.length}
          </Text>
          <ScrollView>
              {List}
          </ScrollView>
        </View>
      </ScrollView>
    );
  }


  componentDidMount() {
     fetch(AIRBNB_API)
       .then(response => response.json())
       .then((data) => {
        this.setState({listings: data});
         console.log('Response from API:', data);
       });
  }
}

class ListingCell extends Component {
  props: {
    listing: Listing;
    isLiked: boolean;
    onLike: Function;
  };



  render() {
      var flash;
      if(this.props.listing.instantBook) {
          flash = (
              <Image source={require('./img/flash.png')}/>
          );
      }
    return (
        <View style>
          <Image
              style={{height: 160}}
              source={{uri: this.props.listing.previewImageURL}}
          >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              ${this.props.listing.price}
            </Text>
            <Text style={styles.units}>
              USD{'\n'}PER NIGHT
            </Text>
              {flash}
          </View>
          </Image>

          <View style={styles.info}>
            <Text style={styles.name}>
                {this.props.listing.name}
            </Text>
            <Text style={styles.details}>
                {this.props.listing.typeText}
                <RatingText
                    value={this.props.listing.starRating}
                    count={this.props.listing.reviewsCount}
                />
                {' . '}
                {this.props.listing.location}
            </Text>
            <LikeButton
                isLiked={this.props.isLiked}
                onPress={this.props.onLike}
            />
          </View>
        </View>

    )
  }
}

var IMAGE_SIZE = 100;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  foxImage: {
    borderRadius: IMAGE_SIZE / 2,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  helloText: {
    fontSize: 14,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize:17,
  },
    details: {
        fontSize:11,
        color: '#999',
    },

    badge: {
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
        position: 'absolute',
        left: 0,
        bottom: 30,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeText: {
      fontSize: 18,
      color: 'white',
    },
    units: {
        marginLeft: 5,
        color: 'white',
        fontSize: 8,
    },
});

export default ReactBnb;
