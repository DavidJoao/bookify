const { faker } = require("@faker-js/faker")
import { Faker, es, en, fr } from '@faker-js/faker';
import { languageData } from '@/app/lib/fakeData';

export default async function getBooks(req, res) {

	try {
		const { quantity, language } = req.query

		const customFaker = new Faker({ locale: [language === 'es' ? es : language === 'fr' ? fr : en] });
	
		const books = Array.from({ length: quantity }, () => ({
			ISBN: customFaker.commerce.isbn(),
			title: faker.helpers.arrayElement(language === 'es' ? languageData.titles.es : language === 'fr' ? languageData.titles.fr : languageData.titles.en),
			author: customFaker.person.fullName(),
			publisher: faker.helpers.arrayElement(language === 'es' ? languageData.publishers.es : language === 'fr' ? languageData.publishers.fr : languageData.publishers.en),
			likes: customFaker.number.int({ min: 0, max: 5 }),
			reviews: Array.from({ length: faker.number.int({ min: 1, max: 30 }) }, () => ({
				name: customFaker.person.fullName(),
				review: faker.helpers.arrayElements(language === 'es' ? languageData.reviews.es : language === 'fr' ? languageData.reviews.fr : languageData.reviews.en),
			})),
			image: customFaker.image.url(200, 300, "books", true),
		}))

		res.status(200).json({ books: books })
	} catch (error) {
		console.error(error)
		res.status(500).json( {error: 'Unable to retreive information requested.' })
	}

}
