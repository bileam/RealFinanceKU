import Content from "@/components/transaction/Content";
import Header from "@/components/transaction/Header";

export default function transaction (){
    return(
        <div className="flex flex-col gap-2">
            <Header/>
            <Content/>
        </div>
    )
}