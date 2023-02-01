import "./audioPlayerAfe.scss"

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

import { useEffect, useRef, useState } from "react";

import audioFile from "../../Assets/test_audio_2.mp3"



const AudioPlayerForEvaluationPlayer = () => {

    const [play, setPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioPlayer = useRef();
    const animationRef = useRef();
    const progressBar = useRef();

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

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds)
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

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

    return (
        <>
            <section className="audio-for-evauation-main">
                <audio ref={audioPlayer} src={audioFile}></audio>
                <div onClick={handlePauseAndPlay} className="play-pause-afe">
                    {play ? <PauseCircleIcon sx={{ cursor: "pointer" }}/> : <PlayCircleFilledWhiteIcon sx={{ cursor: "pointer" }} />}
                </div>
                <div className="audio-timings-div-afe">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{(duration && !isNaN(duration)) && formatTime(duration)}</span>
                </div>
                <div className="audio-slider-afe">
                    <input defaultValue="0" ref={progressBar} type="range" onChange={changeRange} />
                </div>
            </section>
        </>
    )
}

export default AudioPlayerForEvaluationPlayer;