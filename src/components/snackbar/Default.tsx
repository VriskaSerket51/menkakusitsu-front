import { Card, CardActions, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SnackbarContent, useSnackbar } from "notistack";
import { forwardRef, Ref } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { MessagePayload } from "firebase/messaging";

const useStyles = makeStyles(() => ({
    root: {
        "@media (min-width:600px)": {
            minWidth: "344px !important"
        }
    },
    card: {
        width: "100%"
    },
    typography: {
        color: "#fff",
        fontFamily: "BMDohyeon"
    },
    actionRoot: {
        padding: "8px 8px 8px 16px",
        justifyContent: "space-between"
    },
    icons: {
        marginLeft: "auto"
    },
    expand: {
        padding: "8px 8px",
        transform: "rotate(0deg)",
        color: "#fff",
        transition: "all .2s"
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    paper: {
        backgroundColor: "#fff",
        padding: 16
    },
    checkIcon: {
        fontSize: 20,
        paddingRight: 4
    },
    button: {
        padding: 0,
        textTransform: "none"
    }
}));

interface SnackbarProps {
    id: string | number,
    payload: MessagePayload
}


export const DefaultSnackbar = forwardRef((props: SnackbarProps, ref: Ref<HTMLDivElement>) => {
    const { id, payload } = props;
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const onClose = () => {
        closeSnackbar(id);
    }

    return (
        <SnackbarContent
            ref={ref}
            className={classes.root} onClick={() => {
                onClose();
                if (payload && payload.fcmOptions && payload.fcmOptions.link) {
                    window.location.href = payload.fcmOptions.link;
                }
            }}
        >
            <Card className={classes.card} sx={{ backgroundColor: "secondary.main" }}>
                <CardActions classes={{ root: classes.actionRoot }}>
                    <Typography variant="body2" className={classes.typography}>
                        {payload?.notification?.title}
                    </Typography>
                    <div className={classes.icons}>
                        <IconButton
                            size="small"
                            className={classes.expand}
                            onClick={onClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>
                </CardActions>
            </Card>
        </SnackbarContent>
    );
});