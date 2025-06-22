declare global {
    interface Mp {
      trigger: (event: string, ...args: any[]) => void
      browsers: {
        new: (url: string) => any
      }
      gui: {
        chat: {
          push: (text: string) => void
        }
        cursor: {
          show: (toggle: boolean, toggle2: boolean) => void
          visible: boolean
        }
      }
      events: {
        add: (name: string, handler: Function) => void
        callRemote: (name: string, ...args: any[]) => void
      }
      keys: {
        bind: (key: number, hold: boolean, handler: () => void) => void
      }
    }
  
    const mp: Mp
  }
  
  export {}
  