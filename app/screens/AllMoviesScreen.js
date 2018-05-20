import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { graphql, compose } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListMovies from '../graphql/queries/ListMovies';
import DeleteMovie from '../graphql/mutations/DeleteMovie';

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
  };

  onPressItem = (item) => {
    this.props.navigation.navigate('Details', { movie: item });
  };

  getUser = async () => {
    Auth.currentUserInfo()
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
    // <TouchableOpacity onPress={() => this.onPressItem(item)}>
    <View key={item.id} style={styles.itemWrapper}>
      <View>
        <Text>{item.title}</Text>
        <Text>{item.genre}</Text>
        <Text>{item.director}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => this.deleteMovie(item)}>
          <Icon name="trash-o" size={16} color="black" style={styles.iconStyle} />
        </TouchableOpacity>
        <Icon name="edit" size={14} color="black" style={styles.iconStyle} />
      </View>
    </View>
    // </TouchableOpacity>
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
    props: props => ({
      movies: props.data.listMovies ? props.data.listMovies.items : [],
    }),
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),
  graphql(DeleteMovie, {
    props: props => ({
      onDelete: movie =>
        props.mutate({
          variables: { id: movie.id },
          optimisticResponse: () => ({ deleteMovie: { ...movie, __typename: 'Movie' } }),
        }),
    }),
    options: {
      refetchQueries: [{ query: ListMovies }],
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
  }),
)(AllMoviesScreen);

AllMoviesScreen.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
