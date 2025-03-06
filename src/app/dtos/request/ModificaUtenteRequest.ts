export interface ModificaUtenteRequest {
  username: string;
  nome: string;
  email: string;
  telefono: string;
  vecchiaPassword: string;
  nuovaPassword: string;
  comunita: string;
  isNotifica: boolean;
  generiSelezionati: string[];
}
