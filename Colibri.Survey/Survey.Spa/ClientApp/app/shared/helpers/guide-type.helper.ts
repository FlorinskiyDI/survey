export class GUID {
    private str: string;

    constructor(str?: string) {
        this.str = str || GUID.getNewGUIDString();
    }

    toString() {
        return this.str;
    }

    public static getNewGUIDString() {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now(); // use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // tslint:disable-next-line:no-bitwise
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            // tslint:disable-next-line:no-bitwise
            const val = (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            return val;
        });
    }
}
