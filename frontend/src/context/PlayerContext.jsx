import { createContext, useEffect, useRef, useState } from "react"
import axios from 'axios'

const PlayerContext = createContext()

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef(null)
    const seekBg = useRef(null)
    const seekBar = useRef(null)

    const [songsData, setSongsData] = useState([])
    const [albumsData, setAlbumsData] = useState([])
    const [track, setTrack] = useState(null)
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
        const foundTrack = songsData.find(song => song._id === id || song.id === id);
        if (foundTrack) {
            setTrack(foundTrack)
            setTimeout(async () => {
                await audioRef.current.play()
                setPlayStatus(true)
            }, 0)
        }
    }

    /* Previous */
    const previous = async () => {
        const currentIndex = songsData.findIndex(song => song._id === track._id || song.id === track.id);
        if (currentIndex > 0) {
            setTrack(songsData[currentIndex - 1])
            setTimeout(async () => {
                await audioRef.current.play()
                setPlayStatus(true)
            }, 0)
        }
    }

    /* Next */
    const next = async () => {
        const currentIndex = songsData.findIndex(song => song._id === track._id || song.id === track.id);
        if (currentIndex < songsData.length - 1) {
            setTrack(songsData[currentIndex + 1])
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

    const getSongsData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/song/list')
            if (response.data.success) {
                setSongsData(response.data.songs)
                if(response.data.songs.length > 0) {
                    setTrack(response.data.songs[0])
                }
            }
        } catch (error) {
            console.error("Error fetching songs:", error)
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/album/list')
            if (response.data.success) {
                setAlbumsData(response.data.albums)
            }
        } catch (error) {
            console.error("Error fetching albums:", error)
        }
    }

    useEffect(() => {
        getSongsData()
        getAlbumsData()
    }, [])

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
        seekSong,
        songsData,
        albumsData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}

            {/* Hidden Audio */}
            <audio
                ref={audioRef}
                src={track ? track.file : ""}
                preload="auto"
            />
        </PlayerContext.Provider>
    )
}

export default PlayerContext