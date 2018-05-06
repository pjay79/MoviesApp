import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'grey',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    width: width * 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles;
