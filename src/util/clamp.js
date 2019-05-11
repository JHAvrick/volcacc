/**
 * This function clamps an number to a certain min/max range.
 */
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

export default clamp;