const getGatewayURL = () => {
    if (process.env.NODE_ENV === 'development') {
        return process.env.REACT_APP_GATEWAY_URL;
    }

    return window.__global.REACT_APP_GATEWAY_URL;
};

export const GATEWAY_URL = getGatewayURL();

export const createLink = async (link) => {
    let res = await fetch(`${GATEWAY_URL}/createLink`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: link }),
    });

    res = await res.json();

    if (res.success) return res.slug;

    return undefined;
};
