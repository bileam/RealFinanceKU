import Grafik from "@/components/dashboard/Grafik";
import Spesifik from "@/components/dashboard/Spesifik";
import Welcome from "@/components/dashboard/Welcome";

export default function dashboard (){
    return(
        <div className="flex flex-col gap-5">
            <Welcome/>
            <Spesifik/>
            <Grafik/>
        </div>
    )
}