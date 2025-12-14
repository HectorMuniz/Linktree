import { useState, useEffect, type FormEvent } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"

import { db } from "../../services/firebaseConnection"
import {
    setDoc,
    doc,
    getDoc
} from "firebase/firestore"


export function Networks(){

    const [insta, setInsta] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [github, setGithub] = useState("")

    useEffect(() => {
        function loadLinks(){
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setInsta(snapshot.data()?.insta)
                    setLinkedin(snapshot.data()?.linkedin)
                    setGithub(snapshot.data()?.github)
                }
                
            })
            .catch((error) => {
                console.log("Deu erro ao carregar os links: " + error)
            })
        }

        loadLinks();
    },[])

    function handleSaveLinks(e: FormEvent){
        e.preventDefault();


        setDoc(doc(db, "social", "link"), {
            insta: insta,
            linkedin: linkedin,
            github: github
        })
        .then(() => {
            console.log("Cadatrado com sucesso")
        })
        .catch((error) => {
            console.log("Deu error ao cadastrar: " + error)
        })

    }

    return(
        <>
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleSaveLinks}>

                <label className="text-white font-medium mt-2 mb-2">Instagram</label>
                <Input
                type="url"
                placeholder="Digite a URL do Instagram"
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Linkedin</label>
                <Input
                type="url"
                placeholder="Digite a URL do Linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">GitHub</label>
                <Input
                type="url"
                placeholder="Digite a URL do Github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                />

                <button className="text-white bg-blue-600 h-9 rounded-md flex items-center justify-center mb-7 font-medium" type="submit">
                    Salvar links
                </button>

            </form>
        </div>
        </>
    )
}