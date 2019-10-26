import React, {useEffect} from "react";
import UserAvatar from "../bricks/user/UserAvatar";
import {getFromLocalStorage} from "../../logic/local.store";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    center: {
        textAlign: 'center'
    }
});

const MyAccount = () => {
    const classes = useStyles();

    const [user, setUser] = React.useState({});

    // This will trigger when the component is mounted
    useEffect(() => {
        const storedUser = getFromLocalStorage('user');
        setUser(storedUser);
    }, []);

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <h1>My account</h1>
            <UserAvatar
                data={user}
                isBigAvatar={true}
            />
        </Grid>
    );
};

export default MyAccount;