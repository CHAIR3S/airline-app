export interface Employee {
  employeeId: number;
  user: {
    userId: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
  };
  position: {
    positionId: number;
    name: string;
  };
  salary: number;
  airline?: {
    airlineId: number;
    name: string;
  };
}
