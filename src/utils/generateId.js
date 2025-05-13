export const generateId = (prefix) => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(2, 14);
    return `${prefix}${timestamp}`;
};