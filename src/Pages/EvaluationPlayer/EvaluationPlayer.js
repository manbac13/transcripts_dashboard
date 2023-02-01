import Header from "../../Components/Header/Header";
import "./EvaluationPlayer.scss"
import { Languages } from "../../Data/Languages";
import { Transcripts } from "../../Data/Transcripts";

import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { Box, InputAdornment, Tab, Tabs } from '@mui/material';

import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import { useState } from 'react';
import AudioPlayerForEvaluationPlayer from "../../Components/AudioPlayer/AudioPlayEvaluate";

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#3c76d2',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const EvaluationPlayer = () => {

    const [tabIndex, setTabIndex] = useState(0);
    const [language, setLanguage] = useState('');
    const [age, setAge] = useState('');

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <>
            <Header />
            <section className="eval-main-section">
                <section className="candles-section">

                    <section className="candle-names-sec">
                        <p>Agent</p>
                        <p>Customer</p>
                    </section>

                    <section className="candle-view-section">
                        <div className="actual-view"></div>
                        <div className="actual-view"></div>
                    </section>
                </section>

                <section className="eval-audioPlayer-section">
                    <AudioPlayerForEvaluationPlayer />
                </section>

                <section className="eval-appbar">

                    <section className="tabs-sec">
                        <Box sx={{ width: "100%" }}>
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabChange}
                            >
                                <Tab label={<span style={{ fontSize: "12px" }}>Transcript</span>} />
                            </Tabs>
                        </Box>
                    </section>

                    <section className="language-switch-sec">
                        <p>English</p>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ marginInlineStart: "10px" }} />}
                        />
                        <p>Hindi</p>
                    </section>

                    <section className="search-sec">
                        <TextField
                            id="outlined-basic"
                            placeholder="Find words in transcript"
                            InputProps={{
                                style: { height: '28px', fontSize: "12px", fontWeight: "bold" },
                                endAdornment:
                                    <InputAdornment >
                                        <SearchIcon sx={{ marginInlineEnd: "7px", width: "18px" }} />
                                    </InputAdornment>
                            }}
                            sx={{ width: "100%", borderRadius: "15px" }}
                            size="small"
                            variant="outlined"
                        />
                    </section>
                </section>

                <section className="main-transcript-section">
                    <section className="transcript-convo">
                        <table>
                            {
                                Transcripts.map((conversation, index) => {
                                    
                                    let color = conversation.type === "Customer" ? "#FFBF00" : "#82cefa";
                                    return (
                                        <>
                                            <tr>
                                                <td style={{width:"10%"}}>
                                                    <div style={{color:color, marginBottom:"2px"}}>{conversation.type}</div>
                                                    <div>{conversation.time}</div>
                                                </td>
                                                <td>{conversation.words}</td>
                                                <td style={{cursor:"pointer"}}>{<RemoveRedEyeIcon sx={{color:"#3f75ff"}}/>}</td>
                                            </tr>

                                        </>
                                    )
                                })
                            }

                        </table>
                    </section>

                    <section className="transcript-oper">
                        <p>Correct Punctuation</p>
                        <div className="tr-oper-select-main">
                            <p>Language</p>
                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <Select
                                    value={language}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    style={{ height: "22px", fontSize: "12px" }}
                                    MenuProps={{
                                        style: { maxHeight: "250px" }
                                    }}
                                >
                                    <MenuItem sx={{ width: "160px", height: "20px", backgroundColor: "#f7f7f7", fontSize: "13px" }} value="">
                                        <em>Language</em>
                                    </MenuItem>
                                    {
                                        Languages.map((language, index) => (
                                            <MenuItem sx={{ width: "160px", height: "20px", backgroundColor: "#f7f7f7", fontSize: "13px", "&:hover": { backgroundColor: "#FFBF00" } }} key={index} value={language.name}>{language.name}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>



                        </div>
                        <section className="oper-textfield-sec">
                            <TextField
                                className="transcript_original_section_textfield"
                                variant="standard"
                                id="outlined-multiline-flexible"
                                multiline
                                rows={4}
                                sx={{ width: "100%" }}
                                inputProps={{
                                    style: { fontSize: "13px" }
                                }}
                            />
                        </section>

                        <section className="oper-select-sec">
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={handleAgeChange}
                                    sx={{ height: "45px", fontSize: "15px" }}
                                >
                                    <MenuItem value="">
                                        <em>Age</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <section className="save-changes=btn">
                                <Button sx={{ fontSize: "12px", marginTop: "1px" }}>Save Changes</Button>
                            </section>
                        </section>

                    </section>
                </section>
                <section className="update-btn-sec">
                    <Button variant="contained" size="small" >Update</Button>
                </section>
            </section>
        </>
    )
}

export default EvaluationPlayer;