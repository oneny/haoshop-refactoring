const express = require("express");
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByCategories, getAllProducts } = require("../controllers/product");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.array("productImg"), addProduct);
router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.array("productImg"), updateProduct);
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteProduct);
router.get("/", verifyToken, verifyRoles(ROLES.ADMIN), getAllProducts);
router.post("/cate", getProductsByCategories)
router.post("/get", getProducts);
router.get("/:id", getProduct);

module.exports = router;