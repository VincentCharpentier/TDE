
class StorageController {
    private static _prefix = "TDe";

    private static prefix(): string {
        return this.prefix + "\\";
    }

    /**
     * Get the key with requiered prefix
     * @param key
     */
    private static GetKey(key: string): string {
        return this.prefix() + key;
    }

    public static Store(key: string, value: any) {
        localStorage.setItem(this.GetKey(key), JSON.stringify(value));
    }

    public static Get(key: string): any {
        return JSON.parse(localStorage.getItem(this.GetKey(key)));
    }
}
