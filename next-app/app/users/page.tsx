import React, { use } from 'react'

interface User{
  id : number;
  name: string;
}

const UsersPage =async () => {
  // Data Cach only with fetch !
  const res = await fetch('https://jsonplaceholder.typicode.com/users',{next : {revalidate: 10} });
  const users : User[] = await res.json();


  return (
    <div>
      <h2>Users: </h2>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul className='userList'>
        {users.map(user=> <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  )
}

export default UsersPage
