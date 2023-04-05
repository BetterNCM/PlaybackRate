import { PopupConfigWin } from "./ui/popup";

plugin.onAllPluginsLoaded(function(){
    !(async () => {
        const btnVolume = await betterncm.utils.waitForElement('.spk.f-vc.f-cp.j-vol');
        const btnSettings: HTMLButtonElement = btnVolume.cloneNode(true) as any;
        btnSettings.querySelector('use').setAttribute('xlink:href', 'orpheus://orpheus/style/res/svg/topbar.sp.svg#set');
        btnSettings!.classList.add('playbackrate-settings');
        btnVolume.parentElement.appendChild(btnSettings);

        const stylesheet = document.createElement('style');
        stylesheet.innerHTML = await betterncm.fs.readFileText(this.pluginPath + "/style.css");
        document.head.prepend(stylesheet);

        loadedPlugins.LibFrontendPlay.addEventListener("updateCurrentAudioPlayer", (e) => {
            e.detail.playbackRate = JSON.parse(localStorage["playbackrate.playbackspeed"]);
        })

        const popupElement = document.createElement("div");
        ReactDOM.render(<PopupConfigWin />, popupElement);

        document.body.appendChild(popupElement);
        popupElement.classList.add("playbackrate-settings-popup")

        popupElement.style.pointerEvents = 'none';

        let visible = false;
        btnSettings.addEventListener("click", (evt: MouseEvent) => {
            if (visible) {
                visible = false;
                popupElement.style.opacity = '0';
                popupElement.style.pointerEvents = 'none';
                popupElement.style.transform = 'translateY(10px)';
            } else {
                visible = true;
                popupElement.style.display = "block";
                popupElement.style.bottom = `${document.body.clientHeight - btnSettings.getBoundingClientRect().top}px`;
                popupElement.style.right = `${document.body.clientWidth - btnSettings.getBoundingClientRect().left - btnSettings.clientWidth}px`;
                popupElement.style.opacity = '1';
                popupElement.style.transform = 'translateY(0px)';
                popupElement.style.pointerEvents = '';
            }
        });
    })()
});
