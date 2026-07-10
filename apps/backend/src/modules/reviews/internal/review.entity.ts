import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "reviews" })
export class ReviewEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Index("idx_reviews_external_id", { unique: true })
  @Column({ type: "character varying", length: 255, name: "external_id", unique: true })
  externalId: string;

  @Column({ type: "smallint" })
  rating: number;

  @Column({ type: "character varying", length: 500, nullable: true })
  title: string | null;

  @Column({ type: "text" })
  body: string;

  @Column({ type: "character varying", length: 150 })
  author: string;

  @Index("idx_reviews_reviewed_at")
  @Column({ type: "timestamp", name: "reviewed_at" })
  reviewedAt: Date;

  @Column({ type: "character varying", length: 50 })
  source: string;

  @Column({ type: "text", name: "product_url" })
  productUrl: string;

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
