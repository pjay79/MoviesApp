import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

YellowBox.ignoreWarnings([
  'Class RCTCxxModule',
  'Module RCTImageLoader',
  'Warning',
  'Missing field',
]);

AppRegistry.registerComponent('MoviesApp', () => App);
