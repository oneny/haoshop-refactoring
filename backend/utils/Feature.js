class Feature {
  constructor(query, queryOptions) {
    this.query = query;
    this.queryOptions = queryOptions;
  }

  filter() {
    const optionCopy = { ...this.queryOptions };
    const removeFields = ["keyword", "perPage", "currentPage", "sort"];
    removeFields.forEach((key) => delete optionCopy[key]);

    this.query = this.query.find(optionCopy);
    return this;
  }

  search(type = "") {
    const keyword = this.queryOptions.keyword;
    let findQuery = {};
    let keywordArray = [];

    if (keyword) {
      keywordArray = keyword.split(" ").map((item) => new RegExp(item, "i"));

      switch (type) {
        case "product":
          findQuery = {
            $or: [
              { name: { $in: keywordArray } },
              { brand: { $in: keywordArray } },
            ],
          };
          break;
        default:
          findQuery = { name: { $in: keywordArray } };
      }
    }

    this.query = this.query.find(findQuery);

    return this;
  }

  pagination() {
    const { perPage, currentPage } = this.queryOptions;

    const skip = perPage * (currentPage - 1);

    this.query = this.query.limit(perPage).skip(skip);
    return this;
  }

  sort() {
    const sort = this.queryOptions.sort;
    let sortQuery = {};

    switch (sort) {
      case "latest":
        sortQuery = { createdAt: -1 };
        break;
      case "ascending":
        sortQuery = { price: 1 };
        break;
      case "descending":
        sortQuery = { price: -1 };
        break;
      case "salesRate":
        sortQuery = { salesRate: -1 };
        break;
      case "ratings":
        sortQuery = { "ratings.avg": -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    this.query = this.query.sort(sortQuery);
    return this;
  }

  getQuery() {
    return this.query;
  }
}

module.exports = Feature;
