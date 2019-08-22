import User from '../models/User';
import Notification from '../schemas/Notefication';

class NotificationController {
  async index(req, res) {
    const chekIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!chekIsProvider) {
      return res
        .status(400)
        .json({ error: 'Only provider can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
