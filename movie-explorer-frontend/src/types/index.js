/**
 * @typedef {Object} Movie
 * @property {number} id - Movie ID
 * @property {string} title - Movie title
 * @property {string} description - Movie description
 * @property {number} release_year - Release year
 * @property {number} rating - Movie rating (1-10)
 * @property {string} poster_url - Poster image URL
 * @property {Director} director - Movie director
 * @property {Actor[]} actors - Movie cast
 * @property {Genre[]} genres - Movie genres
 */

/**
 * @typedef {Object} Actor
 * @property {number} id - Actor ID
 * @property {string} name - Actor name
 * @property {string} bio - Actor biography
 * @property {string} birth_date - Birth date
 * @property {string} photo_url - Photo URL
 * @property {Movie[]} movies - Movies acted in
 */

/**
 * @typedef {Object} Director
 * @property {number} id - Director ID
 * @property {string} name - Director name
 * @property {string} bio - Director biography
 * @property {string} birth_date - Birth date
 * @property {string} photo_url - Photo URL
 * @property {Movie[]} movies - Movies directed
 */

/**
 * @typedef {Object} Genre
 * @property {number} id - Genre ID
 * @property {string} name - Genre name
 * @property {string} description - Genre description
 */

export {}
