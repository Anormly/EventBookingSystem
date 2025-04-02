import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1743435332965 implements MigrationInterface {
    name = 'InitMigration1743435332965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "events_created_by_fkey"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "bookings_event_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "bookings_user_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "event_id"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "eventId" integer`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "location" character varying`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_f95d476ef16fad91a50544b60c3" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_f95d476ef16fad91a50544b60c3"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "status" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "location" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "eventId"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "event_id" integer`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "events" ADD "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "bookings_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
