"use client"
import { BadgeDollarSign, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function Login(){
    const Router = useRouter()
    useEffect(() => {
        document.documentElement.classList.remove("dark");
    }, []);

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [hide,setHide] = useState(true)

    function Validasi(){
        
        const cleanEmail = email.trim()
        // memerikasa apakah email kosong,
        if(cleanEmail === ""){
            toast.error("Email wajib diisi")
         return false
        }
        // mengecek format email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(cleanEmail)){
           toast.error("format email tidak valid")
           return false
        }

        // memerikasa apakah password kosong
       if(password === ""){
       toast.error("passord wajib diisi")
       return false
    }

    if(password.length <= 4 ) {
    toast.error("minimal 4 karakter")
    return 
   } 
    
   return true
}




  async  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(loading || !Validasi()){
            return
        }
        
       try {
        // menandai loading
       setLoading(true)

        // mengirim  email dan password ke api
const response = await fetch("http://localhost:3000/api/login",{
    method:"POST",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        email: email.trim(),
        password
    })
})

        // mengambil response api await response.json()
    const result = await response.json()
        //  jika api gagal kembalikan !response.ok atau result.success = false
        // console.log("ini adalah response",response)
        // console.log("ini adalah result",result)
   if(!response.ok || result.status === false){
    setPassword("")
    return toast.error("akun anda tidak valid")
   }
     // jika login berhasil berikan toast
        toast.success("login berhasil")
        // jika berhasil redirect ke dashboard router.push("/dashboard")   
        setPassword("")    
        setEmail("")  
        Router.push("/dashboard")
    } catch (error) {
        console.error("terjadi kesalahan",error)
        toast.error("Terjadi kesalahan silakan coba lagi")
        
    }finally{
        setLoading(false)
    }




        // console.log("ini adalah email: ",email)
        // console.log("ini adalah password : ",password)
    }

    return(
        <div className="w-full h-screen md:flex overflow-hidden">
  
    <div  className={`md:w-[40%]  transition-all duration-500   relative bg-primary justify-center p-6 text-white flex flex-col items-center `}>
      <div className="flex gap-2 items-center  w-135 mt-5">
           <BadgeDollarSign className="w-20 h-20 text-sky-400"/>
            <div className="">
                <h2 className="-mb-1 text-5xl" >Finance<span className="font-sans text-5xl">Ku</span></h2>
                <span className="inline-block text-[15px] text-gray-300">personal finance manajement</span>
            </div>
      </div>
      <div className=" mt-5 text-5xl w-130 text-white font-bold">    
          <h2>Mulai Mengelola Keuangan Pribadi anda</h2>
      </div>
      <p className="w-130 mt-5">Lorem ipsum, dolor sit amset consectetur adipisicing elit. Quo placeat nulla corrupti sapiente eveniet excepturi consectetur, voluptas esse molestiae eligendi?</p>
     {/* glow */}
      <div className="h-50 w-50 bg-primary-light/10  rounded-full absolute -bottom-10 -right-10 "></div>
      <div className="h-50 w-50 bg-primary-light/10  rounded-full absolute -top-10 -left-10 "></div>
      <div className="h-40 w-40 bg-primary-light/5  rounded-full absolute top-15 left-15 "></div>
     
    </div>
    <div className="flex-1 flex flex-col space-y-10 bg-primary-light  p-6 justify-center items-center ">
<div className="w-120   gap-6 flex flex-col px-6 py-6 rounded-xl  shadow-primary">
<div className="flex flex-col items-center ">
        <BadgeDollarSign className="w-20 h-20 bg-primary/90 rounded-xl p-4 text-sky-400"/>
        <h1 className="text-[30px] font-semibold">Selamat Datang Kembali</h1>
        <p>Masuk ke akun financeku</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" action="">
            <div className="flex flex-col gap-2 ">
                <label htmlFor="" className="font-semibold text-[16px]">Email</label>
                <input onChange={(e)=> setEmail(e.target.value)}  className="w-full rounded-2xl   py-3 px-4" type="text" name="email" value={email} id="" placeholder="Masukkan email anda" />
            </div>
            <div className="flex flex-col gap-2  w-full  ">
                <label className="font-semibold text-[16px]" htmlFor="">Password</label>
                <div className="relative overflow-hidden">
                    {
                        hide === true ?( <EyeOff onClick={()=>setHide(false)}  className="absolute w-5 h-5 right-4 bottom-4 z-20 cursor-pointer"/> ):(<Eye onClick={()=>setHide(true)} className="absolute w-5 h-5 right-4 bottom-4 z-20 cursor-pointer"/>)
                    }
                    
                     {/* <EyeOff onClick={()=>setHide(false)}  className="absolute w-5 h-5 right-4 bottom-4 z-20 cursor-pointer"/> */}
                <input onChange={e=>setPassword(e.target.value)} className="w-full rounded-2xl   py-3 px-5" type={hide?"password":"text"} name="password" value={password} id="" placeholder="Masukkan password anda" />
                </div>
               
            </div>
            <div className="flex justify-center">
          <button
    type="submit"
    disabled={loading}
    className="px-4 py-3 bg-primary w-full rounded-xl text-white hover:brightness-120 disabled:cursor-not-allowed disabled:opacity-70"
>
    {loading ? "Memproses..." : "Masuk"}
</button>
            </div>
        </form>
        <div className="flex flex-col items-center">

            <span className="text-[15px]">belum punya akun <Link href="#" className="text-primary">Daftar sekarang</Link></span>
       
        </div>
</div>
        
    </div>
  </div>
    )
}