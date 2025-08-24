//#region BASIS PALIOTUTTO
export interface Mossiere {
  id: number;
  nome: string;
  foto: string;
}

export interface Contrada {
  id: string;
  nome: string;
  logo: string;
}

export interface Cavallo {
  id: string;
  nome: string;
  foto: string;
  cavalloPalioFoto: string;
}

export interface Fantino {
  id: string;
  nome: string;
  soprannome: string;
  foto: string;
  fantinoPalioFoto: string;
}

export interface Drappellone {
  id: string;
  foto: string;
  artista: string;
}
//#endregion
// #region ACCOPPIATE
export interface ContradaAccoppiate {
  id: string;
  nome: string;
  logo: string;
}

export interface CavalloAccoppiate {
  id: string;
  nome: string;
  foto: string;
  cavalloPalioFoto: string;
}

export interface FantinoAccoppiate {
  id: string;
  nome: string;
  soprannome: string;
  foto: string;
  fantinoPalioFoto: string;
}

export interface TriforeAccoppiate {
    id: number;
    numero: string;
}

export interface CanapeAccoppiate {
    id: number;
    canape: string;
}

export interface PuntoCadutaAccoppiate {
    id: number;
    punto: string;
}

export interface Accoppiata {
  id: string;
  caduto: boolean;
  vinto: boolean;
  contrada: ContradaAccoppiate;
  cavallo: CavalloAccoppiate;
  fantino: FantinoAccoppiate;
  trifore: TriforeAccoppiate;
  canape: CanapeAccoppiate;
  puntoCaduta: PuntoCadutaAccoppiate;
}
//#endregion
// #region PROVE DI NOTTE
export interface CavalloProveDiNotte {
  cavalloId: string;
  nome: string;
  foto: string;
}

export interface FantinoProveDiNotte {
  fantinoId: string | null;
  nome: string | null;
  foto: string | null;
}

export interface CavalliProvaDiNotte {
  id: number;
  palioDate: string;
  orecchio: string;
  caduto: boolean; 
  puntoCaduta: string;
  cavallo: CavalloProveDiNotte;
  fantino1: FantinoProveDiNotte;
  fantino2: FantinoProveDiNotte;
  fantino3: FantinoProveDiNotte;
}

export interface ProvaDiNotte {
  proveNome: string;
  cavalli: CavalliProvaDiNotte[];
}

export interface ProveDiNotte {
  giorno: string;
  prove: ProvaDiNotte[];
}
//#endregion

export interface PalioTutto {
    id: number;
    palioDate: string;
    palio: string;
    video: string;
    tempo: string | null;
    fotoArrivo: string;
    straordinario: boolean;
    rinviato: boolean;
    cappotto: boolean;
    precedente: string | null;
    precedenteNome: string | null;
    successivo: string | null;
    successivoNome: string | null;
    drappellonePalioFoto: string | null;
    mossiere: Mossiere;
    contrada: Contrada;
    cavallo: Cavallo;
    fantino: Fantino;
    drappellone: Drappellone;
    accoppiate: Accoppiata[];
    proveDiNotte: ProveDiNotte[];
}