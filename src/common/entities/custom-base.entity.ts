import {
  PrimaryKey,
  Property,
  Entity,
  BeforeCreate,
  BeforeUpdate,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity({ abstract: true })
export abstract class CustomBaseEntity {
  @PrimaryKey()
  id: string = uuid();

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

  @BeforeCreate()
  beforeCreate() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
