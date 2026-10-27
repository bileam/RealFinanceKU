'use client'
import Content from "@/components/transaction/Content";
import Header from "@/components/Header";
import { useState } from "react";
import AddTransactionModal from "@/components/transaction/AddTransactionModal";

export default function Transaction (){
    const [ismodalActif,setModalActif] = useState(false)
    return(
        <div className="flex flex-col gap-2">
           <Header onClick={()=>setModalActif(true)}  keterangan="Lakukan transaksi kuangan dan transaksi anda akan dikelola">Transaction</Header>
            <Content/>
            <AddTransactionModal
            isOpen={ismodalActif}
            onClose={()=>setModalActif(false)}/>
        </div>
    )
}