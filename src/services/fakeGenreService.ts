import { IIndexable } from "../components/common/tableBody";

const genres: Genre[] = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
];

function getGenres() {
  return genres.filter((g) => g);
}

interface Genre extends IIndexable<any> {
  _id: string;
  name: string;
}
