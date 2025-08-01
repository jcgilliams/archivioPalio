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

export interface VintoGroup {
  vinto: number;
  cavalli: cavalli[];
}

export interface CavalloDetail extends cavalli {
  palioCorso: PalioCorso[];
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
