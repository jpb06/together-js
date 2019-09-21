import MenuAppBar from "../menu/MenuAppBar";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core";
import {getFromLocalStorage} from "../../../logic/local.store";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2)
    },
    media: {
        height: '15px'
    }
}));

const Squeleton = ({Component, ...rest}) => {
    const classes = useStyles();

    useEffect((rest) => {
        let user = getFromLocalStorage('user');
        if (!user) {
            rest.history.push({
                pathname: '/'
            });
        } else {
            console.log('user', user);
        }
        // passing an empty array as second argument triggers the callback in useEffect only
        // after the initial render thus replicating `componentDidMount` lifecycle behaviour
    }, []);

    return (
        <div>
            <MenuAppBar/>
            <section className={classes.root}>
                <Component {...rest} />
            </section>
        </div>
    );
};

export default Squeleton;