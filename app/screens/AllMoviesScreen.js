import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Auth } from 'aws-amplify';
import { graphql, compose } from 'react-apollo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';

import ListMovies from '../graphql/queries/ListMovies';
import DeleteMovie from '../graphql/mutations/DeleteMovie';
import UpdateMovie from '../graphql/mutations/UpdateMovie';
import NewMovieSubscription from '../graphql/subscriptions/NewMovieSubscription';

class AllMoviesScreen extends Component {
  static navigationOptions = {
    title: 'All Movies',
    headerStyle: {
      backgroundColor: '#0F303F',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: null,
  };

  state = {
    user: '',
    query: '',
    movies: [],
    moviesData: [],
    loading: false,
  };

  componentDidMount() {
    this.getUser();
    this.props.subscribeToNewMovies();
    SplashScreen.hide();
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('Details', { movie: item });
  };

  getUser = async () => {
    await Auth.currentUserInfo()
      .then((data) => {
        this.setState({ user: data.username });
        console.log(`Current user: ${this.state.user}`);
      })
      .catch(error => console.log(`Error: ${error.message}`));
  };

  addQuery = (query) => {
    if (query === '') {
      this.setState({ loading: false, movies: this.props.movies, moviesData: this.props.movies });
    } else {
      this.setState({ loading: true, query });
      this.movieSearch();
    }
  };

  movieSearch = () => {
    this.setState({ moviesData: this.props.movies });
    const results = this.state.moviesData.filter(movie =>
      movie.title.toLowerCase().includes(this.state.query.toLowerCase()));
    this.setState({ movies: results });
  };

  clearQuery = () => {
    this.setState({ query: '', movies: this.props.movies, moviesData: this.props.movies });
  };

  updateMovie = (item) => {
    const {
      id, title, genre, director, author, createdAt, likes,
    } = item;
    this.props.onUpdate({
      id,
      title,
      genre,
      director,
      author,
      createdAt,
      likes: likes + 1,
    });
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
        <TouchableOpacity onPress={() => this.updateMovie(item)}>
          <MaterialIcons name="favorite" size={14} color="black" style={styles.iconStyle} />
        </TouchableOpacity>
        <Text>Likes: {item.likes}</Text>
      </View>
    </View>
  );

  renderSeparator = () => <View style={styles.separator} />;

  renderHeader = () => (
    <SearchBar
      lightTheme
      clearIcon
      showLoadingIcon={this.state.loading}
      placeholder="Search movies"
      containerStyle={{ backgroundColor: 'transparent' }}
      inputStyle={{ backgroundColor: '#E9E9EF' }}
      onChangeText={this.addQuery}
      onClearText={this.clearQuery}
      value={this.state.query}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={
            this.state.query === ''
              ? _.orderBy(this.props.movies, ['title'], ['asc'])
              : _.orderBy(this.state.movies, ['title'], ['asc'])
          }
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  graphql(UpdateMovie, {
    options: {
      update: (proxy, { data: { updateMovie } }) => {
        try {
          const data = proxy.readQuery({ query: ListMovies });
          data.listMovies.items = [
            ...data.listMovies.items.filter(movie => movie.id !== updateMovie.id),
            updateMovie,
          ];
          proxy.writeQuery({ query: ListMovies, data });
        } catch (error) {
          console.log(error);
        }
      },
    },
    props: props => ({
      onUpdate: movie =>
        props.mutate({
          variables: movie,
          optimisticResponse: () => ({
            updateMovie: { ...movie, __typename: 'Movie' },
          }),
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
  onUpdate: PropTypes.func.isRequired,
  subscribeToNewMovies: PropTypes.func.isRequired,
};
