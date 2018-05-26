import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { graphql, compose } from 'react-apollo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ListMovies from '../graphql/queries/ListMovies';
import DeleteMovie from '../graphql/mutations/DeleteMovie';
import NewMovieSubscription from '../graphql/subscriptions/NewMovieSubscription';

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

  componentDidMount() {
    this.getUser();
    this.props.subscribeToNewMovies();
    console.log(this.props.movies);
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('Details', { movie: item });
  };

  getUser = async () => {
    await Auth.currentUserInfo()
      .then((data) => {
        console.log('Logged in User details: ', data);
      })
      .catch(err => console.log('error: ', err));
  };

  deleteMovie = (item) => {
    this.props.onDelete(item);
  };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <View key={item.id} style={styles.itemWrapper}>
      <View>
        <TouchableOpacity onPress={() => this.onPressItem(item)}>
          <Text>{item.title}</Text>
          <Text>{item.genre}</Text>
          <Text>{item.director}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => this.deleteMovie(item)}>
          <FontAwesome name="trash-o" size={16} color="black" style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Favourite added!')}>
          <MaterialIcons name="favorite" size={14} color="black" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.movies}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightgray',
  },
  iconStyle: {
    marginBottom: 5,
  },
});

export default compose(
  graphql(ListMovies, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => ({
      movies: props.data.listMovies ? props.data.listMovies.items : [],
      subscribeToNewMovies: () => {
        props.data.subscribeToMore({
          document: NewMovieSubscription,
          updateQuery: (prev, { subscriptionData: { data: { onCreateMovie } } }) => ({
            ...prev,
            listMovies: {
              items: [
                onCreateMovie,
                ...prev.listMovies.items.filter(movie => movie.id !== onCreateMovie.id),
              ],
              __typename: 'MovieConnection',
            },
          }),
        });
      },
    }),
  }),
  graphql(DeleteMovie, {
    options: {
      update: (proxy, { data: { deleteMovie: { id } } }) => {
        try {
          const data = proxy.readQuery({ query: ListMovies });
          data.listMovies.items = data.listMovies.items.filter(movie => movie.id !== id);
          proxy.writeQuery({ query: ListMovies, data });
        } catch (error) {
          console.log(error);
        }
      },
    },
    props: props => ({
      onDelete: movie =>
        props.mutate({
          variables: { id: movie.id },
          optimisticResponse: () => ({ deleteMovie: { ...movie, __typename: 'Movie' } }),
        }),
    }),
  }),
)(AllMoviesScreen);

AllMoviesScreen.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  subscribeToNewMovies: PropTypes.func.isRequired,
};
