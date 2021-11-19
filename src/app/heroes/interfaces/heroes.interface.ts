export interface Heroes {
  id?:               string;
  superhero:        string;
  publisher:        Publisher;
  alter_ego:        string;
  first_appearance: string;
  characters:       string;
  alt_img?:         string; //almacenar el path
}

export enum Publisher {
  DCComics = "DC Comics",
  MarvelComics = "Marvel Comics",
}
