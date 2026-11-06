const database = require('../config/database')

const createUser = async (req, res) => {
    const {registry, name, lastname, email, password, profileType} = req.body

    try {
        const [profile] = await database.query("SELECT id_profile FROM profiles WHERE profile_type = ?", [profileType])
    
        await database.query("INSERT INTO users (registry, user_name, user_lastname, email, password, id_profile) VALUES (?, ?, ?, ?, ?, ?)", [registry, name, lastname, email, password, profile[0].id_profile])

        res.status(201).json({message: "Usuário criado com sucesso!"})            
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Erro ao criar usuário"})
    }
}

module.exports = { createUser }