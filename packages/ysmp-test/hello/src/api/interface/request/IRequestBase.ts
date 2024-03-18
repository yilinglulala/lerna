enum OrderEnum {
  ASC = 1,
  DEFAULT = 0,
  DESC = -1
}

type Order = OrderEnum.ASC | OrderEnum.DEFAULT | OrderEnum.DESC

export interface IOrderBy {
  field: string;
  order: Order;
}
interface IRequestBase {

}
export interface IPageReq {
  skip?: number;
  limit?: number;
  orderbys?: IOrderBy[];
}