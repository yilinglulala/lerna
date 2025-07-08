import { get } from "lodash";

// 解析数据
class parseData {
  data = {}
  private originData = {}
  constructor(endData) {
    this.originData = endData;
    this.init(endData);
  }
  init(endData) {
    this.parse2FrontData(endData);
  }
  // 解析成前端数据
  parse2FrontData(endData) {
    this.data = endData;
  }
  // 还原成后端数据
  parse2EndData() {
    // return this.data;
  }
  getData(path) {
    if (path) {
      return get(this.data, path)
    } else {
      return this.data
    }
  }
  setData(key, value) {
    this.data[key] = value;
  }
}
let parseDataIns = new parseData({});
parseDataIns.parse2FrontData({})