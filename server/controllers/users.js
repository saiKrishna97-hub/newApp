import User from "../models/User.js";

/* READ API LOGIC */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: errorMonitor.messsage });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const friendList = friends.map(
      ({ _id, firstName, lastName, location, occupation, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          occupation,
          picturePath,
        };
      }
    );

    res.status(200).json(friendList);
  } catch (err) {
    res.status(404).json({ error: errorMonitor.messsage });
  }
};

/* UPDATE API LOGIC */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.Includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friendList = friends.map(
      ({ _id, firstName, lastName, location, occupation, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          occupation,
          picturePath,
        };
      }
    );
    res.status(200).json(friendList);
  } catch (err) {
    res.status(404).json({ error: errorMonitor.messsage });
  }
};
