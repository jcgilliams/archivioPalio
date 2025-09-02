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
  fantino: FantinoAccoppiate | null;
  trifore: TriforeAccoppiate;
  canape: CanapeAccoppiate | null;
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
// #region PROVE DI NOTTE ASSENTE
export interface CavalliProvaDiNotteAssente {
  id: number;
  palioDate: string;
  cavallo: CavalloProveDiNotte;
}

export interface ProvaDiNotteAssente {
  proveNome: string;
  cavalli: CavalliProvaDiNotteAssente[];
}

export interface ProveDiNotteAssente {
  giorno: string;
  prove: ProvaDiNotteAssente[];
}
//#endregion
// #region PREVISITE
export interface previsiteCavallo {
  id: string;
  nome: string;
  foto: string;
}

export interface Previsite {
  id: number;
  palioDate: string;
  anno: string;
  ammesso: boolean;
  assente: boolean;
  cavallo: previsiteCavallo;
}
// #endregion
// #region TRATTA
export interface CavalloAssegnazione {
  cavalloId: string;
  coscia: number;
  foto: string;
  nome: string;
}

export interface Assegnazione {
  id: number;
  palioDate: string;
  ordine: number;
  orecchio: number;
  contrada: ContradaAccoppiate;
  cavallo: CavalloAssegnazione;
}

export interface Presentazione {
  id: number;
  coscia: number;
  cavallo: previsiteCavallo;
}

export interface PresentazioneAssente {
  id: number;
  cavallo: previsiteCavallo;
}

export interface CavalliBatterie {
  caduto: boolean;
  canape: number;
  coscia: number;
  puntoCaduta: string;
  vinto: boolean;
  id: number;
  cavallo: CavalloProveDiNotte;
  fantino: FantinoProveDiNotte;
}

export interface Batterie {
  batteriaNome: string;
  cavallo: CavalliBatterie[];
}
// #endregion
// #region PROVE
export interface FantinoProve {
  fantinoId: string;
  foto: string;
  nome: string;
  soprannome: string;
}

export interface ProveAccoppiata {
  caduto: boolean;
  canape: number;
  id: number;
  puntoCaduta: string;
  vinto: boolean;
  cavallo: CavalloProveDiNotte;
  fantino: FantinoProve;
  contrada: Contrada;
}

export interface Prove {
  giorno: string;
  ore: string;
  proveNome: string;
  nl: string;
  it: string;
  en: string;
  accoppiate: ProveAccoppiata[];
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
    previsite: Previsite[];
    proveDiNotteAssente: ProveDiNotteAssente[];
    assegnazione: Assegnazione[];
    presentazione: Presentazione[];
    presentazioneAssente: PresentazioneAssente[];
    batterie: Batterie[];
    prove: Prove[];
}