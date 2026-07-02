import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const BASE_URL = "http://localhost:3000/auth/login-cookie"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include"
            })
            
            if (!response.ok) {
                throw new Error('Forbidden')
            }
            
            const data = await response.json()
            localStorage.setItem('role',data.user.role)

            if (data.user.role === 'admin') {
                console.log("Vous êtes admin !")
                // navigate('/admin')
            } else {
                // navigate('/profile')
                console.log("Vous êtes quelqu'un !")
            }

        } catch (err) {
            console.error("Erreur de connexion :", err)
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(e) => setpassword(e.target.value)}
                />
                <button>Connexion</button>
            </form>
        </main>
    )
}