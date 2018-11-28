import * as React from "react";

import { Book } from "../shared/models/Book";

interface AppState {
  bookList: Array<Book>;
}

interface onMessageRequest {
  type: string;
  bookList: Array<Book>;
}
export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      bookList: [],
    };
    this.onUpdateBookList = this.onUpdateBookList.bind(this);
  }
  componentWillMount() {
    chrome.runtime.sendMessage({ type: "getBookList" }, ({ result }: { result: Array<Book> }) => {
      this.onUpdateBookList(result);
    });
    chrome.runtime.onMessage.addListener(({ type, bookList }: onMessageRequest) => {
      if (type === "updateBookList") {
        this.onUpdateBookList(bookList);
      }
    });
  }
  render() {
    return (
      <ul>
        {this.state.bookList.map(book => {
          return <li key={book.id}>{book.title}</li>;
        })}
      </ul>
    );
  }
  private onUpdateBookList(bookList: Array<Book>) {
    this.setState({ bookList });
  }
}