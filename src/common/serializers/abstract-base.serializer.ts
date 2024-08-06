export abstract class AbstractBaseSerializer<T> {
  constructor(private readonly entity: T) {}

  serialize(): any {
    return this.toObject(this.entity);
  }

  protected toObject(entity: T): any {
    const plainObject = { ...entity };
    return plainObject;
  }
}
