import { Platform } from "react-native";
import { COLORS } from "./colors";


const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const MyTheme = {
  dark: false,
  colors: {
    primary: COLORS.primaryGreen,
    background: COLORS.white,
    card: COLORS.background,
    text: COLORS.textPrimary,
    border: COLORS.divider,
    badges: COLORS.goldAccent,
    success: COLORS.success,
    error: COLORS.error,
    warning: COLORS.warning,
    info: COLORS.info,
  },
  
  fonts: Platform.select({
    web: {
      regular: { fontFamily: WEB_FONT_STACK, fontWeight: "400" },
      medium: { fontFamily: WEB_FONT_STACK, fontWeight: "500" },
      bold: { fontFamily: WEB_FONT_STACK, fontWeight: "600" },
      heavy: { fontFamily: WEB_FONT_STACK, fontWeight: "700" },
    },
    ios: {
      regular: { fontFamily: "Inter-Regular", fontWeight: "400" },
      medium: { fontFamily: "Inter-Medium", fontWeight: "500" },
      bold: { fontFamily: "Poppins-SemiBold", fontWeight: "600" },
      heavy: { fontFamily: "Poppins-Bold", fontWeight: "700" },
    },
    default: {
      regular: { fontFamily: "Inter-Regular", fontWeight: "400" },
      medium: { fontFamily: "Inter-Medium", fontWeight: "500" },
      bold: { fontFamily: "Poppins-SemiBold", fontWeight: "600" },
      heavy: { fontFamily: "Poppins-Bold", fontWeight: "700" },
    },
  }),
};

export default MyTheme;