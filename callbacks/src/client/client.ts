let ServerCallbacks: any[] = []
let CurrentRequestId = 0

export const TriggerServerCallback = (name: string, cb: any, a?: any) => {
    ServerCallbacks[CurrentRequestId] = cb
    emitNet('trigger_server_callback', name, CurrentRequestId, a)
    if (CurrentRequestId < 65535) {
        CurrentRequestId = CurrentRequestId + 1
    } else {        
        CurrentRequestId = 0
    }
}

onNet('server_callback', (requestId: any, a?: any) => {
    if (ServerCallbacks[requestId]) {
        ServerCallbacks[requestId](a)
    }
    ServerCallbacks[requestId] = null
});



/*RegisterCommand('callbacktest', () => {
    TriggerServerCallback("test:callback", (result: string) => {
        console.log(result);
    });
}, false);*/
