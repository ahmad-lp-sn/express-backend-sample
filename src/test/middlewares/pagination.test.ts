import { config } from "../../app/config";
import { pagination } from "../../app/middlewares/pagination";

describe('pagination middleware', () => {
  let req: any, next: any;

  beforeEach(() => {
    req = {
      query: {},
    };
    next = jest.fn();
  });

  it('should set default values when query parameters are not provided', () => {
    pagination(req, {}, next);

    expect(req.query.page).toBe(1);
    expect(req.query.size).toBe(config.defaultPageSize);
    expect(req.query.limit).toBe(config.defaultPageSize);
    expect(req.query.offset).toBe(0);

    expect(next).toHaveBeenCalled();
  });

  it('should convert query parameters to numbers, and fill the misiing ones', () => {
    req.query.page = '3';
    req.query.size = '25';
    req.query.offset = '45';

    pagination(req, {}, next);

    expect(req.query.page).toBe(3);
    expect(req.query.size).toBe(25);
    expect(req.query.limit).toBe(25);
    expect(req.query.offset).toBe(45);

    expect(next).toHaveBeenCalled();
  });
});
