import React, { useEffect, useState } from 'react'

const Home = () => {
  const [users, setUsers] = useState([])

  // Function to fetch users from the backend
  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      console.log(data)
      setUsers(data) // Set fetched data into state
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  useEffect(() => {
    getUsers()
  })

  const renderUsersTable = () => (
    <table>
      <thead>
        <tr>
          {/* Add table headers based on your users data structure */}
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            {/* Adjust these fields based on your users data structure */}
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            {/* Add more cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div>
      {users.length > 0 ? renderUsersTable() : <p>Loading users...</p>}
    </div>
  )
}

export default Home