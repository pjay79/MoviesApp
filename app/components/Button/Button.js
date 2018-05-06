import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const Button = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.buttonContainer, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape(),
};

Button.defaultProps = {
  style: {},
};

export default Button;
