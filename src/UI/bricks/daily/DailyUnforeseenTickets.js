import React from "react";
import NewTicket from "../generic/NewTicket";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    spacing: {
        marginRight: '4px',
        marginBottom: '4px'
    },
}));

const DailyUnforeseenTickets = ({reportValidation, ...rest}) => {
    const classes = useStyles();

    const handleDelete = () => {
        alert('You clicked the delete icon.');
    };

    return (
        <div>
            <Grid container>
                <Grid item>
                    <Chip
                        className={classes.spacing}
                        avatar={<Avatar alt="Natacha" src="/static/images/avatars/image.jpg"/>}
                        label="WEB-1048"
                        onDelete={handleDelete}
                        color="primary"
                    />
                </Grid>
                <Grid item>
                    <Chip
                        className={classes.spacing}
                        avatar={<Avatar alt="Natacha" src="/static/images/avatars/6SLWt.gif"/>}
                        label="WEB-768"
                        onDelete={handleDelete}
                        color="primary"
                    />
                </Grid>
                <Grid item>
                    <Chip
                        className={classes.spacing}
                        avatar={<Avatar alt="Natacha" src="/static/images/avatars/afrogeisha.jpg"/>}
                        label="WEB-5489"
                        onDelete={handleDelete}
                        color="primary"
                    />
                </Grid>
            </Grid>
            <hr/>
            <NewTicket reportValidation={reportValidation} {...rest} />
        </div>
    );
};

export default DailyUnforeseenTickets;