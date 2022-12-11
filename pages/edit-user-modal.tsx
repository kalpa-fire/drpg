import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { EditUserParams, User } from 'types/api';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (data: EditUserParams['data']) => void;
  selectedUser: User;
}

export function EditUserModal({ isOpen, onClose, handleSubmit, selectedUser }: EditUserModalProps) {
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(formData);
    onClose();
  };

  const [formData, setFormData] = useState<EditUserParams['data']>({
    email: selectedUser.email,
    first_name: selectedUser.first_name,
    last_name: selectedUser.last_name
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  return <Modal isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      <ModalHeader>Edit user</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form>
          <FormControl mb="2rem">
            <FormLabel>Email:</FormLabel>
            <Input type="email" onChange={handleInputChange} value={formData.email} name="email" defaultValue={selectedUser?.email} />
          </FormControl>
          <FormControl mb="2rem">
            <FormLabel>First name:</FormLabel>
            <Input type="text" onChange={handleInputChange} value={formData.first_name} name="first_name" defaultValue={selectedUser?.first_name} />
          </FormControl>
          <FormControl mb="2rem">
            <FormLabel>Last name:</FormLabel>
            <Input type="text" onChange={handleInputChange} value={formData.last_name} name="last_name" defaultValue={selectedUser?.last_name} />
          </FormControl>
          <Button onClick={onSubmit}>
            Save changes
          </Button>
        </form>
      </ModalBody>
    </ModalContent>
  </Modal>;
}
