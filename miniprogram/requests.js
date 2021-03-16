async function baseRequest(api, data) {
    let result = await wx.cloud.callFunction({
        name: 'server',
        data: {
            api: api,
            data: data
        }
    });
    return result.result;
}
