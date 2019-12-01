import Grid from "@material-ui/core/Grid";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import React from "react";
import {makeStyles, Typography} from "@material-ui/core";
import clsx from "clsx";
import ForwardNavLink from "./ForwardNavLink";

const useStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
    },
    logo: {
        fontWeight: 'bold',
        textDecoration: 'none'
    },
    logoColorPrimary: {
        color: theme.palette.primary.main
    },
    logoColorSecondary: {
        color: theme.palette.secondary.main
    },
    logoColorWhite: {
        color: 'white'
    },
    normalFont: {
        fontSize: 'x-large'
    },
    largeFont: {
        fontSize: 'xx-large'
    }
}));

const Logo = ({color, shouldBeCentered, shouldBeLargeFont, showDescriptionText, disableLink}) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Grid
                container
                justify={shouldBeCentered ? 'center' : 'flex-start'}
                direction="row"
                className={clsx(classes.logo, {
                    [classes.logoColorPrimary]: color === 'primary',
                    [classes.logoColorSecondary]: color === 'secondary',
                    [classes.logoColorWhite]: !color || color === 'white'
                })}
                component={ForwardNavLink}
                to={disableLink ? '' : '/main'}
            >
                <Grid item className={clsx({
                    [classes.largeFont]: shouldBeLargeFont,
                    [classes.normalFont]: !shouldBeLargeFont || shouldBeLargeFont === false
                })} style={{alignSelf: 'center'}}>
                    Together
                </Grid>
                <Grid item>
                    <SupervisedUserCircleIcon/>
                </Grid>
            </Grid>
            {
                showDescriptionText &&
                <Typography style={{fontSize: 'x-small', textAlign: 'center'}}>
                    A tool for SCRUM teams
                </Typography>
            }
        </div>
    );
};

export default Logo;