'use strict'

// Configure Enzyme
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

// Require all files
function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('./', true, /\.js$/))
