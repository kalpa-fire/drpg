import { useEffect, useState } from 'react'
import { useInfiniteQuery, QueryFunctionContext } from 'react-query';
import { PaginatedData, User } from 'types/api';

/**
 * Retrieves all users from the ReqRes api, ignoring pagination
 */
export function useAllUsers(){
    const [ users, setUsers ] = useState<User[]>([]);
    const {
      data,
      isLoading,
      error,
      hasNextPage,
      fetchNextPage
    } = useInfiniteQuery<PaginatedData>(
      'my-paginated-data',
      async ({ pageParam }: QueryFunctionContext) => {
        const response = await fetch(`https://reqres.in/api/users?page=${pageParam}`)
        const data = response.json()
        return data;
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.page >= lastPage.total_pages ? undefined  : lastPage.page + 1 
        },
      }
    )
  
    useEffect(()=>{
      (async()=> {
        await fetchNextPage()
        setUsers(u => data ? data.pages.reduce<User[]>((allUsers, currentPage)=>[...allUsers, ...currentPage.data], []) : u);
      })();
    },[hasNextPage])
  
    return { 
      users,
      isLoading,
      error
    };
  }