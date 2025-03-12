import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Booking } from "./Booking";
import { User } from "./User"; // Убедись, что этот файл существует

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column({ nullable: true })
  location?: string;

  @Column()
  event_date!: Date;

  @Column()
  available_tickets!: number;

  @Column()
  created_by!: number; 

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings!: Booking[];

  @ManyToOne(() => User, (user) => user.events)
  user!: User; 
}

export default Event; 
