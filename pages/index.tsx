import { useAllUsers } from '../hooks/use-all-users';
import React, { useCallback, useState } from 'react';
import { EditUserParams, User } from '../types/api';
import { escapeRegExp } from '../utils/escape-regexp';
import { UserTable } from './user-table';
import { Input, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { useMutation } from 'react-query';

export default function Home() {
  const { users, isLoading, error, refetch } = useAllUsers();

  const { mutate: updateUser } = useMutation(({ data, id }: EditUserParams) => fetch(`https://reqres.in/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }));

  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterBySearchInput = useCallback((user: User): boolean => {
    const userInputRegex = escapeRegExp(search);
    return userInputRegex.test(user.email) || userInputRegex.test(user.last_name); 
  }, [search]);

  const onUpdateUser = () => {
    refetch();
  }

  if (isLoading){
    return (<div>
      Loading...
    </div>);
  }

  if (error){
    return (<div>
      An error has occurred, please try again later
    </div>);
  }
  return (
    <main>
      <FormControl mb="2rem">
        <FormLabel>Search: </FormLabel>
        <Input type="search" value={search} onChange={handleSearch} />
        <FormHelperText>Filter users by last name or email</FormHelperText>
      </FormControl>
      <UserTable users={users} filterFunction={filterBySearchInput} updateUserFunction={updateUser} onUpdateUser={onUpdateUser} />
    </main>
  )
}



