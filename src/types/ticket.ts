import { Flight } from "./flight";

// types/ticket.ts o en api/ticket.ts
export interface Ticket {
  ticketId: number;
  barcode: string;
  issueDate: string;

  reservation: {
    reservationId: number;
    reservationDate: string;
    status: string;
    flight: Flight;

  };
}
