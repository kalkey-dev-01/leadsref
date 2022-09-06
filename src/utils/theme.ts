import { extendTheme } from 'native-base'
import colors from './colors'
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark'
}

export default extendTheme({ config, colors })
