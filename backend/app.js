import express from 'express'
import cors from 'cors'
import { getUsers, getUser, createUser, checkUserCorrect, checkUserExists, deleteUser } from './database.js'
import { getPasswords, getPassword, createPassword, editPassword, deletePassword } from './database.js'
const app = express()
const PORT = 3001

// Start express server
app.use(express.json())
app.use(cors())

//* Start user data calls
// Get all users
app.get('/users', async (req, res) => {
    const users = await getUsers()
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(users))
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await getUser(id)
    res.send(user)
})

app.post('/users/create', async (req, res) => {
    const { username, email, password } = req.body
    const user = await createUser(username, email, password)
    res.send(user)
})

app.delete('/users/delete', async (req, res) => {
    const { email } = req.body
    const user = await deleteUser(email)
    res.send(user)
})
//* End user data calls

//* Start password data calls
app.get('/passwords/:id', async (req, res) => {
    const id = req.params.id
    const passwords = await getPasswords(id)
    res.send(passwords)
})

app.get('/passwords/:id/:web_name', async (req, res) => {
    try {
        const id = req.params.id;
        const web_name = req.params.web_name;
        const password = await getPassword(id, web_name);
        if (password.length === 0) {
            res.status(404).send('Password not found');
        } else {
            res.send(password);
        }
    } catch (error) {
        console.error('Failed to retrieve password:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/passwords/create', async (req, res) => {
    const { userID, web_name, web_pass } = req.body
    const password = await createPassword(userID, web_name, web_pass)
    res.send(password)
})

app.patch('/passwords/update/:userID/', async (req, res) => {
    const userID = req.params.userID
    const { web_name, webpass } = req.body
    const password = await editPassword(userID, web_name, webpass)
    res.send(password)
})

app.delete('/passwords/delete/:userID', async (req, res) => {
    const userID = req.params.userID
    const { web_name } = req.body
    const password = await deletePassword(userID, web_name)
    res.send(password)
})
//* End password data calls

//* Start user authentication
app.get('/user_exists/:email', async (req, res) => {
    const email = req.params.email
    const result = await checkUserExists(email)
    res.send(result)
})

app.get('/user_correct/', async (req, res) => {
    const { email, password } = req.body
    const test = await checkUserCorrect(email, password)
    res.send(test)
})
//* End user authentication

// Handling errors
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
})

// Port designation
app.listen(process.env.PORT || PORT, '0.0.0.0', () => {
    console.log(`Server is listening`)
})