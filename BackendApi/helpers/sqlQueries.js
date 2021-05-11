const EmailConfig = require("../model/email");
const User = require("../model/user");
exports.getUserRow = async (email) => {
  const result = await User.findOne({
    where: { email },
  });
  return result;
};

exports.getEmailConfigRow = async (data) => {
  const result = await EmailConfig.findOne({
    where: { subjectType: data },
  });
  return result;
};
