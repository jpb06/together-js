import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(1),
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        marginTop: '0',
        marginBottom: theme.spacing(1)
    },
    media: {
        height: '10px',
    },
    content: {
        paddingTop: theme.spacing(1),
        marginTop: 'auto'
    },
    validationUnset: {
        backgroundColor: theme.palette.primary.main
    },
    validationSet: {
        backgroundColor: 'green'
    }

}));

const ContentBox = ({title, content, ContentComponent, ...rest}) => {
    const classes = useStyles();

    const [isValidated, setIsValidated] = React.useState(false);

    const reportValidation = (isValidated) => setIsValidated(isValidated);

    return (
        <Card className={classes.root}>
            <CardMedia
                className={clsx(classes.media, {
                    [classes.validationUnset]: !isValidated,
                    [classes.validationSet]: isValidated,
                })}
                title="Agile"
                src="/"
            />
            <CardHeader title={title}/>
            <CardContent className={classes.content}>
                {
                    (ContentComponent) && <ContentComponent reportValidation={reportValidation} {...rest} />
                }
                {content}

            </CardContent>
        </Card>
    );
};

export default ContentBox;