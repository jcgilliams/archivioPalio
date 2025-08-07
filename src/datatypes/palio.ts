export interface PalioAnno {  
    palioId: number;
    palioNome: string;
    palioDate: string;
    vinto: boolean;
    contrada: string;
    fantino: string;
    cavallo: string;
    contradaId: number | null;
    contradaLogo: string | null;
    fantinoId: string | null;
    fantinoFoto: string | null;
    fantinoPalioFoto: string | null;
    cavalloId: string | null;
    cavalloFoto: string | null;
    cavalloPalioFoto: string | null;
    drappellonePalioFoto: string | null;
}