import { useAllUsers } from "hooks/use-all-users";
import Image from "next/image";



export default function Home() {
  const { users, isFetching, error } = useAllUsers();
  return (
    isFetching ? 
    <div>
      Loading...
    </div> 
    : 
    <table>
      <thead>
        <tr>
          <th>
            Avatar
          </th>
          <th>
            First name
          </th>
          <th>
            Last name
          </th>
          <th>
            Email
          </th>
          <th>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map(({id, avatar, first_name, last_name, email})=>(
          <tr key={id}>
            <td>
              <Image src={avatar} alt="" width="50" height="50"/>
            </td>
            <td>
              {first_name}
            </td>
            <td>
              {last_name}
            </td>
            <td>
              {email}
            </td>
            <td>
              Edit Details
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}



