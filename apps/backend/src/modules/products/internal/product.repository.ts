import AppDataSource from "@database/data-source";

import { ProductEntity } from "./product.entity";

const ProductRepository = AppDataSource.getRepository(ProductEntity);

export default ProductRepository;
