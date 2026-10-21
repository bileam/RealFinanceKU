import Cart from "../Cart";




export default function Categories(){

    return(
        <div className="flex flex-col gap-5">
            <div className="flex gap-4">
                <Cart/>
                <Cart/>
            </div>
            <div>
            <h2 className="text-primary-dark text-2xl mb-5 font-bold dark:text-indigo-300">Daftar Kategori</h2>
            <div  className="flex justify-between gap-4">
                    <Cart/>
                    <Cart/>
                    <Cart/>
                    <Cart/>
                </div>
            </div >
        </div>
    )
}