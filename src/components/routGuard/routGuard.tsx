
import { ComponentType, useEffect, useState } from 'react';
import { RedirectType, useRouter } from 'next/navigation';
import { getLocalStorageItem } from '@/utils/localStorage.utils';
import extractTokenInfo from '@/utils/extract.token';
import { redirect } from 'next/navigation';

interface GuardProps {
  isAuthenticated: boolean;
}
const authGuard = <P extends GuardProps>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const token: string | null = getLocalStorageItem("loginAccessToken");
    const userInfo: any = token ? extractTokenInfo(token) : null;
    const isAuthenticated = !!token;

    useEffect(() => {
      if ( !isAuthenticated ) {
        redirect('/auth', RedirectType.replace);
      } 
      setLoading(false);
    }, [router, isAuthenticated]);

    return loading ? <></> : <WrappedComponent {...props} /> ;
  }; 
};

export default authGuard;
