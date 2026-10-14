// fonts.js
import localFont from "next/font/local";

// Pretendard (한글용; 필요한 스타일별로 여러 파일 지정 가능)
export const pretendard = localFont({
  src: [
    {
      // Pretendard Variable (가변 폰트) – weight 범위: 100 ~ 900
      path: "../../public/fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

// PP Neue Montreal (영문용)
export const fontEnglish = localFont({
  src: [
    {
      path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Medium.woff2",
      weight: "500 600",
      style: "normal",
    },
    {
      path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/PPNeueMontreal/PPNeueMontreal-SemiBolditalic.woff2",
      weight: "600 700",
      style: "italic",
    },
  ],
  variable: "--font-english",
  display: "swap",
});
