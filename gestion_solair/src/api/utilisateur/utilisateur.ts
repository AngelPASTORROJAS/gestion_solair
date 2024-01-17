export interface Utilisateur {
    id: number;
    identifiant: string;
    prenom: string;
    nom: string;
    mail: string;
    role: string;
}

export interface UtilisateurExtend extends Utilisateur {
    password: string;
}