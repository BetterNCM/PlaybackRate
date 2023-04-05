import { useLocalStorage } from "../hooks"

export function PopupConfigWin() {
    const [playbackRate, setPlaybackRate] = useLocalStorage("playbackrate.playbackspeed", 1);

    React.useEffect(() => {
        if (loadedPlugins.LibFrontendPlay.currentAudioPlayer)
            loadedPlugins.LibFrontendPlay.currentAudioPlayer.playbackRate = playbackRate;
    }, [playbackRate]);

    return (
        <div>
            <div style={{ fontSize: "20px", color: "#ffffffaa", fontWeight: "800", marginBottom: "20px" }}>播放设置</div>
            {/* <div style={{ fontSize: "16px", fontWeight: "800", marginBottom: "10px" }}></div> */}
            <label htmlFor="album-size" className="pbr-slider-label">
                倍速/慢放
                {
                    playbackRate === 1 ? undefined : <button className="rnp-slider-reset" onClick={() => setPlaybackRate(1)}></button>
                }
            </label>
            <div>
                <input type="range" onChange={e => { setPlaybackRate(parseFloat(e.target.value)) }} className="pbr-slider" min={0.1} max={2.5} step={0.01} value={playbackRate} />
            </div>
        </div>
    )
}