import TopMenu from "../../menu/TopMenu";
import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import {clearLocalStorage, getFromLocalStorage, LocalStorageKeys} from "../../../../logic/local.store";
import {useHistory} from "react-router-dom";
import TogetherApi from "../../../../logic/api/setup/together.api";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
    },
    media: {
        height: '15px'
    },
    fixedWidth: {
        maxWidth: '1000px'
    }
}));

const Squeleton = ({Component, showSnackbar, ...rest}) => {
    let history = useHistory();
    const classes = useStyles();

    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // This will trigger everytime a navigation occurs
    useEffect(() => {
        document.body.style.backgroundImage = "url('/static/images/patterns/hex.jpg')";
        document.body.style.backgroundRepeat = 'repeat';

        setIsLoading(true);
        TogetherApi.setup(history);

        let token = getFromLocalStorage(LocalStorageKeys.token);
        let expirationDate = getFromLocalStorage(LocalStorageKeys.expiration);
        if (!token || !expirationDate || Date.parse(expirationDate) < new Date()) {
            clearLocalStorage();
            history.push({
                pathname: '/'
            });
        }

        setIsReady(true);
        setIsLoading(false);
    }, [history]);

    // keep function reference (otherwise the function reference would change with each render...)
    const reportLoading = useCallback((isLoading) => {
        setIsLoading(isLoading);
    }, []);

    return (
        <div>
            <TopMenu/>
            {isLoading && <LinearProgress/>}
            <section className={classes.root}>
                {isReady &&
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        className={classes.fixedWidth}
                    >
                        <Component
                            reportLoading={reportLoading}
                            showSnackbar={showSnackbar}
                            {...rest}
                        />
                    </Grid>
                </Grid>
                }
            </section>
        </div>
    );
};

export default Squeleton;