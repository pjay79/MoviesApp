import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Button from '../components/Button';
import Input from '../components/Input';

import CreateMovie from '../graphql/mutations/createMovie';
import ListMovies from '../graphql/queries/listMovies';

class AddMoviesScreen extends Component {
  static navigationOptions = {
    title: 'Add Movie',
    headerStyle: {
      backgroundColor: 'steelblue',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: null,
  };

  state = {
    title: '',
    genre: '',
    director: '',
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  addMovie = () => {
    const { title, genre, director } = this.state;
    this.props.onAdd({
      title,
      genre,
      director,
    });
    console.log('Movie has been added.');
    this.setState({
      title: '',
      genre: '',
      director: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Title:</Text>
        <Input
          placeholder="Star Wars"
          onChangeText={text => this.onChangeText('title', text)}
          value={this.state.title}
        />
        <Text>Genre</Text>
        <Input
          placeholder="Science Fiction"
          onChangeText={text => this.onChangeText('genre', text)}
          value={this.state.genre}
        />
        <Text>Director:</Text>
        <Input
          placeholder="George Lucas"
          onChangeText={text => this.onChangeText('director', text)}
          value={this.state.director}
        />
        <Button
          title="Add Movie"
          onPress={this.addMovie}
          style={{ backgroundColor: 'steelblue' }}
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
  },
});

export default graphql(CreateMovie, {
  props: props => ({
    onAdd: movie =>
      props.mutate({
        variables: movie,
        optimisticResponse: {
          __typename: 'Mutation',
          createMovie: { ...movie, __typename: 'Movie' },
        },
        update: (proxy, { data: { createMovie } }) => {
          const data = proxy.readQuery({ query: ListMovies });
          data.listMovies.items.push(createMovie);
          proxy.writeQuery({ query: ListMovies, data });
        },
      }),
  }),
})(AddMoviesScreen);

AddMoviesScreen.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
