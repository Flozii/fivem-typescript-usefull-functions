let ServerCallbacks: any[] = []

type cb = {}

onNet('trigger_server_callback', (name: string, requestId: number, a?: any) => {  
  const _source = (global as any).source;
  TriggerServerCallback(name, requestId, _source, (a: string) => {
    emitNet('server_callback', _source, requestId, a) // to client side
  }, a)
});

export const RegisterServerCallback = (name: typeof cb, cb: any) => {
  ServerCallbacks[name] = cb
}

function TriggerServerCallback(name: typeof cb, requestId: any, source: number, cb: any, a?: any) {
  if (ServerCallbacks[name] != null) {
      ServerCallbacks[name](source, cb, a)
  }
}


/*RegisterServerCallback('test:callback', (source, callback) => {
  callback("test");
});*/
