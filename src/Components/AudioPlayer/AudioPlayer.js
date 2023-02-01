import "./AudioPlayer.scss"

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import audioFile from "../../Assets/test_audio_2.mp3"

import { useEffect, useRef, useState } from "react";

const AudioPlayer = () => {


    //states
    const [play, setPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [loop, setLoop] = useState(false);
    const [mute, setMute] = useState(false)

    //references
    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();

    const handlePauseAndPlay = () => {
        const prevValue = play;
        setPlay(!prevValue)
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
        else {
            audioPlayer.current.pause();
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds)
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime()
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
        setCurrentTime(progressBar.current.value);
    }

    const handleLoop = () => {
        setLoop(!loop)
    }

    //controlling the speed(1x, 2x)
    const handleSpeedOfAudio = (event)=>{
        let speedValue = Number(event.target.value);
        audioPlayer.current.playbackRate = speedValue
    }

    //controlling mute audio
    const handleMuteAudio = ()=>{
        const prevValue = mute
        setMute(!prevValue);
        audioPlayer.current.muted = !prevValue;
        console.log("mute Value",mute)
        console.log("mutedValue",audioPlayer.current.muted)
    }

    return (
        <>
            <section className="audio_player_main_sec">
                <section className="our_aud_player">
                    <audio ref={audioPlayer} loop={loop} src={audioFile}></audio>
                    <button className="aud-player-btn" onClick={handlePauseAndPlay}>
                        {play ? <PauseCircleIcon /> : <PlayCircleFilledIcon />}
                    </button>
                    <button className="aud-player-btn" onClick={handleLoop}>
                        {loop ? <RepeatIcon style={{ color: "green"}} /> : <RepeatIcon />}
                    </button>

                    <div className="current-time-aud">{formatTime(currentTime)}</div>

                    <input type="range" defaultValue="0" ref={progressBar} onChange={changeRange} />

                    <div className="total-time-aud">{(duration && !isNaN(duration)) && formatTime(duration)}</div>

                    <div className="audio_speed_control">
                        <select onChange={handleSpeedOfAudio} name="speed" id="speed">
                            <option value="1">1x</option>
                            <option value="2">2x</option>
                            <option value="3">3x</option>
                        </select>
                    </div>

                    <button className="aud-player-btn" onClick={handleMuteAudio}>
                        {mute ?  <VolumeOffIcon />:  <VolumeUpIcon />}
                    </button>

                </section>
            </section>

        </>
    )
}

export default AudioPlayer;