import {useState, useEffect, type FormEvent} from "react"
import { Header } from "../../components/header" 
import { Input } from "../../components/input"
import { db } from "../../services/firebaseConnection"
import { 
    collection,
    addDoc,
    query, 
    onSnapshot, 
    orderBy, 
    doc, 
    deleteDoc } from "firebase/firestore"

import {FiTrash} from 'react-icons/fi'


interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
    created: Date;
}

export function Admin(){

    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [bgColorInput, setBgColorInput] = useState("#121212")

    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                    created: doc.data().created.toDate()
                })
            })

            setLinks(lista)
        })

        return() => {
            unsub();
        }
    }, [])

    async function handleRegister(e: FormEvent ){
        e.preventDefault()

        if(nameInput === "" || urlInput === ""){
            alert("Preencha todos os campos")
            return;
        }

        await addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: bgColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            setNameInput("") 
            setUrlInput("")
            setTextColorInput("#f1f1f1")
            setBgColorInput("#121212")
            console.log("Cadastrado com sucesso!")

        })
        .catch((error) => {
            console.log("Deu erro ao casdastrar no banco: " + error)
        })
    }

    async function handleDeleteLink(id: string){
        const docRef = doc(db, "links", id)
        
        await deleteDoc(docRef)
    }


    return(
        <>
        <div className="flex items-center flex-col min-h-screen pb-7 px-2 ">
            <Header/>

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input
                placeholder="Digite o nome do link..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
                <Input
                type="url"
                placeholder="Digite a URL do link..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-3">
                        <label className="text-white font-medium mt-2 mb-2">Cor do link</label>
                        <input
                        className="ml-4.5 w-10 h-10 rounded-2xl "
                        type="color"
                        value={textColorInput}
                        onChange={(e) => setTextColorInput(e.target.value)}
                        />

                    </div>

                    <div className="flex gap-3">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
                        <input
                        className="ml-4.5 w-10 h-10 rounded-2xl "
                        type="color"
                        value={bgColorInput}
                        onChange={(e) => setBgColorInput(e.target.value)}
                        />

                    </div>
                </section>


                {nameInput !== "" && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label className="text-white font-medium mt-2 mb-3">Veja como está ficando: </label>

                    <article 
                    className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                    style={{marginBottom: 8, marginTop: 8, backgroundColor: bgColorInput}}>
                        <p 
                        className="font-medium" style={{color: textColorInput}}>
                            {nameInput}
                        </p>

                    </article>
                </div>
                )}

                <button 
                type="submit"
                className="w-xl h-9 mb-7 bg-blue-600 text-white font-medium gap-4 rounded-md flex items-center justify-center">
                    Cadastrar
                </button>

            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

            {links.map((item) => (
                <article 
                key={item.id}
            style={{backgroundColor: item.bg, color: item.color}}
            className="flex items-center justify-between w-11/12 max-w-xl h-13 rounded py-3 px-2 mb-2 select-none">
                <p className="font-medium">
                    {item.name}
                </p>

                <div>
                    <button 
                    onClick={() => handleDeleteLink(item.id)}
                    className="bg-black p-1.5 rounded flex items-center justify-center">
                        <FiTrash size={20} color="#fff"/>
                    </button>
                </div>
            </article>
            ))}
        </div>
        </>
    )
}