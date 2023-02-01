import "./Stt.scss"
import { Languages } from "../../Data/Languages";

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import AudioPlayer from "../../Components/AudioPlayer/AudioPlayer";
import Header from "../../Components/Header/Header";

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import { useState } from "react";



const Stt = () => {

    const [language, setLanguage] = useState('');
    const [textInField, setTextInField] = useState("");
    const [checkDisable, setCheckDisable] = useState(true)

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleTextFieldChange = (event) => {
        setTextInField(event.target.value);
        if(!textInField){
            setCheckDisable(true)
        }
    }

    const copyText = () => {
        const originalValue = document.getElementById("outlined-multiline-flexible").value;
        document.getElementById("outlined-multiline-flexible").select();
        document.getElementById("outlined-multiline-flexible-second").value = originalValue;
        const copiedValue = document.getElementById("outlined-multiline-flexible-second").value;
        copiedValue ? setCheckDisable(false) : setCheckDisable(true)
    }

    const handleDisable = ()=>{
        const copiedValue = document.getElementById("outlined-multiline-flexible-second").value;
        copiedValue ? setCheckDisable(false) : setCheckDisable(true) 
    }

    return (
        <>
            <Header />
            <AudioPlayer />

            <section className="main_transcript_section">

                <section className="language_select_section">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <p>Language</p>
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <Select
                                value={language}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{ height: "22px", fontSize: "12px" }}
                                MenuProps={{
                                        style:{maxHeight:"250px"}
                                    }}
                            >
                                <MenuItem sx={{ width: "160px",height:"20px", backgroundColor:"#f7f7f7", fontSize:"13px" }} value="">
                                    <em>Language</em>
                                </MenuItem>
                                {
                                    Languages.map((language, index)=>(
                                        <MenuItem sx={{ width: "170px",height:"20px", backgroundColor:"#f7f7f7", fontSize:"13px", "&:hover": {backgroundColor:"#FFBF00"} }} key={index} value={language.name}>{language.name}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>
                    </Box>
                </section>

                <section className="transcript_do_copy_section">
                    <p>Transcript</p>
                    <div>
                        <ContentCopyOutlinedIcon onClick={copyText} sx={{ color: "#437fff", cursor: "pointer" }} />
                    </div>
                </section>
                <section className="transcript_original_section">
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
                        on={handleTextFieldChange}
                    />
                </section>
                <section className="transcript_copied_section">
                    <TextField
                        variant="standard"
                        id="outlined-multiline-flexible-second"
                        multiline
                        rows={4}
                        sx={{ width: "100%" }}
                        inputProps={{
                            style: { fontSize: "13px" }
                        }}
                        onChange={handleDisable}
                    />
                </section>
                <section className="transcript_save_btn_section">
                    <Button disabled={checkDisable} variant="contained" fullWidth>Save</Button>
                </section>
            </section>
        </>
    )
}

export default Stt;