import Image from 'next/image';
import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { User } from 'types/api';
import { useMutation } from 'react-query';
import { EditUserModal } from './edit-user-modal';


interface UserTableProps {
  users: User[];
  filterFunction: (user: User) => boolean;
}

type EditUserParams = {
  id: number;
  data: Omit<User, 'avatar' | 'id'>;
}


export function UserTable({ users, filterFunction }: UserTableProps) {
  const [ selectedUser, setSelectedUser ] = useState<User|null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: updateUser } = useMutation(({ data, id }: EditUserParams) => fetch(`https://reqres.in/api/users/${id}`, 
  {
    method: 'PUT',
    body: JSON.stringify(data),
  }))


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { first_name, last_name, email } = e.currentTarget;
    const data: EditUserParams['data'] = {
      email: email.value,
      first_name: first_name.value,
      last_name: last_name.value
    }
    if (selectedUser){
      updateUser({
        data,
        id: selectedUser?.id
      })
    }
    onClose();
  }
  
  const handleEditButtonClick = (user: User) => {
    setSelectedUser(user);
    onOpen();
  }


  return (
  <>
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
        {users.filter(filterFunction).map((user) => (
          <tr key={user.id}>
            <td>
              <Image src={user.avatar} alt="" width="50" height="50" />
            </td>
            <td>
              {user.first_name}
            </td>
            <td>
              {user.last_name}
            </td>
            <td>
              {user.email}
            </td>
            <td>
              <Button onClick={()=>handleEditButtonClick(user)}>Edit Details</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <EditUserModal isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} selectedUser={selectedUser} />
  </>
  );
}


