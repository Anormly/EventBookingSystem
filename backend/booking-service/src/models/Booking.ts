import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@Entity("bookings")
export class Booking {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Event, (event) => event.bookings)
    @JoinColumn({ name: "event_id" })
    event!: Event;

    @ManyToOne(() => User, (user) => user.bookings)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column()
    status!: string;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}