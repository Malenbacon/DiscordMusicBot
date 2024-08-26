const checkIfIsYoutubeDomain = (url) => {
    try {
        const domain = new URL(url);
        if(domain.host === "youtu.be" || domain.hostname === "www.youtube.com" || domain.hostname === domain.hostname === "m.youtube.com") return true;
        return false;

    } catch (error) {
        console.error("Não foi possivel transformar esse link em URL")
        return false
    }
    
    
}

module.exports = checkIfIsYoutubeDomain;

