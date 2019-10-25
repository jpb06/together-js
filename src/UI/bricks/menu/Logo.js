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
    largeFont: {
        fontSize: 'xx-large'
    }
}));

const Logo = ({color, shouldBeCentered, shouldBeLargeFont, showDescriptionText}) => {
    const classes = useStyles();
    return (
        <h2 className={classes.container}>
            <Grid container
                  justify={shouldBeCentered ? 'center' : 'flex-start'}
                  direction="row"
                  className={clsx(classes.logo, {
                      [classes.logoColorPrimary]: color === 'primary',
                      [classes.logoColorSecondary]: color === 'secondary',
                      [classes.logoColorWhite]: color === 'white'
                  })}
                  component={ForwardNavLink}
                  to="/main"
            >
                <Grid item className={clsx({
                    [classes.largeFont]: shouldBeLargeFont
                })}>
                    Together
                </Grid>
                <Grid item>
                    <SupervisedUserCircleIcon/>
                </Grid>
            </Grid>
            {
                showDescriptionText &&
                <Typography style={{fontSize: 'x-small', textAlign: 'center'}}> Un outil pour les équipes
                    SCRUM</Typography>
            }
        </h2>
    );
};

export default Logo;