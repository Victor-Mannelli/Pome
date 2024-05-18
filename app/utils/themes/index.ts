import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const dark = "#3a3d3e";
const light = "#fff";

const config = {
  initialColorMode: 'dark', // 'dark' | 'light'
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: mode(dark, light)(props)
      }
    })
  }
});