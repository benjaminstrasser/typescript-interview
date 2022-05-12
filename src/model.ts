export interface Customer {
    readonly name: string;
}

export interface Book {
    readonly title: string,
    readonly lendTo: Customer,
    readonly lendAt: Date
}