import { ThemeMode } from "@/app/app-reducer";
import { createTheme } from "@mui/material/styles";


export const getTheme = (themeMode: ThemeMode) => createTheme({
    palette: {
        mode: themeMode,
        primary: {
            main: '#087EA4',
        },
    },
})