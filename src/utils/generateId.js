export const generateId = (prefix) => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
};