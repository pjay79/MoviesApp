import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  render() {
    return (
      <View style={styles.container}>
        {this.props.movies.map(movie => (
          <View key={movie.id} style={styles.movieWrapper}>
            <Text>{movie.title}</Text>
            <Text>{movie.genre}</Text>
            <Text>{movie.director}</Text>
          </View>
        ))}
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
  movieWrapper: {
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
