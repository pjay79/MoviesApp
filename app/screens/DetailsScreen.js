import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Platform, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { graphql, compose } from 'react-apollo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import uuidV4 from 'uuid/v4';
import moment from 'moment';
import Button from '../components/Button';
import Input from '../components/Input';

import CreateReview from '../graphql/mutations/CreateReview';
import ListReviews from '../graphql/queries/ListReviews';
import NewReviewSubscription from '../graphql/subscriptions/NewMovieSubscription';

class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('movie').title,
    headerStyle: {
      backgroundColor: '#0F303F',
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={30}
          color="white"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('Update', { movie: navigation.getParam('movie') })}
      >
        <FontAwesome name="edit" size={20} color="white" style={{ marginRight: 10 }} />
      </TouchableOpacity>
    ),
    headerTintColor: 'white',
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="book-open-variant" size={24} color={tintColor} />
    ),
  });

  state = {
    isModalVisible: false,
    user: '',
    movieID: '',
    title: '',
    genre: '',
    author: '',
    createdAt: '',
    rating: '',
    content: '',
  };

  componentDidMount() {
    this.getUser();
    this.getMovieDetails();
    this.props.subscribeToNewReviews();
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  getUser = async () => {
    await Auth.currentUserInfo()
      .then((data) => {
        this.setState({ user: data.username });
      })
      .catch(error => console.log(`Error: ${error.message}`));
  };

  getMovieDetails = () => {
    const movie = this.props.navigation.getParam('movie');
    const movieID = movie.id;
    const {
      title, genre, director, author, createdAt,
    } = movie;
    this.setState({
      movieID,
      title,
      genre,
      director,
      author,
      createdAt,
    });
  };

  toggleModal = () => this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));

  addReview = () => {
    const { rating, content } = this.state;
    const id = uuidV4();
    const createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.props.onAddReview({
      id,
      movieID: this.state.movieID,
      rating,
      content,
      author: this.state.user,
      createdAt,
    });
    this.setState({
      rating: '',
      content: '',
    });
    this.toggleModal();
  };

  render() {
    const {
      title, genre, director, author, createdAt,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.movieDetails}>
          <Text>{title}</Text>
          <Text>{genre}</Text>
          <Text>{director}</Text>
          <Text>
            Added by {author} on {createdAt}
          </Text>
        </View>
        <View style={styles.movieReviews}>
          {this.props.reviews &&
            this.props.reviews.map(review => (
              <View key={review.id}>
                <Text>{review.rating}</Text>
                <Text>{review.content}</Text>
                <Text>{review.author}</Text>
                <Text>{review.createdAt}</Text>
              </View>
            ))}
        </View>
        <Button
          title="Add Review"
          onPress={this.toggleModal}
          style={{ backgroundColor: '#0F303F' }}
        />
        <Modal
          isVisible={this.state.isModalVisible}
          onSwipe={() => this.setState({ isModalVisible: false })}
          swipeDirection="down"
        >
          <View style={styles.modalContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>Directed by {director}</Text>
            <View>
              <Text>Rating:</Text>
              <Input
                placeholder="Enter a rating between 1 to 10"
                onChangeText={text => this.onChangeText('rating', text)}
                value={this.state.rating}
              />
            </View>
            <View>
              <Text>Review:</Text>
              <Input
                placeholder="What say you?"
                onChangeText={text => this.onChangeText('content', text)}
                value={this.state.content}
              />
            </View>
            <View>
              <Button
                title="Add Review"
                onPress={this.addReview}
                style={{ backgroundColor: '#0F303F' }}
              />
              <Button
                title="Close"
                onPress={this.toggleModal}
                style={{ backgroundColor: '#0F303F' }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  movieDetails: {
    alignItems: 'center',
  },
  movieReviews: {
    alignItems: 'center',
  },
  modalContent: {
    height: '75%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E9E9EF',
    borderColor: '#0F303F',
    borderWidth: 5,
  },
});

export default compose(
  graphql(ListReviews, {
    options: props => ({
      fetchPolicy: 'cache-and-network',
      variables: { movieID: props.navigation.getParam('movie').id },
    }),
    props: props => ({
      reviews: props.data.listReviews ? props.data.listReviews.items : [],
      subscribeToNewReviews: () => {
        props.data.subscribeToMore({
          document: NewReviewSubscription,
          updateQuery: (prev, { subscriptionData: { data: { onCreateReview } } }) => ({
            ...prev,
            listReviews: {
              items: [
                onCreateReview,
                ...prev.listReviews.items.filter(review => review.id !== onCreateReview.id),
              ],
              __typename: 'ReviewConnection',
            },
          }),
        });
      },
    }),
  }),
  graphql(CreateReview, {
    options: {
      update: (proxy, { data: { createReview } }) => {
        try {
          const data = proxy.readQuery({
            query: ListReviews,
            variables: { movieID: createReview.movieID },
          });
          data.listReviews.items = [
            ...data.listReviews.items.filter(review => review.id !== createReview.id),
            createReview,
          ];
          proxy.writeQuery({
            query: ListReviews,
            data,
            variables: { movieID: createReview.movieID },
          });
        } catch (error) {
          console.log(error);
        }
      },
    },
    props: props => ({
      onAddReview: review =>
        props.mutate({
          variables: review,
          optimisticResponse: () => ({
            createReview: { ...review, __typename: 'Review' },
          }),
        }),
    }),
  }),
)(DetailsScreen);

DetailsScreen.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  onAddReview: PropTypes.func.isRequired,
  subscribeToNewReviews: PropTypes.func.isRequired,
};
