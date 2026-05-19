const CompanyInfo = require("../models/CompanyInfo");

const getCompanyInfo = async (req, res, next) => {
  try {
    let companyInfo = await CompanyInfo.findOne();

    if (!companyInfo) {
      companyInfo = await CompanyInfo.create({});
    }

    res.json({
      success: true,
      companyInfo,
    });
  } catch (error) {
    next(error);
  }
};

const updateCompanyInfo = async (req, res, next) => {
  try {
    let companyInfo = await CompanyInfo.findOne();

    if (!companyInfo) {
      companyInfo = await CompanyInfo.create(req.body);
    } else {
      Object.keys(req.body).forEach((key) => {
        companyInfo[key] = req.body[key];
      });

      await companyInfo.save();
    }

    res.json({
      success: true,
      message: "Company information updated successfully",
      companyInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanyInfo,
  updateCompanyInfo,
};
