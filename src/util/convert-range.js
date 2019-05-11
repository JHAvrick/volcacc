export default function convertRange(oldVal, oldMin, oldMax, newMin, newMax){
	return (((oldVal - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
}
