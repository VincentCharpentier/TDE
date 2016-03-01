
class UIController {
    /// INDICATORS
    private static fps_ind: HTMLElement;

    /// OTHERS ?

    public static Init() {
        this.fps_ind = document.getElementById("fps");

        setInterval(() => {
            this.Refresh();
        }, Config.View.UI_REFRESH_SPEED * 1000);
    }

    public static Refresh() {
        this.fps_ind.innerHTML = Math.round(CanvasController.fps).toString();
    }
}