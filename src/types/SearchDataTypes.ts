type BookData = {
    documents: BookList[];
    meta: {
        is_end: boolean;
        pageable_count: number;
        total_count: number;
    };
};

type BookList = {
    authors: string[];
    datetime: Date;
    isbn: string;
    price: number;
    publisher: string;
    sale_price: number;
    status: string;
    thumbnail: string;
    title: string;
    translators: string[];
    url: string;
};

export type { BookList, BookData };
