import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { name as appName } from './app.json';

import App from './App';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4D3B9B'
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App style={{ fontFamily: 'Roboto' }} />
    </PaperProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main);