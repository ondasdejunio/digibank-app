import { extendTheme } from "@chakra-ui/react";

export const myTheme = extendTheme({
    colors: {
        primary: "#99d6ea",
        primary_nav: "#e1eff6",
        secondary: "#001242",
        highlight: "#FAF089",
        text: "#f8f8f8",
        text_nav: "#001242",
        text_small: "#e2fdff"

    },
    styles: {
        global: () => ({
            body: {
                bg: "#f8f8f8",
            }
        }),
    }
});