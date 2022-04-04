//프론트에 보내줄때 사용하는 실제 Page 데이터 class
export class Page<T> {
  pageSize: number;
  totalCount: number;
  totalPage: number;
  items: T[];
  constructor(totalCount: number, pageSize: number, items: T[]) {
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize);
    this.items = items;
  }
}
