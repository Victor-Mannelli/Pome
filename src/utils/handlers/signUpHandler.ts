import { api } from '../axios';
import { toast } from 'react-toastify';
import { SignUpHandler } from '../Interfaces';

export function userSignUp({ email, username, password, confirmPassword, router} : SignUpHandler) {
  toast.promise(
    api.post('/signup', { email, username, password, confirmPassword }),
    {
      pending: 'Signing Up...',
      success: {
        render() {
          router.push('/pome/signup');
          return 'Account created!';
        },
      },
      // error: 'Not authorized.',
      error: {
        render(e : any) { 
          return e.data.response.data.message;
        }
      }
    },
    { toastId: 'signUp' }
  );
}
