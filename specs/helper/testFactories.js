import LikeButtonInitiator from '../../src/scripts/utils/like-button-presenter';

const createLikeButtonPresenterWithMovie = async (movie) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    movie,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithMovie };
