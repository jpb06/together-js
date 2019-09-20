import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    media: {
        height: '15px'
    }
}));

const ContentBox = ({content, ...rest}) => {
    const classes = useStyles();

    return(
        <Card>
            <CardMedia
                className={classes.media}
                image="/static/images/Agile_2.jpg"
                title="Agile"
            />
            <CardContent>
                {content}
            </CardContent>
        </Card>
    );
};

export default ContentBox;