import React from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { User } from 'types/api';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedUser: User | null;
}
export function EditUserModal({ isOpen, onClose, handleSubmit, selectedUser }: EditUserModalProps) {
  return <Modal isOpen={isOpen} onClose={onClose}>
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
  </Modal>;
}
