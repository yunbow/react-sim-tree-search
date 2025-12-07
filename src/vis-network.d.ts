declare module 'vis-network' {
  export class Network {
    constructor(container: HTMLElement, data: any, options?: any)
    destroy(): void
    body: {
      data: {
        nodes: {
          update(updates: any[]): void
        }
      }
    }
  }
}
