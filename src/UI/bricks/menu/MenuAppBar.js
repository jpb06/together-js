import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ImageAvatar from '../user/ImageAvatar';

import Logo from './Logo';
import SideMenu from './SideMenu';

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

const MenuAppBar = () => {
    const classes = useStyles();

    const [isSiderOpen, setIsSiderOpen] = React.useState(false);

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

                    <ImageAvatar/>
                </Toolbar>
            </AppBar>

            <SideMenu isOpen={isSiderOpen} toggleDrawer={toggleDrawer}/>
        </div>
    );
};

export default MenuAppBar;