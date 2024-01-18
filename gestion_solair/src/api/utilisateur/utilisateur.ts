export interface Utilisateur {
    id: number;
    login: string;
    prenom: string;
    nom: string;
    email: string;
    role: string;
}

export interface UtilisateurExtend extends Utilisateur {
    mot_de_passe: string;
}