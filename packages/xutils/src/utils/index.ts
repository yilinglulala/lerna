import CONSTANT from './constant/constant'
import file from './file'
import time from './time'

import * as utils from './utils'

export default {
  CONSTANT,
  file,
  ...time,
  ...utils,
}
