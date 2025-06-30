import AppBar from "@mui/material/AppBar"
import { NavButton } from "@/common/components/NavButton/NavButton"
import MenuIcon from '@mui/icons-material/menu'
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import { getTheme } from "../../theme/theme"
import { useAppSelector } from "../../hooks/useAppSelector"
import { selectThemeMode } from "../../../app/app-selector"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { changeThemeModeAC } from "../../../app/app-reducer"
import { containerSx } from "@/common/styles/container.styles"


export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
    }

    return (
        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode} />
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}