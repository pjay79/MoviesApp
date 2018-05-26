import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { graphql } from 'react-apollo';
import uuidV4 from 'uuid/v4';
import moment from 'moment';
import Button from '../components/Button';
import Input from '../components/Input';

import CreateMovie from '../graphql/mutations/CreateMovie';
import ListMovies from '../graphql/queries/ListMovies';

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
    author: '',
  };

  componentDidMount() {
    this.getUser();
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  getUser = async () => {
    await Auth.currentUserInfo()
      .then((data) => {
        this.setState({ author: data.username });
      })
      .catch(err => console.log('error: ', err));
  };

  addMovie = () => {
    const {
      title, genre, director, author,
    } = this.state;
    const id = uuidV4();
    const createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.props.onAdd({
      id,
      title,
      genre,
      director,
      author,
      createdAt,
    });
    console.log(`The movie "${title}" has been added.`);
    console.log(`Details: id: ${id}`, `createdAt: ${createdAt}`, `by ${author}`);
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
    options: {
      update: (proxy, { data: { createMovie } }) => {
        try {
          const data = proxy.readQuery({ query: ListMovies });
          data.listMovies.items = [
            ...data.listMovies.items.filter(movie => movie.id !== createMovie.id),
            createMovie,
          ];
          proxy.writeQuery({ query: ListMovies, data });
        } catch (error) {
          console.log(error);
        }
      },
    },
    onAdd: movie =>
      props.mutate({
        variables: movie,
        optimisticResponse: () => ({
          createMovie: {
            ...movie,
            __typename: 'Movie',
            reviews: { items: [], __typename: 'ReviewConnection' },
          },
        }),
      }),
  }),
})(AddMoviesScreen);

AddMoviesScreen.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
