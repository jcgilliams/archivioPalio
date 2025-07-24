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
