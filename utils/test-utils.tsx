import { render as defaultRender, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactNode } from 'react';
import { User } from 'types/api';

interface WrapperProps {
    children: ReactNode;
}

const queryClient = new QueryClient()


function Wrapper({ children }: WrapperProps){
    return (<QueryClientProvider client={queryClient}>
        { children }
    </QueryClientProvider>)
}

export function render(ui: JSX.Element, options?: RenderOptions){
    return defaultRender(ui, {...options, wrapper: Wrapper})
}


export const userFixture: User = {
    "id": 1,
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
}