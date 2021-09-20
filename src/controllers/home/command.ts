import { Handler } from '../../models/route';
import { chooseFacilitator } from '../../services/facilitator';

export const command: Handler = async (req, res) => {
  let requestor = 'Someone';
  let channel = 'general';
  if (req.body && !!req.body.user_name) {
    requestor = req.body.user_name;
  }
  if (req.body && !!req.body.channel_name) {
    channel = req.body.channel_name;
  }
  if (channel === 'privategroup') {
    channel = `${process.env.DEFAULT_GROUP}`;
  }
  let text = requestor;
  if (req.body && !!req.body.text) {
    text = req.body.text;
  }
  const facilitators = text.split(' ');
  return chooseFacilitator(requestor, facilitators, channel).then((response) => {
    res.status(200).send(response);
  });
};
