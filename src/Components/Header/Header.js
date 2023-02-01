import "./Header.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DrawerComponent from "./DrawerComponent";

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';

import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { styled } from '@mui/material/styles';

import { Button, Grid, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: "600",
        fontSize: theme.typography.pxToRem(13),
        marginRight: theme.spacing(1),
        color: '#fff',
        '&.Mui-selected': {
            color: '#FFBF00',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);


const Header = () => {

    const navigate = useNavigate()

    const [tabsvalue, setTabsValue] = useState();

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const myPath = window.location.pathname;

    const listItems = [
        { name: 'Stt', path: "/stt" },
        { name: 'View', path: "/view" },
        { name: 'EvaluationPlayer', path: "/evaluationplayer" },
        { name: 'Diarization', path: "/diarization" },
    ];

    useEffect(() => {
        if (myPath === "/stt") {
            setTabsValue(0)
        }
        else if (myPath === "/view") {
            setTabsValue(1)
        }
        else if (myPath === "/evaluationplayer") {
            setTabsValue(2)
        }
        else if (myPath === "/diarization") {
            setTabsValue(3)
        }
    })


    return (
        <>
            <AppBar sx={{ background: "#063970", paddingInline: "100px" }} elevation="0" position="static">
                <Toolbar>
                    {
                        isMatch ? (
                            <>
                                <DrawerComponent />
                                <Typography sx={{ display: "flex", paddingInline: "20px" }}>
                                    <HeadsetMicIcon sx={{ marginRight: "5px", width: "18px" }} />
                                    <span style={{ fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden" }}>Quality Pack</span>
                                </Typography>
                                <Avatar sx={{ margin: "auto" }}>H</Avatar>
                            </>
                        ) : (
                            <>
                                <Grid container sx={{ alignItems: "center" }}>
                                    <Grid
                                        item
                                        lg={11}
                                        md={11}
                                    /*                                         sx={{ display: { sm: "none", md: "none", lg: "grid" } }} */
                                    >
                                        <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                            <HeadsetMicIcon sx={{ marginRight: "5px", width: "18px" }} />
                                            <span style={{ fontSize: "16px" }}>Quality Pack</span>
                                            <Tabs
                                                TabIndicatorProps={{
                                                    sx: { display: "none" },
                                                }}

                                                textColor="inherit"
                                                value={tabsvalue}
                                                onChange={(e, tabsvalue) => setTabsValue(tabsvalue)}
                                            >
                                                {
                                                    listItems.map((page, index) =>
                                                    (
                                                        <StyledTab onClick={() => navigate(`${page.path}`)} key={index} disableRipple icon={page.icon} iconPosition="start" label={page.name} />
                                                    )
                                                    )
                                                }
                                            </Tabs>
                                        </div>

                                    </Grid>


                                    <Grid
                                        item
                                        lg={1}
                                        md={1}
                                    >
                                        <Avatar sx={{ margin: "auto" }}>H</Avatar>
                                    </Grid>
                                </Grid>
                            </>
                        )
                    }

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;