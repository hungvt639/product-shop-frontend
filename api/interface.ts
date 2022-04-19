export interface Pagination<T = any> {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface SearchBody {
    page?: number | string;
    limit?: number | string;
    search?: string;
    select?: string;
    sort?: string;
}
