import {Book, Customer} from "./model";
import {books, customers} from "./inventory";
import {differenceInWeeks, isPast} from "date-fns";

interface IInventoryService {
    readonly maxLendingPeriodInWeeks: number;

    searchForBookWithTitle: (query: string) => Book[]

    searchForAvailableBookWithTitle: (query: string) => Book[]

    getLentBooksForCustomer: (customer: Customer) => Book[]

    getAllOverdueBooks: () => Book[]
}

class InventoryService implements IInventoryService{
    readonly maxLendingPeriodInWeeks: number = 4;

    searchForBookWithTitle(query: string): Book[] {
        return books.filter(b => b.title.includes(query))
    }

    searchForAvailableBookWithTitle(query: string): Book[] {
        return this.searchForBookWithTitle(query).filter(b => !b.lendTo);
    }

    getLentBooksForCustomer(customer: Customer): Book[] {
        return books.filter(b => b.lendTo === customer);
    }

    getAllOverdueBooks(): Book[] {
        return books.filter(b => {
            const diff = differenceInWeeks(new Date(), b.lendAt)
            console.log(diff)
            return diff > this.maxLendingPeriodInWeeks
        });
    }

}

export const inventoryService = new InventoryService()