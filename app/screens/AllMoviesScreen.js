import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { graphql } from 'react-apollo';

import ListMovies from '../graphql/queries/ListMovies';
// import NewMovieSubscription from '../graphql/subscriptions/NewMovieSubscription';

class AllMoviesScreen extends Component {
  static navigationOptions = {
    title: 'All Movies',
    headerStyle: {
      backgroundColor: 'steelblue',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: null,
  };

  componentDidMount = async () => {
    this.getUser();
    // this.props.subscribeToNewMovies();
  };

  getUser = async () => {
    Auth.currentUserInfo()
      .then((data) => {
        console.log('Logged in User details: ', data);
      })
      .catch(err => console.log('error: ', err));
  };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <View key={item.id} style={styles.itemWrapper}>
      <Text>{item.title}</Text>
      <Text>{item.genre}</Text>
      <Text>{item.director}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.movies}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  itemWrapper: {
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default graphql(ListMovies, {
  props: props => ({
    movies: props.data.listMovies ? props.data.listMovies.items : [],
    // subscribeToNewMovies: () => {
    //   try {
    //     props.data.subscribeToMore({
    //       document: NewMovieSubscription,
    //       updateQuery: (prev, { subscriptionData: { data: { onCreateMovie } } }) => ({
    //         ...prev,
    //         listMovies: {
    //           __typename: 'MovieConnection',
    //           items: [
    //             onCreateMovie,
    //             ...prev.listMovies.items.filter(movie => movie.id !== onCreateMovie.id),
    //           ],
    //         },
    //       }),
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  }),
  options: {
    fetchPolicy: 'cache-and-network',
  },
})(AllMoviesScreen);

AllMoviesScreen.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  // subscribeToNewMovies: PropTypes.func.isRequired,
};
