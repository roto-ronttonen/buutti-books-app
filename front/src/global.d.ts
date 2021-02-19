declare namespace Resources {
  export interface Base {
    _id?: string;
    __v?: number;
  }
  export interface Book extends Base {
    name: string;
    author?: string;
    description?: string;
  }
}
