export function capitalizeFirstLetter(string) {
    if(string === undefined || string.length < 0) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
}