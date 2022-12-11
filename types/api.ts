export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export type PaginatedData = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  }
}

export type EditUserParams = {
    id: number;
    data: Omit<User, 'avatar' | 'id'>;
  }