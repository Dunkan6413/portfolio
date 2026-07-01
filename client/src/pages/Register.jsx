import { useState } from "react"
import { Link } from "react-router-dom"

export default function Register() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('')
	const [first_name, setFirst_name] = useState('')
	const [last_name, setLast_name] = useState('')
	const [profile_picture, setProfile_picture] = useState('')
	const [tel, setTel] = useState('')
	const [birthDate, setBirthDate] = useState('')
	const [country, setCountry] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const formData = new FormData()
			formData.append('username', username)
			formData.append('email', email)
			formData.append('password', password)
			formData.append('role', role)
            formData.append('first_name', first_name)
            formData.append('last_name', last_name)
			formData.append('profile_picture', profile_picture)
			formData.append('tel', tel)
			formData.append('birthDate', birthDate)
			formData.append('country', country)
			
			const response = await fetch('http://localhost:3000/register',{
				method: 'POST',
				body: formData
			})

			console.log('STATUS:', response.status)
            const text = await response.text()
            console.log('BODY:', text)

			if (!response.ok) {
				throw new Error("Couldn't complete registering")
			}
			const data = await response.json()
			console.log(data)
		} catch (err) {
			console.log(err)
		}
	}

	return (
        <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.6rem", width: "280px" }}>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="First name" onChange={(e) => setFirst_name(e.target.value)} required />
                <input type="text" placeholder="Last name" onChange={(e) => setLast_name(e.target.value)} required />
                <input type="text" placeholder="Phone" onChange={(e) => setTel(e.target.value)} required />
                <input type="date" placeholder="Birth date" onChange={(e) => setBirthDate(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <select name="role" id="role" onChange={(e) => setRole(e.target.value)} required>
                    <option value="">-- Choisir un rôle --</option>
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                </select>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <button type="submit">S'inscrire</button>
                <Link to="/login">Se connecter</Link>
            </form>
        </main>
    )
}
