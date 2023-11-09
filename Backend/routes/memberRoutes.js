// importing modules
const express = require("express");
const multer = require('multer');
const router = express.Router();

// Configure Multer to save uploaded files in the 'uploads' directory
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
    }
});

// Create a Multer instance to handle file uploads
const upload = multer({ storage });

const memberController = require("../controllers/memberController");

router.get("/", memberController.ListMembers);
router.get("/:_id", memberController.ListMemberById);

router.post("/:_id/change_password", memberController.ChangePassword);
router.post("/:_id/apply", upload.single('audio'), memberController.Apply);
router.post("/:_id/review_application", memberController.ReviewApplication);

router.put("/:_id", memberController.UpdateMemberById);

router.delete("/:id", memberController.DeleteMemberById);

module.exports = router;
