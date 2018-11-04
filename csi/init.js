window.onload = async () => {
    const c = new Controller();
    c.init();

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            console.log(stream);
            $(".content").each((i, col) => {
                const video = document.createElement('video');
                video.src = window.URL.createObjectURL(stream);
                const ratio = 640 / 480;
                video.play();
                video.style.width = "auto";
                video.style.marginLeft = (-1 * (window.innerHeight*ratio/2)) + "px";
                video.height = window.innerHeight;
                video.setAttribute("autoplay", true);
                col.appendChild(video);
            })
        });
    }
}
