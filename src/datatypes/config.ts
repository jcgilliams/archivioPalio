export interface Config {
    id?: number;
    trattaDatum: string | null;
    live: boolean;
    resetLocalStorageKey: string | null;
    dalDatum: string | null;
    shouldResetLocalStorage?: boolean;
    datumMenu: string;
    anno: string;
    palioDate: string;
}
