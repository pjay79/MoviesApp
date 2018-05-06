import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: width * 0.8,
  },
});

export default styles;
