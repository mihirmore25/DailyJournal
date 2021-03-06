//jshint esversion: 8
const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Blog = require('../models/Blog');

// @desc Login/Landing Page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    });
});

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async(req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            blogs,
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
    
});

router.get('/files', ensureAuth, (req, res) => {
    res.render('files');
});

module.exports = router;
