import Categories from "@/components/categories/Categories";
import Header from "@/components/Header";

export default function categories (){
    return(
        <div className="flex flex-col gap-2">
            <Header  keterangan="Atur Kategori Pemasukan dan pengeluaran anda">Kategori</Header>
            <Categories/>
        </div>
    )
}