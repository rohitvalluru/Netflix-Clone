const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id));
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    { likedMovies: [...user.likedMovies, data] },
                    { new: true }
                );
            } else return res.json({ msg: "Movie already added to the List." });
        } else await User.create({ email, likedMovies: [data] });
        return res.json({ msg: "Movie added Succesfully" });
    } catch (error) {
        return res.json({ msg: "Error adding movie" });
    }
};

module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            res.json({ msg: "Success", movies: user.likedMovies })
        } else return res.json({ msg: "User with given email not found." })

    } catch (error) {
        return res.json({ msg: "Error fetching the movie." })
    }
}

module.exports.removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
            if (movieIndex === -1) return res.status(400).json({ msg: "Movie not found" });
            likedMovies.splice(movieIndex, 1);

            await User.findByIdAndUpdate(
                user._id,
                { likedMovies },
                { new: true }
            );

            return res.json({ msg: "Movie Deleted", movies: likedMovies });
        }

        return res.status(404).json({ msg: "User not found" });
    } catch (error) {
        return res.status(500).json({ msg: "Error deleting movie." });
    }
}

