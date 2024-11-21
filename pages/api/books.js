const { faker } = require("@faker-js/faker");
import { Faker, es, en, fr } from "@faker-js/faker";
import { languageData } from "@/app/lib/fakeData";

export default async function getBooks(req, res) {
  try {
    const { quantity = 10, language = "en", likes = 0, reviews = 0 } = req.query;

    const parsedQuantity = parseInt(quantity, 10);
    const parsedLikes = parseFloat(likes);
    const parsedReviews = parseFloat(reviews);

    const lowerLikes = Math.floor(parsedLikes);
    const fractionalLikes = parsedLikes - lowerLikes;

    const lowerReviews = Math.floor(parsedReviews);
    const fractionalReviews = parsedReviews - lowerReviews;

    const customFaker = new Faker({
      locale: [language === "es" ? es : language === "fr" ? fr : en],
    });

    const books = Array.from({ length: parsedQuantity }, () => {
      const bookLikes =
        Math.random() < (1 - fractionalLikes) ? lowerLikes : lowerLikes + 1;

      const bookReviewsCount = Math.random() < (1 - fractionalReviews) ? lowerReviews : lowerReviews + 1;

      const bookReviews = Array.from({ length: bookReviewsCount }, () => ({
        name: customFaker.person.fullName(),
        review: faker.helpers.arrayElement(
          language === "es"
            ? languageData.reviews.es
            : language === "fr"
            ? languageData.reviews.fr
            : languageData.reviews.en
        ),
      }));

      return {
        ISBN: customFaker.commerce.isbn(),
        title: faker.helpers.arrayElement(
          language === "es"
            ? languageData.titles.es
            : language === "fr"
            ? languageData.titles.fr
            : languageData.titles.en
        ),
        author: customFaker.person.fullName(),
        publisher: faker.helpers.arrayElement(
          language === "es"
            ? languageData.publishers.es
            : language === "fr"
            ? languageData.publishers.fr
            : languageData.publishers.en
        ),
        likes: bookLikes,
        reviews: bookReviews,
        image: customFaker.image.url(200, 300, "books", true),
      };
    });

    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to retrieve information requested." });
  }
}
