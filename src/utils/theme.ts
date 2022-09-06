import { extendTheme } from 'native-base'
import colors from './colors'
const config = {
  useSystemColorMode: false,
  initialColorMode: 'light'
}

export default extendTheme({ config, colors })
