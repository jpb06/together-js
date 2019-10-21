import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React, {useCallback} from "react";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(1),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: 0.87
    },
    media: {
        height: '7px',
    },
    content: {
        paddingTop: theme.spacing(1),
        marginTop: 'auto'
    },
    defaultState: {
        backgroundColor: theme.palette.primary.main
    },
    validationUnset: {
        backgroundColor: theme.palette.secondary.main
    },
    validationSet: {
        backgroundColor: 'green'
    }

}));

const ContentBox = ({title, content, ContentComponent, data, showSnackbar, ...rest}) => {
    const classes = useStyles();

    // Drives the look of the header bar
    const [feedback, setFeedback] = React.useState({isValidated: false, isPending: false});

    // keep function reference (otherwise the function reference would change with each render...)
    const informCurrent = useCallback((state) => {
        setFeedback(state);
    }, []);

    return (
        <Card className={classes.root}>
            <CardMedia
                component={
                    feedback.isValidated
                        ? 'div'
                        : feedback.isPending
                        ? () => <LinearProgress color="primary" className={clsx(classes.media)}/>
                        : 'div'
                }
                className={clsx(classes.media, {
                    [classes.validationUnset]: !feedback.isValidated,
                    [classes.validationSet]: feedback.isValidated,
                })}
                title="Agile"
                src="/"
            />
            <CardHeader title={title}/>
            <CardContent className={classes.content}>
                {
                    (ContentComponent) && <ContentComponent
                        sendToParent={informCurrent}
                        showSnackbar={showSnackbar}
                        data={data} {...rest} />
                }
                {content}

            </CardContent>
        </Card>
    );
};

export default ContentBox;