import AppContainer from './src/components/AppContainer';
import AuthNav from './src/Auth/AuthNav';
import {
  useFonts,
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
} from '@expo-google-fonts/raleway'


export default function App() {
  let [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
  })
  if (!fontsLoaded) {
    return null
  }
  return (
    <AppContainer>
      <AuthNav />
    </AppContainer>
  );
}


