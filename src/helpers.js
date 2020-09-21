export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);

  return Math.floor(rand);
};

export const getCoords = (elem) => {
  const box = elem.getBoundingClientRect();

  return {
    // eslint-disable-next-line no-undef
    top: box.top + pageYOffset,
    // eslint-disable-next-line no-undef
    left: box.left + pageXOffset,
  };
};

export const disableSelection = (target) => {
  if (typeof target.onselectstart !== 'undefined') {
    target.onselectstart = function() {
      return false;
    };
  } else {
    if (typeof target.style.MozUserSelect !== 'undefined') {
      target.style.MozUserSelect = 'none';
    } else {
      target.onmousedown = function() {
        return false;
      };
      target.style.cursor = 'default';
    }
  }
};
