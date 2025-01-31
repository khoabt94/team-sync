import { assign } from "lodash";
import { Model, Query } from "mongoose";

const excludeFields = ["page", "sort", "limit"];

export class QueryPipeline {
  public queryString: Record<string, any>;
  public queryObject: Query<any, any, any>;
  public filterObject: Record<string, any> = {};
  public page?: number;
  public limit?: number;

  constructor(model: Model<any>, queryString: Record<string, any>) {
    this.queryObject = model.find();
    this.queryString = queryString;
  }

  filter() {
    let queryObject = { ...this.queryString };
    excludeFields.forEach((field) => delete queryObject[field]);
    for (const field in queryObject) {
      if (Array.isArray(queryObject[field])) {
        queryObject = assign(queryObject, { [field]: { $in: queryObject[field] } });
      }
    }

    // allow advanced filtering
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.filterObject = JSON.parse(queryStr);
    this.queryObject = this.queryObject.find(this.filterObject);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.queryObject.sort(sortBy);
    } else {
      this.queryObject.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    if (this.queryString.page && this.queryString.limit) {
      const page = this.queryString.page * 1;
      const limit = this.queryString.limit * 1;
      const skip = (page - 1) * limit;

      this.queryObject.skip(skip).limit(limit);
      this.page = page;
      this.limit = limit;
    }

    return this;
  }
}
