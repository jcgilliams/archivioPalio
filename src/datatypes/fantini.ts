export interface fantini {
  id: string;
  nome: string;
  soprannome: string;
  annoNascita: string;
  foto: string;
  paliiCorsi: number;
  paliiVinti: number;
  esordio: string;
  esordio_date: string;
  ultimo: string;
  ultimo_date: string;
}

export interface VintoGroupFantini {
  vinto: number;
  fantini: fantini[];
}

export interface FantinoDetail extends fantini {
  palioCorso: PalioCorso[];
}

export interface PalioCorso {
  id: string;
  palioDate: string;
  drappellonePalioFoto: string;
  vinto: boolean;
  caduto: boolean;

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

  cavallo: {
    id: string;
    nome: string;
    foto: string;
    palioFoto: string | null;
  };

  fantinoPalioFoto: string | null;

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

export interface fantiniDecennium {
  fantinoId: string;
  nome: string;
  soprannome: string;
  foto: string;
  paliiCorsi: number;
  paliiVinti: number;
  aantal: number;
}
