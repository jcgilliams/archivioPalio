export interface cavalli {
  id: string;
  nome: string;
  proprietario: string;
  annoNascita: string;
  manto: string;
  sesso: string;
  presenzeTratta: number;
  presenzeProveDiNotte: number;
  paliiCorsi: number;
  paliiVinti: number;
  nonCorso: string | null;
  foto: string;
  protocollo: boolean;
  previsite: boolean;
  proveDiNotte: boolean;
  tratta: boolean;
  esordio: string;
  esordio_date: string;
  ultimo: string;
  ultimo_date: string;
}

export interface VintoGroupCavalli {
  vinto: number;
  cavalli: cavalli[];
}

export interface CavalloDetail extends cavalli {
  palioCorso: PalioCorso[];
  palioBatterie: PalioBatterie[];
  palioProveDiNotte: PalioProveDiNotte[]; 
}

export interface PalioCorso {
  id: string;
  palioDate: string;
  drappellonePalioFoto: string;
  vinto: boolean;
  caduto: boolean;
  cavalloPalioFoto: string | null;

  palio: {
    id: string;
    nome: string;
    precedente: string | null;
    successivo: string | null;
  };

  contrada: {
    id: string;
    nome: string;
    logo: string;
  };

  fantino: {
    id: string;
    nome: string;
    soprannome: string;
    foto: string;
    palioFoto: string | null;
  };

  trifore: {
    id: string;
    numero: number;
  } | null;

  canape: {
    id: string;
    posizione: string;
  } | null;

  puntoCaduta: {
    id: string;
    punto: string;
  } | null;
}

export interface PalioBatterie {
  id: string;
  palioDate: string;
  palioNome: string;
  drappellonePalioFoto: string;
  batteriaNome: string;
  vinto: boolean;
  caduto: boolean;

  fantino: {
    id: string;
    nome: string;
    foto: string;
  };

  puntoCaduta: string;
}

export interface PalioProveDiNotte {
  id: string;
  palioDate: string;
  palioNome: string;
  drappellonePalioFoto: string;
  proveNome: string;
  proveGiorno: string;
  caduto: boolean; 

  fantino1: {
    id: string;
    nome: string;
    foto: string;
    puntoCaduta: string;
  };
  fantino2: {
    id: string;
    nome: string;
    foto: string;
    puntoCaduta: string;
  };
   fantino3: {
    id: string;
    nome: string;
    foto: string;
    puntoCaduta: string;
  }; 
}


export interface alboCavalli {
  id: number;
  anno: string;
  ammesso: boolean;
  assente: boolean;
  cavalloId: string;
  cavalloNome: string;
  cavalloFoto: string;
}

export interface cavalliDecennium {
  cavalloId: string;
  nome: string;
  foto: string;
  paliiCorsi: number;
  paliiVinti: number;
  aantal: number;
}
