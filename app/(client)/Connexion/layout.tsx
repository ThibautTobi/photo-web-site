

export default function Layout ({ dashboard  , login }){

    const isLogin = false;

    return isLogin ? dashboard : login ;
};