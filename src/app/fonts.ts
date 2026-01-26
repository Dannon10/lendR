import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";

export const workSans = Work_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-work-sans",
});

export const avenirNext = localFont({
    src: [
        {
            path: "../fonts/avenir-next/AvenirNextLTPro-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/avenir-next/AvenirNextLTPro-Medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../fonts/avenir-next/AvenirNextLTPro-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-avenir-next",
});


