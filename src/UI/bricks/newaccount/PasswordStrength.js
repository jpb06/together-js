import React, {useEffect, useState} from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {PasswordMeter} from "password-meter";

const PasswordStrength = ({password}) => {
    const [strength, setStrength] = useState({percent: 0});

    useEffect(() => {
        setStrength(new PasswordMeter().getResult(password));
    }, [password]);

    if (password.length > 0) {
        return (
            <div>
                Password strength {strength.status === 'Empty' ? '' : ` - ${strength.status}`}
                <LinearProgress
                    variant="determinate"
                    color="primary"
                    value={strength.percent}
                />
            </div>
        );
    } else return null;
};

export default PasswordStrength;