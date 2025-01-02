declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Chainable {
      getByTestId(value: string): Chainable<JQuery<Node>>;
    }
  }
}

export {};
