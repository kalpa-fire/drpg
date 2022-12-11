import Image from 'next/image';
import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { EditUserParams, User } from 'types/api';
import { UseMutateFunction, useMutation } from 'react-query';
import { EditUserModal } from './edit-user-modal';


interface UserTableProps {
  users: User[];
  filterFunction: (user: User) => boolean;
  updateUserFunction: UseMutateFunction<Response, unknown, EditUserParams>;
  onUpdateUser: () => void;
}




export function UserTable({ users, filterFunction, updateUserFunction, onUpdateUser }: UserTableProps) {
  const [ selectedUser, setSelectedUser ] = useState<User|null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (data: EditUserParams['data']) => { 
    if (selectedUser){
      updateUserFunction({
        data,
        id: selectedUser?.id
      })
    }
    setSelectedUser(null);
    onUpdateUser();
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


