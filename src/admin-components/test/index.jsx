import Control from './control'
import Preview from './preview'

if (typeof window !== 'undefined') {
  window.Control = Control
  window.Preview = Preview
}

export { Control, Preview }