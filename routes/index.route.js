const express = require("express");
const router = express.Router();

const registerRouter = require("./register/register.route")
router.use("/", registerRouter)

const userRouter = require("./users/user.route")
router.use("/users", userRouter)

const artistsRouter = require("./artists/artists.route")
router.use("/artists", artistsRouter);

const albumsRouter = require("./albums/albums.route")
router.use("/albums", albumsRouter)

const tracksRouter = require("./tracks/tracks.route")
router.use('/tracks', tracksRouter)

const favoritesRouter = require("./favourites/favourites.route")
router.use('/favorites', favoritesRouter)
module.exports = router;