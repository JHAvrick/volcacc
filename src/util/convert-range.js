
/**
 * Given a number on a particular range, this function rescales the number for a 
 * new (ostensibly smaller or larger) range of numbers
 * 
 * @param {*} oldVal - The value to rescale
 * @param {*} oldMin - The original minimum range value
 * @param {*} oldMax - The original maximum range value
 * @param {*} newMin - The new range minimum 
 * @param {*} newMax - The new range maximum 
 */
export default function convertRange(oldVal, oldMin, oldMax, newMin, newMax){
	return (((oldVal - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
}
