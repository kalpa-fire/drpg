import { render as defaultRender, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactNode } from 'react';

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