export function importImage(path) {
    try {
        
        if (path.slice(path.lastIndexOf("."), path.length) == ".jpg") {
            return require("../" + path.slice(0, path.lastIndexOf(".")) + ".jpg");
        }
        else if (path.slice(path.lastIndexOf("."), path.length) == ".png") {
            return require("../" + path.slice(0, path.lastIndexOf(".")) + ".png");
        }
    } catch (err) {
        console.log("Image path not found: " + path);
        return null;
    }
        return null;
}