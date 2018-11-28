import "../img/icon-128.png";
import "../img/icon-34.png";

import { Book } from "./shared/models/Book";

interface onMessageRequest {
  type: string;
}

const bookList = [1, 2, 3, 4, 5, 6].map(index => new Book({ id: index, title: `Book${index}` }));

chrome.runtime.onMessage.addListener((request: onMessageRequest, sender, sendResponse: Function) => {
  if (request.type === "getBookList") {
    sendResponse({ result: bookList });
  }
});

let index = 1;
const intervalId = window.setInterval(() => {
  const nextIndex = bookList.length + 1;
  bookList.push(new Book({ id: nextIndex, title: `Book${nextIndex}` }));
  chrome.runtime.sendMessage({ type: "updateBookList", bookList });
  index++;

  if (index > 5) {
    window.clearInterval(intervalId);
  }
}, 2500);
