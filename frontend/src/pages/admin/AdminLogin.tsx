
interface Props{onLogin:(token:string,username:string)=>void}
export default function AdminLogin({onLogin}:Props){
 return <button onClick={()=>onLogin("demo","admin")}>Login</button>
}
