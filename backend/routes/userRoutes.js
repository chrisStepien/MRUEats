const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, getAdmins } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
//PUT to update profile
router.put('/update', updateUser);
//router.get('/me', getMe);
//router.get('/', getUsers);
router.get('/admins', protect, getAdmins);
//router.get('/:id', getUserById);


module.exports = router;