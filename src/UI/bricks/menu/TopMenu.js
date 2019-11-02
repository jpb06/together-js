import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserAvatar from '../user/UserAvatar';
import Logo from './Logo';
import SideMenu from './SideMenu';
import {getFromLocalStorage, LocalStorageKeys} from "../../../logic/local.store";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: theme.palette.secondary.main
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main
    }
}));

const TopMenu = () => {
    const classes = useStyles();

    const [isSiderOpen, setIsSiderOpen] = React.useState(false);
    const [user, setUser] = React.useState({});

    // This will trigger when the component is mounted
    useEffect(() => {
        const storedUser = getFromLocalStorage(LocalStorageKeys.user);
        setUser(storedUser);
    }, []);

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsSiderOpen(open);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        aria-label="menu"
                        onClick={toggleDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>

                    <Logo shouldBeCentered={false} color="primary"/>

                    <Link to="/account">
                        <UserAvatar user={user}/>
                    </Link>
                </Toolbar>
            </AppBar>

            <SideMenu isOpen={isSiderOpen} toggleDrawer={toggleDrawer}/>
        </div>
    );
};

export default TopMenu;