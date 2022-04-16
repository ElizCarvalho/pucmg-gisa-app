import Head from "next/head";
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export default function Logout(){
    const { signOut } = useContext(AuthContext);
    async function  logout(){
        try{
            await signOut();
        }catch(error){
            throw error;
        }
    }

    logout();

    return (
        <Head>
        <title>
          Logout - Boa Saúde
        </title>
      </Head>
    );
}


