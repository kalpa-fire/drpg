import Image from 'next/image';
import React, { useState } from 'react';
import { UserTableProps } from './index';
import { Button, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure,  Input, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { User } from 'types/api';
import { useMutation } from 'react-query';

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
    console.log(e);
    const [ first_name, last_name, email ] = e.currentTarget;
    const data: EditUserParams['data'] = {
      email: email.value,
      first_name: first_name.value,
      last_name: last_name.value
    }
    console.log('data', data);
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
          <ModalHeader>Edit user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb="2rem">
                <FormLabel>Email: </FormLabel>
                <Input type="email" name="email" defaultValue={selectedUser?.email} />
              </FormControl>
              <FormControl mb="2rem">
                <FormLabel>First name: </FormLabel>
                <Input type="text" name="first_name" defaultValue={selectedUser?.first_name} />
              </FormControl>
              <FormControl mb="2rem">
                <FormLabel>Last name: </FormLabel>
                <Input type="text" name="last_name" defaultValue={selectedUser?.last_name} />
              </FormControl>
              <Button type="submit">
                Save changes
              </Button>
            </form>
          </ModalBody>
      </ModalContent>
    </Modal>
  </>
  );
}
