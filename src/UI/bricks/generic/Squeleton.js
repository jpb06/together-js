import MenuAppBar from "../menu/MenuAppBar";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import {clearLocalStorage, getFromLocalStorage} from "../../../logic/local.store";
import {useHistory} from "react-router";
import TogetherApi from "../../../logic/api/setup/together.api";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2)
    },
    media: {
        height: '15px'
    }
}));

const Squeleton = ({Component, ...rest}) => {
    let history = useHistory();
    const classes = useStyles();

    let [isReady, setIsReady] = useState(false);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        TogetherApi.setup(history);

        let token = getFromLocalStorage('token');
        let expirationDate = getFromLocalStorage('expiration');
        if (!token || !expirationDate || Date.parse(expirationDate) < new Date()) {
            clearLocalStorage();
            history.push({
                pathname: '/'
            });
        }

        setIsReady(true);
        setIsLoading(false);
        // passing an empty array as second argument triggers the callback in useEffect only
        // after the initial render thus replicating `componentDidMount` lifecycle behaviour
    }, [history]);

    const reportLoading = (isLoading) => setIsLoading(isLoading);

    return (
        <div>
            <MenuAppBar/>
            {isLoading && <LinearProgress/>}
            <section className={classes.root}>
                {isReady && <Component reportLoading={reportLoading} {...rest} />}
            </section>
        </div>
    );
};

export default Squeleton;