export class Book {
  public id?: number;
  public title?: string;
  constructor(args?: Book) {
    if (args) {
      this.id = args.id;
      this.title = args.title;
    }
  }
}