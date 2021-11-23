import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { name as appName } from './app.json';
import { useFonts } from 'expo-font';

import App from './App';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4D3B9B'
  },
};

export default function Main() {
  const LoadFonts = async () => {
    await useFonts({
      'Roboto': require('./assets/front/Roboto-Medium.ttf'),
    });
  };
  if (!LoadFonts) {
    return <AppLoading />;
  }
  else{
    return (
      <PaperProvider theme={theme}>
      <App style={{ fontFamily: 'Roboto' }}/>
    </PaperProvider>
  );
}
}

AppRegistry.registerComponent(appName, () => Main);