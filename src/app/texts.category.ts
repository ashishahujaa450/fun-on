export class CreateCategory {
  constructor(public categoryName: string, public imgName: string) {}
}

export interface TextCategory {
  categoryName: string;
  imgName: string;
}

export const JOKES = "Jokes";
export const HUSBAND = "Husband-Wife";
export const BIRTHDAY = "Birthday";
export const ANNIVERSARY = "Anniversary";
export const FLIRT = "Flirt";
export const MORNING = "Good Morning";
export const NIGHT = "Good Night";
export const SAD = "Sad";
export const ROMANTIC = "Romantic (Love)";
export const WISDOM = "Wisdom";

export const CategoryList: TextCategory[] = [
  new CreateCategory(JOKES, "funny-jokes.png"),
  new CreateCategory(HUSBAND, "husband-wife.png"),
  new CreateCategory(BIRTHDAY, "birthday.png"),
  new CreateCategory(ANNIVERSARY, "anniversary.png"),
  new CreateCategory(FLIRT, "flirt.png"),
  new CreateCategory(MORNING, "good-morning.png"),
  new CreateCategory(NIGHT, "good-night.png"),
  new CreateCategory(SAD, "sad.png"),
  new CreateCategory(ROMANTIC, "romantic.png"),
  new CreateCategory(WISDOM, "wisdom.png"),
];
