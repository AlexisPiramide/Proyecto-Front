function generateRainbowColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const ratio = i / count;
        const { r, g, b } = rgb(ratio);
        colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colors;
}

function rgb(ratio) {
    const normalized = Math.floor(ratio * 256 * 6);
    const region = Math.floor(normalized / 256);
    const x = normalized % 256;

    let r = 0, g = 0, b = 0;
    switch (region) {
        case 0: r = 255; g = x;   b = 0;   break;
        case 1: r = 255 - x; g = 255; b = 0;   break;
        case 2: r = 0;   g = 255; b = x;   break;
        case 3: r = 0;   g = 255 - x; b = 255; break;
        case 4: r = x;   g = 0;   b = 255; break;
        case 5: r = 255; g = 0;   b = 255 - x; break;
    }

    return { r, g, b };
}
