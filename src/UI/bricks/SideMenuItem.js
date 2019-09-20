import ForwardNavLink from "./ForwardNavLink";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";

const SideMenuItem = ({to, menuText, fullText, IconComponent}) => {
    return(
        <ListItem
            button
            key={menuText}
            component={ForwardNavLink}
            to={to}
            activeClassName={"Mui-selected"}
        >
            <ListItemIcon><IconComponent/></ListItemIcon>
            <ListItemText primary={fullText} />
        </ListItem>
    );
};

export default SideMenuItem;