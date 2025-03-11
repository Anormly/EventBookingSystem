import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Event, (event) => event.bookings)
  event!: Event;

  @ManyToOne(() => User, (user) => user.bookings)
  user!: User;

  @Column()
  status!: string; // Например, "booked", "cancelled"

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}

export default Booking; // Добавляем экспорт
