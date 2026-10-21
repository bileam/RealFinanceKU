import Content from "@/components/transaction/Content";
import Header from "@/components/Header";

export default function transaction (){
    return(
        <div className="flex flex-col gap-2">
           <Header keterangan="Lakukan transaksi kuangan dan transaksi anda akan dikelola">Transaction</Header>
            <Content/>
        </div>
    )
}