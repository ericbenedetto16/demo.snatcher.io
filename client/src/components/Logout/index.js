import { useHistory } from 'react-router-dom';
import { deleteToken } from '../../utils';

export const Logout = () => {
    const history = useHistory();

    deleteToken();
    history.push('/login');
    return null;
};
