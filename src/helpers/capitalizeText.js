/**
 *Capitaliza el texto deseado
 * @param {String} stringText
 * @returns {String} String
 */
export const capitalizeText = (stringText) => {
  return stringText.charAt(0).toUpperCase() + stringText.slice(1, stringText.length);
};
