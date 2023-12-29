import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface RgpdModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function RgpdModal({ open , handleClose }: RgpdModalProps) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Informations RGPD</DialogTitle>
            <DialogContent>
                <p>
                    Ici, vous pouvez inclure des informations sur la façon dont vous traitez les données des utilisateurs, 
                    conformément au RGPD. Cela peut inclure, mais sans y limiter, les informations suivantes :
                </p>
                <ul>
                    <li>Type de données collectées: Email</li>
                    <li>Comment et pourquoi les données sont utilisées : utilisations pour envoyer des mail sur les offres et nouveauter</li>
                    <li>Comment les données sont stockées et sécurisées: sur une base de donnée cloud</li>
                    <li>Les droits des utilisateurs concernant leurs données</li>
                    <li>Comment les utilisateurs peuvent accéder à leurs données ou demander leur suppression</li>
                    <li>- a tous moments contacter nous pour supprimer votre adresse de la base de donnée ou quand vous recever un email sur le lui fait pour</li>
                </ul>
                <p>
                    Assurez-vous que les informations fournies sont complètes et conformes aux exigences du RGPD.
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} className='text-white'>Fermer</Button>
            </DialogActions>
        </Dialog>
    );
};
