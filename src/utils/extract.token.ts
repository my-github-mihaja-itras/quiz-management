import jwt from 'jsonwebtoken';
import { config } from '@/cores/constant/constant.configuration'

const extractTokenInfo = (token: string) => {
    try {
        const decodedToken = jwt.decode(token.toString());

        return decodedToken;
    } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        return null;
    }
};

export default extractTokenInfo