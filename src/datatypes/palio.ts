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

export interface Palio {
    id: number,
    palioDate: string;
    palio: string;
    contrada: string;
    fantino: string;
    cavallo: string;
    straordinario: boolean,
    rinviato: boolean,
    cappotto: boolean,
    contradaId: number | null;
    contradaNome: string | null;
    contradaLogo: string | null;
    fantinoId: string | null;
    fantinoNome: string | null;
    fantinoSoprannome: string | null;
    fantinoFoto: string | null;
    cavalloId: string | null;
    cavalloNome: string | null;
    cavalloFoto: string | null;
}
