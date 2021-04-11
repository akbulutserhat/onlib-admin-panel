export const isBookAddedToLibrary = (book, booksOfLibrary = []) => {
  return booksOfLibrary.some((item) => item?.book?._id == book._id);
};
