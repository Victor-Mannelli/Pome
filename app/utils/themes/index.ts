import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const dark = "#3a3d3e";
const light = "#3a3d3e";

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode(light, dark)(props)
      }
    })
  }
});