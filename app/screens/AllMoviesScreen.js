import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { graphql } from 'react-apollo';
import listMovies from '../graphql/queries/listMovies';

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

  state = {
    username: '',
  };

  componentDidMount = async () => {
    this.getUser();
  };

  getUser = async () => {
    Auth.currentUserInfo()
      .then((data) => {
        this.setState({
          username: data.username,
        });
      })
      .catch(err => console.log('error: ', err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome {this.state.username}</Text>
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

export default graphql(listMovies, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: props => ({
    movies: props.data.listMovies ? props.data.listMovies.items : [],
  }),
})(AllMoviesScreen);

AllMoviesScreen.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
