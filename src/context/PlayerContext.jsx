import { createContext, useEffect, useRef, useState } from "react"
import { songsData } from "../assets/assets"

const PlayerContext = createContext()

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef(null)
    const seekBg = useRef(null)
    const seekBar = useRef(null)

    const [track, setTrack] = useState(songsData[0])
    const [playStatus, setPlayStatus] = useState(false)

    const [time, setTime] = useState({
        currentTime: {
            minute: 0,
            second: 0
        },
        totalTime: {
            minute: 0,
            second: 0
        }
    })

    /* Play */
    const play = async () => {
        if (!audioRef.current) return

        await audioRef.current.play()
        setPlayStatus(true)
    }

    /* Pause */
    const pause = () => {
        if (!audioRef.current) return

        audioRef.current.pause()
        setPlayStatus(false)
    }

    /* Play with song id */
    const playWithId = async (id) => {
        setTrack(songsData[id])
        setTimeout(async () => {
            await audioRef.current.play()
            setPlayStatus(true)
        }, 0)
    }

    /* Previous */
    const previous = async () => {
        if (track.id > 0) {
            setTrack(songsData[track.id - 1])

            setTimeout(async () => {
                await audioRef.current.play()
                setPlayStatus(true)
            }, 0)
        }
    }

    /* Next */
    const next = async () => {
        if (track.id < songsData.length - 1) {
            setTrack(songsData[track.id + 1])

            setTimeout(async () => {
                await audioRef.current.play()
                setPlayStatus(true)
            }, 0)
        }
    }

    /* Seek Song */
    const seekSong = (e) => {
        if (!audioRef.current || !seekBg.current) return

        const percent =
            e.nativeEvent.offsetX / seekBg.current.offsetWidth

        audioRef.current.currentTime =
            percent * audioRef.current.duration
    }

    /* Update Timer */
    useEffect(() => {
        const audio = audioRef.current

        if (!audio) return

        const updateTime = () => {
            if (!audio.duration) return

            if (seekBar.current) {
                seekBar.current.style.width =
                    Math.floor(
                        (audio.currentTime / audio.duration) * 100
                    ) + "%"
            }

            setTime({
                currentTime: {
                    minute: Math.floor(audio.currentTime / 60),
                    second: Math.floor(audio.currentTime % 60)
                },
                totalTime: {
                    minute: Math.floor(audio.duration / 60),
                    second: Math.floor(audio.duration % 60)
                }
            })
        }

        audio.ontimeupdate = updateTime

        return () => {
            audio.ontimeupdate = null
        }
    }, [track])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}

            {/* Hidden Audio */}
            <audio
                ref={audioRef}
                src={track.file}
                preload="auto"
            />
        </PlayerContext.Provider>
    )
}

export default PlayerContext