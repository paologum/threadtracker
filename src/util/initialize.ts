import { actions } from ".";

export async function initialize() {
    // If we're running in dev mode (yarn dev), then the app is not served from the same URL
    // as the server hosts the /charts endpoint.  So, we'll hard-code that for ourselves here.
    try {
      actions.getAll('brands');
      actions.getAll('products');
      console.log('Brands loaded');
    } catch(e: any) {
      console.log('FAILED to retrieve presets.  Error was: ', e);
    }
  }