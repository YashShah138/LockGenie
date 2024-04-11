import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
})

//* Start user info queries
export async function createUser(username, email, password) {
    try {
        const { rows } = await pool.query(`
        INSERT INTO users (username, email, hashedPass) 
        VALUES ($1, $2, $3) RETURNING *`, [username, email, password]);
        return rows[0];
    } catch (error) {
        console.error('Error occurred creating user: ', error);
        return 'An error occurred creating user';
    }
}

export async function getUsers() {
    try {
        const { rows } = await pool.query(`SELECT * FROM users`);
        return rows;
    } catch (error) {
        console.error('Error getting all users: ', error);
        return 'An error occurred during the fetching process.';
    }
}

export async function getUser(id) {
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error getting that user: ', error);
        return 'An error occurred getting that user';
    }
}

export async function checkUserExists(email) {
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (rows.length > 0) {
            return 'User exists';
        } else {
            return 'User does not exist';
        }
    } catch (error) {
        console.error('Error occurred checking if user exists:', error);
        return 'An error occurred checking whether the user exists';
    }
}

export async function checkUserCorrect(email, password) {
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (rows.length > 0) {
            const hashedPass = rows[0].hashedPass;
            if (password === hashedPass) {
                return 'User information correct';
            } else {
                return 'Incorrect password';
            }
        } else {
            return 'No user found';
        }
    } catch (error) {
        console.error('Error occurred checking user credentials:', error);
        return 'An error occurred checking user credentials';
    }
}

export async function deleteUser(email) {
    try {
        const userCheck = await checkUserExists(email);
        if (userCheck === 'User does not exist') {
            return 'No user found with the specified email.';
        }
        const { rows: userRows } = await pool.query(`SELECT id FROM users WHERE email = $1`, [email]);
        const userID = userRows[0].id;
        await pool.query(`DELETE FROM passwords WHERE userID = $1`, [userID]);
        const { rowCount } = await pool.query(`DELETE FROM users WHERE email = $1`, [email]);
        if (rowCount === 0) {
            return 'No user found with the specified email.';
        } else {
            return 'User deleted successfully.';
        }
    } catch (error) {
        console.error('Error deleting user: ', error);
        return 'An error occurred during the deletion process';
    }
}
//* End user info queries

//* Start password queries
export async function getPasswords(id) {
    try {
        const { rows } = await pool.query(`SELECT * FROM passwords WHERE userID = $1`, [id]);
        return rows;
    } catch (error) {
        console.error('Error occurred getting passwords: ', error);
        return 'An error occurred getting the passwords';
    }
}

export async function getPassword(id, web_name) {
    try {
        const { rows } = await pool.query(`SELECT * FROM passwords WHERE userID = $1 AND web_name = $2`, [id, web_name]);
        return rows;
    } catch (error) {
        console.error('Error occurred getting that password: ', error);
        return 'An error occurred getting that password';
    }
}

export async function createPassword(userID, web_name, web_pass) {
    try {
        const { rows } = await pool.query(`
        INSERT INTO passwords (userID, web_name, web_pass) 
        VALUES ($1, $2, $3) RETURNING *`, [userID, web_name, web_pass]);
        return rows[0];
    } catch (error) {
        console.error('Error occurred creating password:', error);
        return 'An error occurred creating password';
    }
}

export async function editPassword(userID, web_name, webpass) {
    try {
        await pool.query(`UPDATE passwords SET webpass = $1 WHERE userID = $2 AND web_name = $3`, [webpass, userID, web_name]);
        const { rows } = await pool.query(`SELECT * FROM passwords WHERE userID = $1 AND web_name = $2`, [userID, web_name]);
        return rows[0];
    } catch (error) {
        console.error('Error occurred editing password:', error);
        return 'An error occurred editing that password';
    }
}

export async function deletePassword(userID, web_name) {
    try {
        await pool.query(`DELETE FROM passwords WHERE userID = $1 AND web_name = $2`, [userID, web_name]);
        const { rows } = await pool.query(`SELECT * FROM passwords WHERE userID = $1`, [userID]);
        return rows;
    } catch (error) {
        console.error('Error deleting password: ', error);
        return 'An error occurred during the deletion process';
    }
}
//* End password queries
