import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "reviews" })
export class ReviewEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint", name: "product_id" })
  productId: number;

  @Column({ type: "integer" })
  rating: number;

  @Column({ type: "character varying", nullable: true })
  title: string | null;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "timestamp", name: "reviewed_at" })
  reviewedAt: Date;

  @Column({ type: "text", name: "review_url", unique: true })
  reviewUrl: string;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
