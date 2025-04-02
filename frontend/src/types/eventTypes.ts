export interface EventType {
    id: number;
    title: string;
    description: string;
    location?: string;
    date: string;
    available_tickets: number;
    created_by: number;
  }
  

  export default EventType;