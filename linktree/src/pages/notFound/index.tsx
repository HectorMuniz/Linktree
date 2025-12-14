import { Link } from "react-router"

export function NotFound(){
    return(
        <>
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <h1 className="text-white font-bold text-4xl mb-4">ERROR 404</h1>
            <p className="text-white italic text-2xl mb-7">Página não encontrada</p>

            <Link className="bg-gray-50/20 text-white font-normal text-xl rounded-md p-1.5" to="/">Voltar para Home</Link>

        </div>
        </>
    )
}